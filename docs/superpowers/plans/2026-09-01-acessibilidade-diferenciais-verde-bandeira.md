# Artesani Accessibility, Differentials and Flag Green Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Atualizar a paleta para verde-bandeira, ampliar controles críticos e substituir o vazio entre o hero e o catálogo por uma seção compacta de diferenciais.

**Architecture:** Manter React e CSS vanilla existentes, sem novas dependências. Alterar apenas tokens globais e os componentes Header, FeatureStrip e CategoryPills/ProductGrid; validar requisitos visuais com testes de contrato CSS/DOM e conferir o resultado renderizado em desktop e mobile.

**Tech Stack:** React 19, Vite 8, CSS vanilla, Vitest, Testing Library.

---

### Task 1: Contratos visuais e semânticos

**Files:**
- Create: `src/components/AccessibilityRefresh.test.jsx`

- [ ] **Step 1: Write the failing tests**

Adicionar testes que exijam a nova paleta `#009C3B`, o título “Por que escolher a Artesani?”, CTA de receita com classe existente e controles de categoria com dimensões legíveis.

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/components/AccessibilityRefresh.test.jsx`

Expected: FAIL porque a paleta, o título e as novas métricas ainda não existem.

### Task 2: Paleta e escala de controles

**Files:**
- Modify: `src/index.css`
- Modify: `src/components/Header.css`
- Modify: `src/components/CategoryPills.css`

- [ ] **Step 1: Implement the minimal CSS**

Trocar os tokens principais para verde-bandeira e derivados, aumentar `.btn`, `.header__quote-btn` e `.category-pill`, e ajustar focos, hover, sombras e fundos que referenciam a paleta antiga.

- [ ] **Step 2: Run focused tests**

Run: `npm test -- src/components/AccessibilityRefresh.test.jsx src/components/BrandPalette.test.js src/components/Header.test.jsx`

Expected: os contratos novos passam; atualizar o teste antigo da paleta para refletir os tokens aprovados.

### Task 3: Seção curta de diferenciais

**Files:**
- Modify: `src/components/FeatureStrip.jsx`
- Modify: `src/components/FeatureStrip.css`
- Modify: `src/components/ProductGrid.css`

- [ ] **Step 1: Add the approved section structure**

Incluir introdução com eyebrow, título e texto curto, manter os quatro diferenciais existentes e organizar a seção em composição assimétrica no desktop e coluna no mobile.

- [ ] **Step 2: Remove the excessive gap**

Reduzir `padding-bottom` da seção e `padding-top` do catálogo para uma passagem compacta, sem sobreposição de conteúdo.

- [ ] **Step 3: Run focused tests**

Run: `npm test -- src/components/AccessibilityRefresh.test.jsx`

Expected: PASS.

### Task 4: Verificação completa e visual

**Files:**
- Modify only if verification reveals a defect in files already in scope.

- [ ] **Step 1: Run automated verification**

Run: `npm test`

Expected: todas as suítes passam.

Run: `npm run lint`

Expected: zero erros; avisos preexistentes devem ser identificados separadamente.

Run: `npm run build`

Expected: build Vite concluído e artefatos gerados em `dist`.

- [ ] **Step 2: Inspect rendered desktop and mobile views**

Abrir `http://127.0.0.1:5173/#inicio`, conferir 1440 x 900 e 390 x 844 e validar: CTA grande, navegação sem colisão, bloco de diferenciais compacto, categorias legíveis e ausência de rolagem horizontal.

- [ ] **Step 3: Correct only verified defects and rerun checks**

Repetir testes, lint, build e inspeção após qualquer correção.

