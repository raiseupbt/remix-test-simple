# 🚀 Remix Test Simple

Projeto Remix mínimo para testar deploy na Vercel com função serverless.

## 🎯 Objetivo

Teste para verificar se Remix v2 funciona na Vercel usando função serverless manual.

## 📦 O que está incluído

- ✅ Remix v2.5.1
- ✅ React 18.2.0
- ✅ Vite 5.0.0
- ✅ **api/index.js** - Função serverless manual
- ✅ **vercel.json** - Configuração de roteamento
- ✅ TypeScript

## 🔧 Estratégia Usada

Como o builder automático do Remix na Vercel está com problemas, usamos:

1. **Função Serverless Manual** (`api/index.js`)
2. **Rewrite Rules** (`vercel.json`) 
3. **Framework Preset: Other** (não Remix)

## 🚀 Deploy na Vercel

1. Importe este repositório na Vercel
2. **Framework Preset: `Other`** ⚠️ (não Remix!)
3. Build Command: `npm run build`
4. Output Directory: deixe vazio
5. Deploy!

## 📋 Estrutura

```
├── app/
│   ├── routes/
│   │   └── _index.tsx     # Página inicial
│   ├── root.tsx           # Layout raiz
│   ├── entry.server.tsx   # Server entry
│   └── entry.client.tsx   # Client entry
├── api/
│   └── index.js           # 🔑 Função serverless
├── vercel.json            # 🔑 Configuração roteamento
├── vite.config.ts         # Configuração Vite
└── package.json           # Dependencies
```

## 🔑 Arquivos Chave

### `api/index.js`
```javascript
const { createRequestHandler } = require("@remix-run/node");

module.exports = async (req, res) => {
  const build = await import("../build/index.js");
  const handler = createRequestHandler({ build });
  return handler(req, res);
};
```

### `vercel.json`
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/api/index"
    }
  ]
}
```

## ✅ Se Funcionar

- ✅ Estratégia serverless manual funciona
- ✅ Pode aplicar no projeto principal

## ❌ Se Não Funcionar

- ❌ Problema mais profundo com Remix + Vercel
- 🔄 Considerar outras plataformas (Railway, Fly.io)

## 🧪 Como Testar

1. Acesse a URL do deploy
2. Veja se a página carrega corretamente
3. Se ver "✅ FUNCIONANDO", a estratégia funciona!

## 🔗 Links

- **Repositório**: https://github.com/raiseupbt/remix-test-simple
- **Deploy URL**: Será gerado após deploy na Vercel

---

**Estratégia**: Bypass do builder automático + função serverless manual