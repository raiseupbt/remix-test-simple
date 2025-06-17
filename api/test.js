// Teste simples para verificar se as funções serverless funcionam
module.exports = async (req, res) => {
  console.log('🚀 Test function called');
  
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Teste Simples</title>
        <style>
            body { font-family: system-ui; padding: 2rem; background: #f0f9ff; }
            .success { background: #dcfce7; padding: 1rem; border-radius: 8px; border: 1px solid #16a34a; }
        </style>
    </head>
    <body>
        <div class="success">
            <h1>✅ Função Serverless Funcionando!</h1>
            <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
            <p><strong>URL:</strong> ${req.url}</p>
            <p><strong>Method:</strong> ${req.method}</p>
            <p><strong>User-Agent:</strong> ${req.headers['user-agent']}</p>
        </div>
        <p>Se você está vendo isso, as funções serverless da Vercel estão funcionando perfeitamente.</p>
    </body>
    </html>
  `);
};