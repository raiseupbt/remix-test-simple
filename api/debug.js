const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
  console.log('🔍 Debug function called');
  
  const debug = {
    timestamp: new Date().toISOString(),
    url: req.url,
    method: req.method,
    headers: req.headers,
    env: {
      NODE_ENV: process.env.NODE_ENV,
      VERCEL: process.env.VERCEL,
      VERCEL_ENV: process.env.VERCEL_ENV,
    },
    process: {
      cwd: process.cwd(),
      version: process.version,
      platform: process.platform,
    },
    filesystem: {}
  };

  // Verificar arquivos
  const checkPaths = [
    'build',
    'build/index.js',
    'public',
    'api',
    'api/index.js',
    'package.json'
  ];

  for (const checkPath of checkPaths) {
    try {
      const fullPath = path.join(process.cwd(), checkPath);
      const exists = fs.existsSync(fullPath);
      debug.filesystem[checkPath] = {
        exists,
        stats: exists ? fs.statSync(fullPath) : null
      };
      
      if (exists && fs.statSync(fullPath).isDirectory()) {
        debug.filesystem[checkPath].contents = fs.readdirSync(fullPath);
      }
    } catch (error) {
      debug.filesystem[checkPath] = { error: error.message };
    }
  }

  // Tentar importar build do Remix
  try {
    const buildPath = path.join(process.cwd(), 'build/index.js');
    if (fs.existsSync(buildPath)) {
      debug.remix = {
        buildExists: true,
        buildPath: buildPath
      };
      
      try {
        const build = await import(buildPath);
        debug.remix.importSuccess = true;
        debug.remix.buildKeys = Object.keys(build);
      } catch (importError) {
        debug.remix.importError = importError.message;
      }
    } else {
      debug.remix = { buildExists: false };
    }
  } catch (error) {
    debug.remix = { error: error.message };
  }

  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Debug Info</title>
        <style>
            body { font-family: monospace; padding: 1rem; background: #000; color: #0f0; }
            pre { background: #111; padding: 1rem; border-radius: 4px; overflow: auto; }
            .error { color: #f00; }
            .success { color: #0f0; }
            .warning { color: #ff0; }
        </style>
    </head>
    <body>
        <h1>🔍 Debug Information</h1>
        <h2>Environment</h2>
        <pre>${JSON.stringify(debug.env, null, 2)}</pre>
        
        <h2>Process</h2>
        <pre>${JSON.stringify(debug.process, null, 2)}</pre>
        
        <h2>Filesystem</h2>
        <pre>${JSON.stringify(debug.filesystem, null, 2)}</pre>
        
        <h2>Remix Build</h2>
        <pre>${JSON.stringify(debug.remix, null, 2)}</pre>
        
        <h2>Request Info</h2>
        <pre>URL: ${debug.url}
Method: ${debug.method}
Timestamp: ${debug.timestamp}</pre>

        <h2>Quick Tests</h2>
        <p><a href="/api/test">🧪 Test Simple Function</a></p>
        <p><a href="/api/index">🎯 Test Remix Function</a></p>
        <p><a href="/">🏠 Back to Home</a></p>
    </body>
    </html>
  `);
};