const fs = require('fs');
const path = require('path');

// Função para listar diretórios
function listDirectory(dir, depth = 0) {
  try {
    if (!fs.existsSync(dir)) {
      console.log(`${' '.repeat(depth * 2)}❌ ${dir} does not exist`);
      return;
    }
    
    console.log(`${' '.repeat(depth * 2)}📁 ${dir}/`);
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (let entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        listDirectory(fullPath, depth + 1);
      } else {
        console.log(`${' '.repeat((depth + 1) * 2)}📄 ${entry.name}`);
      }
    }
  } catch (error) {
    console.error(`Error reading ${dir}:`, error.message);
  }
}

// Função para copiar recursivamente
function copyRecursive(src, dest) {
  try {
    if (!fs.existsSync(src)) {
      console.log(`❌ Source directory ${src} does not exist`);
      return false;
    }

    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
      console.log(`📁 Created ${dest}`);
    }

    const entries = fs.readdirSync(src, { withFileTypes: true });
    let filesCopied = 0;

    for (let entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);

      if (entry.isDirectory()) {
        copyRecursive(srcPath, destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
        filesCopied++;
        console.log(`📄 Copied ${entry.name}`);
      }
    }
    
    console.log(`✅ Copied ${filesCopied} files from ${src} to ${dest}`);
    return true;
  } catch (error) {
    console.error('❌ Error copying files:', error);
    return false;
  }
}

console.log('🔄 Preparing Vercel build...');
console.log('📊 Current directory structure:');

// Listar estrutura build
listDirectory('build');

// Criar diretório public se não existir
if (!fs.existsSync('public')) {
  fs.mkdirSync('public', { recursive: true });
  console.log('📁 Created public directory');
}

// Tentar diferentes localizações de assets
const possibleClientPaths = [
  'build/client',
  'build/assets',
  'dist/client',
  'dist/assets'
];

let clientFound = false;

for (const clientPath of possibleClientPaths) {
  if (fs.existsSync(clientPath)) {
    console.log(`✅ Found client assets at ${clientPath}`);
    if (copyRecursive(clientPath, 'public')) {
      clientFound = true;
      break;
    }
  } else {
    console.log(`❌ No client assets at ${clientPath}`);
  }
}

if (!clientFound) {
  console.log('⚠️  No client assets found in any expected location');
}

// Garantir que public tenha pelo menos um arquivo
const indexPath = 'public/index.html';
if (!fs.existsSync(indexPath)) {
  fs.writeFileSync(indexPath, `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Remix Test Simple</title>
    <style>
      body { font-family: system-ui; padding: 2rem; }
      .status { background: #f0f9ff; padding: 1rem; border-radius: 8px; }
    </style>
</head>
<body>
    <div class="status">
      <h1>🔄 Remix Loading...</h1>
      <p>If you see this, static assets are working but Remix SSR might have issues.</p>
      <p>Check Vercel function logs for details.</p>
    </div>
    <script>
      console.log('Static index.html loaded');
      console.log('Build time:', new Date().toISOString());
    </script>
</body>
</html>`);
  console.log('📄 Created fallback index.html');
}

// Verificar se build server existe
const serverPath = 'build/index.js';
if (fs.existsSync(serverPath)) {
  console.log('✅ Server build found at build/index.js');
} else {
  console.log('❌ Server build NOT found at build/index.js');
}

console.log('📊 Final public directory:');
listDirectory('public');

console.log('🚀 Vercel build preparation complete!');