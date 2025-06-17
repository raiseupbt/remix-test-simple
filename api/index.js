const { createRequestHandler } = require("@remix-run/node");

module.exports = async (req, res) => {
  console.log(`🚀 Request: ${req.method} ${req.url}`);
  
  try {
    // Import build dinamicamente
    console.log('📦 Loading Remix build...');
    const build = await import("../build/index.js");
    console.log('✅ Remix build loaded successfully');
    
    const handler = createRequestHandler({
      build,
      mode: process.env.NODE_ENV || "production"
    });
    
    console.log('🔄 Processing request through Remix...');
    return handler(req, res);
    
  } catch (error) {
    console.error("❌ Remix handler error:", error);
    console.error("Stack trace:", error.stack);
    
    // Retornar uma página de erro útil
    res.status(500).send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Remix Error</title>
        <style>
          body { font-family: system-ui; padding: 2rem; background: #fee; }
          .error { background: white; padding: 1rem; border-radius: 8px; }
          pre { background: #f5f5f5; padding: 1rem; overflow: auto; }
        </style>
      </head>
      <body>
        <div class="error">
          <h1>🚨 Remix Server Error</h1>
          <p><strong>Error:</strong> ${error.message}</p>
          <h3>Debug Info:</h3>
          <pre>${error.stack}</pre>
          <p><strong>Build Path:</strong> /build/index.js</p>
          <p><strong>Mode:</strong> ${process.env.NODE_ENV || "production"}</p>
        </div>
      </body>
      </html>
    `);
  }
};