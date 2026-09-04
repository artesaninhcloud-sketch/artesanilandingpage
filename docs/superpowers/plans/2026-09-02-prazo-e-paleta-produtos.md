# Prazo e paleta do catálogo Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Comunicar a retirada rápida da Artesani e aplicar uma paleta verde consistente somente no catálogo.

**Architecture:** O diferencial será um novo item declarativo no `FeatureStrip`. A consistência visual ficará concentrada em `CategoryPills.css` e `ProductCard.css`, reutilizando as variáveis de `src/index.css` sem alterar a estrutura React.

**Tech Stack:** React, CSS, Vitest, Vite.

---

### Task 1: Cobrir o novo diferencial e a paleta

**Files:**
- Modify: `src/components/AccessibilityRefresh.test.jsx`
- Modify: `src/components/FeatureStrip.jsx`
- Modify: `src/components/CategoryPills.css`
- Modify: `src/components/ProductCard.css`

- [ ] **Step 1: Write the failing assertions**

Adicionar ao teste de acessibilidade asserções para `Entrega ágil, com qualidade` e o texto `Manipulou na segunda? Retire na terça.`; adicionar verificações dos seletores de catálogo para `var(--color-primary-dark)` nos estados ativos e `var(--color-primary)` no preço.

- [ ] **Step 2: Run focused test**

Run: `npm test -- src/components/AccessibilityRefresh.test.jsx`
Expected: FAIL porque o diferencial ainda não existe e os seletores ainda não estão padronizados.

- [ ] **Step 3: Implement minimal UI and CSS changes**

Adicionar o item de dados no array existente do `FeatureStrip` e ajustar apenas os estilos de pills/card para reutilizar o verde escuro e superfícies verdes já definidos nas variáveis globais.

- [ ] **Step 4: Run focused test again**

Run: `npm test -- src/components/AccessibilityRefresh.test.jsx`
Expected: PASS.

### Task 2: Verificação final

**Files:** Nenhum adicional.

- [ ] **Step 1: Run full checks**

Run: `npm test`; `npm run lint`; `npm run build`
Expected: testes e build passam; lint sem erros (avisos preexistentes podem permanecer).
