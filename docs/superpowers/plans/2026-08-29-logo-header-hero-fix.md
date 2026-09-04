# Logo Header and Hero Fix Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remover o quadrado branco visível atrás do ícone da Artesani e eliminar a linha vertical tracejada do hero.

**Architecture:** Manter os componentes React e os arquivos de imagem existentes. Corrigir a composição do ícone e remover o ornamento do hero apenas em CSS, preservando toda a estrutura e o comportamento comercial da página.

**Tech Stack:** React 19, Vite 8, CSS modular por componente, Vitest, Cloudflare Pages.

---

### Task 1: Criar a regressão visual automatizada

**Files:**
- Create: `src/components/HeaderVisuals.test.js`
- Test: `src/components/HeaderVisuals.test.js`

- [ ] **Step 1: Escrever o teste que descreve as duas correções**

```js
import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const headerCss = readFileSync(new URL('./Header.css', import.meta.url), 'utf8')
const heroCss = readFileSync(new URL('./Hero.css', import.meta.url), 'utf8')

describe('tratamento visual da marca', () => {
  it('integra o branco do ícone ao fundo do cabeçalho', () => {
    expect(headerCss).toMatch(
      /\.header__brand-icon\s*\{[^}]*mix-blend-mode:\s*multiply;/s,
    )
  })

  it('não renderiza a linha vertical tracejada no hero', () => {
    expect(heroCss).not.toMatch(/\.hero__content::after\s*\{/)
  })
})
```

- [ ] **Step 2: Executar o teste e confirmar a falha esperada**

Run: `npm test -- src/components/HeaderVisuals.test.js`

Expected: 2 testes falham porque `mix-blend-mode: multiply` ainda não existe e `.hero__content::after` ainda está definido.

### Task 2: Aplicar a correção mínima no CSS

**Files:**
- Modify: `src/components/Header.css`
- Modify: `src/components/Hero.css`
- Test: `src/components/HeaderVisuals.test.js`

- [ ] **Step 1: Integrar o fundo branco do PNG ao cabeçalho**

Substituir a regra de `.header__brand-icon` por:

```css
.header__brand-icon {
  height: 38px;
  width: auto;
  object-fit: contain;
  flex-shrink: 0;
  mix-blend-mode: multiply;
}
```

- [ ] **Step 2: Remover o ornamento tracejado**

Excluir integralmente de `src/components/Hero.css`:

```css
.hero__content::after {
  content: '';
  position: absolute;
  top: 28px;
  bottom: 28px;
  left: 10px;
  width: 4px;
  border-radius: 999px;
  background: repeating-linear-gradient(to bottom, var(--color-lime) 0 18px, transparent 18px 25px);
  opacity: 0.65;
}
```

- [ ] **Step 3: Confirmar o ciclo verde**

Run: `npm test -- src/components/HeaderVisuals.test.js`

Expected: 2 testes aprovados.

### Task 3: Verificar a aplicação completa

**Files:**
- Verify: `src/components/Header.css`
- Verify: `src/components/Hero.css`

- [ ] **Step 1: Executar todas as verificações**

Run: `npm test`

Expected: todos os testes aprovados.

Run: `npm run lint`

Expected: nenhum erro de lint; os dois avisos preexistentes podem permanecer.

Run: `npm run build`

Expected: build Vite concluído com código de saída 0.

- [ ] **Step 2: Fazer QA visual local**

Run: `npm run dev -- --host 127.0.0.1`

Conferir em desktop e em 390 x 844 que o ícone não exibe retângulo branco, que a linha tracejada não aparece e que o conteúdo do hero permanece alinhado e sem rolagem horizontal.

### Task 4: Publicar e validar em produção

**Files:**
- Deploy: `dist/`

- [ ] **Step 1: Publicar o build**

Disponibilizar `CLOUDFLARE_API_TOKEN` somente em memória por prompt seguro e executar:

```powershell
npx wrangler pages deploy dist --project-name artesani-farmacia --branch main
```

Expected: Wrangler retorna `Deployment complete` e uma URL de deployment.

- [ ] **Step 2: Validar o domínio oficial**

Abrir `https://artesaninh.com.br` em desktop e em 390 x 844. Confirmar a ausência do quadrado branco e da linha tracejada, além de verificar que não existem erros no console.

> Esta pasta não é um repositório Git; portanto, não há etapas de commit, merge ou pull request.

