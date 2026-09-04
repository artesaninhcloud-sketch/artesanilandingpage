# Novas fotos dos produtos e Hydralume Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publicar as novas fotos do catálogo, adicionar Hydralume por R$ 65,00 e manter preços e botões dos cards alinhados.

**Architecture:** Os arquivos de origem em `fotos novas` serão convertidos para WebP otimizados em `public/remedios/novos` por um script determinístico. O catálogo local e uma migração D1 usarão os mesmos caminhos, enquanto o card manterá o preço e a ação ancorados na base por CSS flexível.

**Tech Stack:** React 19, CSS, Vitest, Python/Pillow para otimização de imagens, Cloudflare D1, Cloudflare Pages e Wrangler 4.

---

### Task 1: Fixar o contrato do catálogo em testes

**Files:**
- Create: `src/data/products.test.js`
- Modify: `src/data/products.js`

- [ ] **Step 1: Write the failing test**

Criar testes que localizem Hydralume e verifiquem `description: '30 g'`, `price: 65`, `category: 'Cuidados com a pele'`, `active: true` e `image: '/remedios/novos/hydralume.webp'`. Verificar também que todos os produtos ativos, exceto Dimpless, usam `/remedios/novos/*.webp`.

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/data/products.test.js`
Expected: FAIL porque Hydralume não existe e as imagens ainda usam JPG numerado.

- [ ] **Step 3: Write minimal implementation**

Atualizar os caminhos das 27 fotos novas em `src/data/products.js`, manter Dimpless em `/remedios/30.jpg` e adicionar o item de id 31:

```js
{
  id: 31,
  name: 'Hydralume',
  description: '30 g',
  price: 65.0,
  image: '/remedios/novos/hydralume.webp',
  category: 'Cuidados com a pele',
  active: true,
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/data/products.test.js`
Expected: PASS.

### Task 2: Gerar os arquivos de imagem otimizados

**Files:**
- Create: `scripts/prepare-product-images.py`
- Create: `public/remedios/novos/*.webp`
- Test: `src/data/products.test.js`

- [ ] **Step 1: Extend the failing test**

Para cada caminho `/remedios/novos/*.webp` usado pelo catálogo, resolver o arquivo dentro de `public` e verificar que ele existe e possui tamanho maior que zero.

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/data/products.test.js`
Expected: FAIL porque os WebP ainda não existem.

- [ ] **Step 3: Write the conversion script**

Criar um mapa explícito entre os arquivos aprovados em `fotos novas` e os nomes públicos. O script deve abrir cada PNG com Pillow, aplicar orientação EXIF, preservar a imagem inteira, limitar o maior lado a 1200 px e salvar WebP com qualidade 84 e método 6.

- [ ] **Step 4: Generate assets and rerun the test**

Run: `python scripts/prepare-product-images.py`

Run: `npm test -- src/data/products.test.js`
Expected: PASS.

### Task 3: Alinhar o conteúdo dos cards

**Files:**
- Create: `src/components/ProductCard.test.jsx`
- Modify: `src/components/ProductCard.css`

- [ ] **Step 1: Write the failing test**

Renderizar um produto e confirmar a presença das classes de nome, descrição, preço e botão. Ler o CSS e exigir que `.product-card__price` tenha `margin-top: auto`, mantendo preço e botão na base do card.

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/components/ProductCard.test.jsx`
Expected: FAIL porque o preço usa margem superior fixa.

- [ ] **Step 3: Write minimal implementation**

Manter `.product-card__body` como coluna flexível e alterar `.product-card__price` para `margin-top: auto`. Manter a proporção comum da área de imagem, `object-fit: contain` e centralização já existentes.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/components/ProductCard.test.jsx`
Expected: PASS.

### Task 4: Sincronizar o catálogo D1

**Files:**
- Create: `migrations/0003_refresh_product_images_and_add_hydralume.sql`
- Modify: `seed.sql`

- [ ] **Step 1: Write the migration**

Criar transação SQL com `UPDATE products SET image = ... WHERE id = ...` para os ids 2 a 29 que possuem nova foto, sem alterar os ids 1, 14 e 30. Adicionar Hydralume por `INSERT ... ON CONFLICT(id) DO UPDATE` com id 31 e os dados aprovados.

- [ ] **Step 2: Keep the full seed consistent**

Aplicar os mesmos caminhos e o item 31 em `seed.sql`, preservando Omeprazol e Ivermectina com `active = 0` e Dimpless com a imagem antiga.

- [ ] **Step 3: Validate SQL locally**

Run: `npx wrangler d1 execute artesani-db --local --file=./migrations/0001_create_products.sql`

Run: `npx wrangler d1 execute artesani-db --local --file=./seed.sql`

Run: `npx wrangler d1 execute artesani-db --local --command "SELECT id,name,description,price,image,active FROM products WHERE id IN (2,30,31) ORDER BY id"`
Expected: Akkermat usa WebP novo, Dimpless mantém `/remedios/30.jpg` e Hydralume aparece ativo com 30 g e preço 65.

### Task 5: Verificação visual e publicação

**Files:**
- Verify: `dist/`

- [ ] **Step 1: Run complete verification**

Run: `npm test`
Expected: todos os testes passam.

Run: `npm run lint`
Expected: nenhum erro.

Run: `npm run build`
Expected: build Vite concluído.

- [ ] **Step 2: Inspect locally**

Abrir o site local em 390 px e 1440 px, buscar Hydralume e verificar enquadramento das fotos, alinhamento de preços e botões e ausência de overflow horizontal.

- [ ] **Step 3: Publish database and frontend**

Com o token fornecido apenas em memória, executar:

`npx wrangler d1 execute artesani-db --remote --file=./migrations/0003_refresh_product_images_and_add_hydralume.sql`

`npx wrangler pages deploy dist --project-name artesani-farmacia --branch main`

- [ ] **Step 4: Validate production**

No domínio `https://artesaninh.com.br`, confirmar que a API retorna Hydralume e os novos caminhos WebP; validar visualmente em 390 px e 1440 px e checar ausência de erros de carregamento.
