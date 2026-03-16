#!/usr/bin/env node

import { readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, "..");
const baseUrl = (process.argv[2] || "https://www.brunadurelli.com.br").replace(/\/+$/, "");

const routeFile = join(projectRoot, "src", "App.tsx");
const sitemapFile = join(projectRoot, "public", "sitemap.xml");
const sourceRoot = join(projectRoot, "src");

const normalizePath = (value) => {
  if (!value) return null;
  if (value.startsWith("http://") || value.startsWith("https://")) {
    try {
      const url = new URL(value);
      if (!/brunadurelli\.com\.br$/i.test(url.hostname)) return null;
      return url.pathname || "/";
    } catch {
      return null;
    }
  }

  if (!value.startsWith("/")) return null;
  if (value.startsWith("//")) return null;
  if (value.includes(":")) return null;
  if (value.startsWith("/src/")) return null;
  if (value.startsWith("/assets/")) return null;

  const [cleanPath] = value.split(/[?#]/);
  if (!cleanPath) return "/";
  return cleanPath.replace(/\/+$/, "") || "/";
};

const collectFiles = (dir) => {
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectFiles(fullPath));
      continue;
    }
    if (/\.(ts|tsx|js|jsx)$/.test(entry.name)) {
      files.push(fullPath);
    }
  }
  return files;
};

const routeContent = readFileSync(routeFile, "utf8");
const routePaths = new Set(
  [...routeContent.matchAll(/<Route\s+path="([^"]+)"/g)]
    .map(([, pathValue]) => normalizePath(pathValue))
    .filter((pathValue) => pathValue && pathValue !== "/*" && pathValue !== "*")
);

const redirectPaths = new Set(
  [...routeContent.matchAll(/<Route\s+path="([^"]+)"\s+element={<Navigate/g)]
    .map(([, pathValue]) => normalizePath(pathValue))
    .filter(Boolean)
);

const sitemapContent = readFileSync(sitemapFile, "utf8");
const sitemapPaths = new Set(
  [...sitemapContent.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map(([, loc]) => normalizePath(loc))
    .filter(Boolean)
);

const linkPatterns = [
  /to\s*=\s*["'`]([^"'`]+)["'`]/g,
  /href\s*=\s*["'`](\/[^"'`]+)["'`]/g,
  /navigate\(\s*["'`]([^"'`]+)["'`]\s*\)/g,
  /link\s*:\s*["'`]([^"'`]+)["'`]/g,
  /canonical\s*:\s*["'`](https?:\/\/[^"'`]+)["'`]/g,
];

const linkSources = new Map();

for (const file of collectFiles(sourceRoot)) {
  const content = readFileSync(file, "utf8");
  for (const pattern of linkPatterns) {
    for (const match of content.matchAll(pattern)) {
      const pathValue = normalizePath(match[1]);
      if (!pathValue) continue;
      if (!linkSources.has(pathValue)) {
        linkSources.set(pathValue, new Set());
      }
      linkSources.get(pathValue).add(relative(projectRoot, file));
    }
  }
}

const linkedPaths = new Set(linkSources.keys());
const knownPaths = new Set([...routePaths, ...sitemapPaths, ...linkedPaths]);
const missingRouteTargets = [...linkedPaths].filter((pathValue) => !routePaths.has(pathValue));
const sitemapMissingRoutes = [...sitemapPaths].filter((pathValue) => !routePaths.has(pathValue));
const routesMissingFromSitemap = [...routePaths].filter(
  (pathValue) => !sitemapPaths.has(pathValue) && !redirectPaths.has(pathValue)
);

const checkPath = async (pathValue) => {
  const response = await fetch(`${baseUrl}${pathValue}`, {
    redirect: "manual",
    headers: {
      "user-agent": "site-audit/1.0",
      accept: "text/html,application/xhtml+xml",
    },
  });

  return {
    path: pathValue,
    status: response.status,
    location: response.headers.get("location"),
  };
};

const results = [];
for (const pathValue of knownPaths) {
  results.push(await checkPath(pathValue));
}

const httpIssues = results.filter(({ status }) => status >= 400 || status < 200);

console.log(`Base URL: ${baseUrl}`);
console.log(`Rotas declaradas: ${routePaths.size}`);
console.log(`URLs no sitemap: ${sitemapPaths.size}`);
console.log(`Links internos encontrados: ${linkedPaths.size}`);

if (missingRouteTargets.length) {
  console.log("\nLinks internos sem rota correspondente:");
  for (const pathValue of missingRouteTargets) {
    const refs = [...(linkSources.get(pathValue) || [])].join(", ");
    console.log(`- ${pathValue} <- ${refs}`);
  }
}

if (sitemapMissingRoutes.length) {
  console.log("\nURLs do sitemap sem rota correspondente:");
  for (const pathValue of sitemapMissingRoutes) {
    console.log(`- ${pathValue}`);
  }
}

if (routesMissingFromSitemap.length) {
  console.log("\nRotas publicas fora do sitemap:");
  for (const pathValue of routesMissingFromSitemap) {
    console.log(`- ${pathValue}`);
  }
}

if (httpIssues.length) {
  console.log("\nURLs com falha HTTP:");
  for (const issue of httpIssues) {
    console.log(`- ${issue.path}: ${issue.status}`);
  }
}

const redirectResults = results.filter(({ status }) => status >= 300 && status < 400);
if (redirectResults.length) {
  console.log("\nURLs com redirect:");
  for (const result of redirectResults) {
    console.log(`- ${result.path}: ${result.status} -> ${result.location || "(sem Location)"}`);
  }
}

if (missingRouteTargets.length || sitemapMissingRoutes.length || httpIssues.length) {
  process.exit(1);
}
