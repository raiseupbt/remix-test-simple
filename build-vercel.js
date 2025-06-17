const fs = require('fs');
const path = require('path');

// Função para copiar recursivamente
function copyRecursive(src, dest) {
  try {
    if (!fs.existsSync(src)) {
      console.log(`Source directory ${src} does not exist`);
      return;
    }

    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }

    const entries = fs.readdirSync(src, { withFileTypes: true });

    for (let entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);

      if (entry.isDirectory()) {
        copyRecursive(srcPath, destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  } catch (error) {
    console.error('Error copying files:', error);
  }
}

console.log('🔄 Preparing Vercel build...');

// Criar diretório public se não existir
if (!fs.existsSync('public')) {
  fs.mkdirSync('public', { recursive: true });
  console.log('📁 Created public directory');
}

// Copiar assets do client se existir
const clientPath = 'build/client';
if (fs.existsSync(clientPath)) {
  copyRecursive(clientPath, 'public');
  console.log('✅ Copied client assets to public/');
} else {
  console.log('⚠️  No client assets found at build/client');
}

// Garantir que public tenha pelo menos um arquivo
const indexPath = 'public/index.html';
if (!fs.existsSync(indexPath)) {
  fs.writeFileSync(indexPath, `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Remix Test Simple</title>
</head>
<body>
    <div id="root">Loading Remix...</div>
    <script>console.log('Static assets loaded');</script>
</body>
</html>`);
  console.log('📄 Created fallback index.html');
}

console.log('🚀 Vercel build preparation complete!');