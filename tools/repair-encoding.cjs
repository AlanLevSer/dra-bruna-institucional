/*
  Varrida geral para corrigir mojibake/acentos corrompidos (Ã, Â, �) em arquivos .ts, .tsx, .js, .jsx, .html, .md.
  Estratégia: se o texto contiver indicadores de mojibake, tenta redecodificar como se fosse Latin-1 -> UTF-8.
  Mantém backup em memória e só salva se melhorar (reduz contagem de caracteres problemáticos).
*/

const fs = require('fs');
const path = require('path');

const exts = new Set(['.ts', '.tsx', '.js', '.jsx', '.html', '.md']);
const root = path.resolve(__dirname, '..');
const targetDirs = ['src', 'public', 'docs'];

function scoreBad(text) {
  const m = text.match(/[ÃÂ�]/g);
  return m ? m.length : 0;
}

function repairText(text) {
  // Heurística: se não tiver sinais de mojibake, retorna original
  const bad0 = scoreBad(text);
  if (bad0 === 0) return text;

  // Converte cada char (0-255) em byte e decodifica como UTF-8
  const bytes = Uint8Array.from(Array.from(text, (c) => c.charCodeAt(0) & 0xff));
  let repaired;
  try {
    repaired = new TextDecoder('utf-8').decode(bytes);
  } catch {
    return text;
  }

  // Se melhorou (menos ocorrências), fica com a versão reparada
  return scoreBad(repaired) < bad0 ? repaired : text;
}

function processFile(filePath) {
  const original = fs.readFileSync(filePath, 'utf8');
  const fixed = repairText(original)
    // normaliza alguns termos comuns que podem aparecer duplamente corrompidos
    .replace(/S\u00e3o Paulo/g, 'São Paulo')

  if (fixed !== original) {
    fs.writeFileSync(filePath, fixed, 'utf8');
    return true;
  }
  return false;
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.git')) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (exts.has(path.extname(entry.name))) {
      try { processFile(full); } catch {}
    }
  }
}

for (const d of targetDirs) {
  const abs = path.join(root, d);
  if (fs.existsSync(abs)) walk(abs);
}

console.log('Encoding repair sweep completed.');


