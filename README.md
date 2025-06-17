# 🚀 Remix Test Simple

Projeto Remix mínimo para testar deploy na Vercel.

## 🎯 Objetivo

Teste simples para verificar se o problema de deploy está na configuração específica do projeto principal ou é um problema geral com Remix + Vercel.

## 📦 O que está incluído

- ✅ Remix v2.5.1
- ✅ React 18.2.0
- ✅ Vite 5.0.0
- ✅ TypeScript
- ✅ Configuração mínima

## 🚀 Deploy na Vercel

1. Importe este repositório na Vercel
2. Framework Preset: **Remix**
3. Não precisa de variáveis de ambiente
4. Deploy!

## 📋 Estrutura

```
├── app/
│   ├── routes/
│   │   └── _index.tsx     # Página inicial
│   ├── root.tsx           # Layout raiz
│   ├── entry.server.tsx   # Server entry
│   └── entry.client.tsx   # Client entry
├── vite.config.ts         # Configuração Vite
├── package.json           # Dependencies
└── tsconfig.json          # TypeScript config
```

## ✅ Se Funcionar

O problema está na configuração específica do projeto principal.

## ❌ Se Não Funcionar

O problema é geral com Remix v2 + Vercel.

## 🔗 Links

- **Repositório**: https://github.com/raiseupbt/remix-test-simple
- **Deploy URL**: Será gerado após deploy na Vercel

## 🧪 Como Testar

1. Acesse a URL do deploy
2. Veja se a página carrega corretamente
3. Se ver "✅ FUNCIONANDO", o Remix + Vercel estão OK
4. Se der 404 ou erro, há problema com a stack