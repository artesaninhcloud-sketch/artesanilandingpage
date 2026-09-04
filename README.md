# Artesani Farmácia de Manipulação — Landing Page

Vitrine virtual com carrinho de compras e finalização de pedido via WhatsApp. Sem login, sem
cadastro, sem checkout — o cliente monta o pedido e é redirecionado para o WhatsApp da farmácia.

## Stack

- React + Vite (frontend estático)
- Cloudflare Pages (hospedagem do frontend)
- Cloudflare Workers + D1 (API do catálogo, opcional — o site funciona com catálogo local se a
  API não estiver publicada)
- `localStorage` (carrinho do cliente — nenhum dado de cliente é armazenado no banco)

## Desenvolvimento local

```bash
npm install
npm run dev
```

## Build de produção

```bash
npm run build
```

Gera a pasta `dist/`, pronta para Cloudflare Pages.

## Catálogo (Cloudflare D1)

O catálogo pode ser servido por uma API (`worker/`) que lê do D1, com fallback automático para
`src/data/products.js` caso a API não esteja disponível.

```bash
# criar o banco (uma vez)
npx wrangler d1 create artesani-db
# copie o database_id retornado para wrangler.jsonc

# aplicar schema e popular com o catálogo inicial
npm run db:migrate:local && npm run db:seed:local   # ambiente local
npm run db:migrate:remote && npm run db:seed:remote # produção
```

## Worker (API)

```bash
npm run worker:dev     # desenvolvimento local
npm run worker:deploy  # publica o Worker
```

Defina `VITE_API_URL` (veja `.env.example`) apontando para a rota pública do Worker.

## Deploy (Cloudflare Pages)

```bash
npm run deploy
```

Depois, conecte o domínio já registrado no Registro.br à Cloudflare (DNS) e aponte-o para o
projeto Pages.
