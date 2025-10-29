#!/usr/bin/env node

import { execSync } from "node:child_process";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, "..");

const runCommand = (label, command) => {
  console.log(`\n▶ ${label}`);
  execSync(command, {
    cwd: projectRoot,
    stdio: "inherit",
    shell: true
  });
};

const hasNonAscii = (value) => /[^\x00-\x7F]/.test(value);

const checkVercelJson = () => {
  const file = join(projectRoot, "vercel.json");
  const buffer = readFileSync(file);
  if (!buffer.length) {
    throw new Error("vercel.json está vazio.");
  }
  const bom = buffer[0] === 0xef && buffer[1] === 0xbb && buffer[2] === 0xbf;
  if (bom) {
    throw new Error("vercel.json contém BOM. Salve o arquivo como UTF-8 sem BOM.");
  }
  const text = buffer.toString("utf8");
  if (text.includes("\uFFFD")) {
    throw new Error("vercel.json contém caractere � (substituição).");
  }
  try {
    JSON.parse(text);
  } catch (error) {
    throw new Error(`vercel.json inválido: ${(error instanceof Error && error.message) || String(error)}`);
  }
};

const ensureAsciiRouteImports = () => {
  const appPath = join(projectRoot, "src", "App.tsx");
  const content = readFileSync(appPath, "utf8");

  const importIssues = [...content.matchAll(/\.\/pages\/([^"'`]+)/g)]
    .map(([, segment]) => segment)
    .filter((segment) => hasNonAscii(segment));

  if (importIssues.length) {
    throw new Error(`Importações com acento detectadas em src/App.tsx: ${importIssues.join(", ")}`);
  }

  const pathIssues = [...content.matchAll(/path\s*=\s*["'`]([^"'`]+)["'`]/g)]
    .map(([, pathValue]) => pathValue)
    .filter((pathValue) => pathValue.startsWith("/") && hasNonAscii(pathValue));

  if (pathIssues.length) {
    throw new Error(`Rotas com acento detectadas em src/App.tsx: ${pathIssues.join(", ")}`);
  }
};

const ensureAsciiFilenames = () => {
  const targetDirs = [join(projectRoot, "src", "pages"), join(projectRoot, "src", "components")];

  const offenders = [];

  const walk = (dir) => {
    for (const entry of readdirSync(dir)) {
      const fullPath = join(dir, entry);
      if (hasNonAscii(entry)) {
        offenders.push(relative(projectRoot, fullPath));
      }
      const stats = statSync(fullPath);
      if (stats.isDirectory()) {
        walk(fullPath);
      }
    }
  };

  targetDirs.forEach((dir) => {
    try {
      if (statSync(dir).isDirectory()) {
        walk(dir);
      }
    } catch {
      // ignorar diretórios ausentes
    }
  });

  if (offenders.length) {
    throw new Error(`Nomes de arquivos ou pastas com acento: ${offenders.join(", ")}`);
  }
};

const ensureNoReplacementChars = () => {
  const targetDirs = [
    join(projectRoot, "src", "pages"),
    join(projectRoot, "src", "components"),
    join(projectRoot, "src", "lib")
  ];
  const offenders = [];

  const walkFiles = (dir) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const fullPath = join(dir, entry.name);
      if (entry.isDirectory()) {
        walkFiles(fullPath);
        continue;
      }
      if (!/\.(tsx?|ts|js|jsx|json|md)$/.test(entry.name)) {
        continue;
      }
      const text = readFileSync(fullPath, "utf8");
      if (text.includes("\uFFFD")) {
        offenders.push(relative(projectRoot, fullPath));
      }
    }
  };

  targetDirs.forEach((dir) => {
    try {
      walkFiles(dir);
    } catch {
      /* ignore missing directories */
    }
  });

  if (offenders.length) {
    throw new Error(`Arquivos com caractere � encontrados: ${offenders.join(", ")}`);
  }
};

const tasks = [
  { title: "npm run lint", action: () => runCommand("Executando lint", "npm run lint") },
  { title: "npm run type-check", action: () => runCommand("Executando type-check", "npm run type-check") },
  { title: "npm run build", action: () => runCommand("Executando build", "npm run build") },
  { title: "Validar vercel.json", action: checkVercelJson },
  { title: "Validar rotas ASCII em src/App.tsx", action: ensureAsciiRouteImports },
  { title: "Validar nomes de arquivos ASCII", action: ensureAsciiFilenames },
  { title: "Verificar caracteres de substituição", action: ensureNoReplacementChars }
];

try {
  process.chdir(projectRoot);
  console.log("Iniciando deploy check...\n");
  for (const task of tasks) {
    console.log(`=== ${task.title} ===`);
    task.action();
  }
  console.log("\n✅ Deploy check concluído sem erros.");
} catch (error) {
  console.error("\n❌ Deploy check falhou.");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}
