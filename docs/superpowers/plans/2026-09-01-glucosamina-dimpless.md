# Glucosamina and Dimpless Catalog Update Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Atualizar a quantidade da Glucosamina e substituir a foto do Dimpless por uma imagem 4:5 padronizada.

**Architecture:** Manter a fonte única de dados em `src/data/products.js` e armazenar a nova imagem junto às fotos já padronizadas. Usar o teste existente de catálogo para proteger texto, caminho e presença física do arquivo.

**Tech Stack:** React, JavaScript, Vitest, WebP e edição de imagem integrada.

---

### Task 1: Contrato do catálogo

**Files:**
- Modify: `src/data/products.test.js`

- [ ] **Step 1: Write failing assertions**

Exigir `120 cápsulas (60 doses)` para a Glucosamina de R$ 55 e `/remedios/novos/dimpless.webp` para o Dimpless.

- [ ] **Step 2: Verify the test fails**

Run: `npm test -- src/data/products.test.js`

Expected: FAIL com a descrição antiga e o caminho `/remedios/30.jpg`.

### Task 2: Foto padronizada e dados

**Files:**
- Create: `public/remedios/novos/dimpless.webp`
- Modify: `src/data/products.js`

- [ ] **Step 1: Edit and inspect the supplied photo**

Gerar recorte 4:5 com fundo branco, sombra suave, frasco centralizado e rótulo preservado. Salvar em WebP no caminho aprovado.

- [ ] **Step 2: Update product data**

Aplicar a descrição exata da Glucosamina e trocar apenas o caminho de imagem do Dimpless.

- [ ] **Step 3: Verify focused tests pass**

Run: `npm test -- src/data/products.test.js`

Expected: PASS.

### Task 3: Verificação e publicação

**Files:**
- No additional files expected.

- [ ] **Step 1: Run full checks**

Run: `npm test`

Run: `npm run lint`

Run: `npm run build`

Expected: testes e build passam; lint sem erros.

- [ ] **Step 2: Inspect the Dimpless card locally**

Confirmar fundo branco, enquadramento equivalente aos demais produtos e descrição correta da Glucosamina.

- [ ] **Step 3: Deploy and verify production**

Publicar `dist` no projeto Pages `artesani-farmacia` e confirmar os dois produtos em `https://artesaninh.com.br`.

