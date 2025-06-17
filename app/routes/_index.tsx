export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8", padding: "2rem" }}>
      <h1>🎉 Teste Remix na Vercel</h1>
      <p>Se você está vendo isso, o deploy funcionou!</p>
      <ul>
        <li>✅ Remix funcionando</li>
        <li>✅ Vercel deploy OK</li>
        <li>✅ Problema resolvido</li>
      </ul>
      <div style={{ marginTop: "2rem", padding: "1rem", backgroundColor: "#f0f9ff", borderRadius: "8px" }}>
        <h2>📊 Informações do Deploy</h2>
        <p><strong>Remix:</strong> v2.5.1</p>
        <p><strong>React:</strong> v18.2.0</p>
        <p><strong>Vercel:</strong> Serverless Functions</p>
        <p><strong>Status:</strong> <span style={{color: "green", fontWeight: "bold"}}>✅ FUNCIONANDO</span></p>
      </div>
      <div style={{ marginTop: "2rem", padding: "1rem", backgroundColor: "#fef3c7", borderRadius: "8px" }}>
        <h3>🔧 Como foi configurado:</h3>
        <ul>
          <li>Projeto Remix v2 mínimo</li>
          <li>Sem configurações extras</li>
          <li>Vercel detecta automaticamente</li>
          <li>Framework Preset: <code>Remix</code></li>
        </ul>
      </div>
    </div>
  );
}