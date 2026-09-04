# Header Quote Label and Dark Green Palette Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Tornar o orçamento de receita explícito no cabeçalho móvel, aplicar o verde oficial do WhatsApp ao botão flutuante e escurecer a paleta verde do site.

**Architecture:** Preservar os fluxos e componentes React existentes. Separar os rótulos móvel e desktop dentro do mesmo link de orçamento e controlar sua exibição por CSS; centralizar a mudança cromática nos tokens globais e ajustar somente os contrastes diretamente dependentes.

**Tech Stack:** React 19, Vite 8, CSS por componente, Vitest, Testing Library, Cloudflare Pages.

---

### Task 1: Criar regressões para rótulo e paleta

**Files:**
- Create: `src/components/Header.test.jsx`
- Create: `src/components/BrandPalette.test.js`
- Test: `src/components/Header.test.jsx`
- Test: `src/components/BrandPalette.test.js`

- [ ] **Step 1: Criar o teste do rótulo de orçamento**

```jsx
// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { CartProvider } from '../context/CartContext'
import { Header } from './Header'

describe('Header', () => {
  it('expõe rótulos claros para orçar receita no celular e no desktop', () => {
    render(<CartProvider><Header /></CartProvider>)

    const quoteLink = screen.getByRole('link', { name: 'Orçar receita' })
    expect(within(quoteLink).getByText('Orçar receita')).toHaveClass('header__quote-label--mobile')
    expect(within(quoteLink).getByText('Orçar minha receita')).toHaveClass('header__quote-label--desktop')
  })
})
```

- [ ] **Step 2: Criar o teste dos tokens e breakpoints**

```js
import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const globalCss = readFileSync(new URL('../index.css', import.meta.url), 'utf8')
const headerCss = readFileSync(new URL('./Header.css', import.meta.url), 'utf8')

describe('brand palette and quote action', () => {
  it('usa a paleta verde escura e o verde oficial do WhatsApp', () => {
    expect(globalCss).toContain('--color-primary: #4a6709;')
    expect(globalCss).toContain('--color-lime: #64860c;')
    expect(globalCss).toContain('--color-whatsapp: #25d366;')
  })

  it('mostra o rótulo curto no celular e o completo no desktop', () => {
    expect(headerCss).toMatch(/\.header__quote-label--mobile[^}]*display:\s*inline/s)
    expect(headerCss).toMatch(/@media\s*\(min-width:\s*760px\)[^{]*\{[^}]*\.header__quote-label--mobile[^}]*display:\s*none/s)
    expect(headerCss).toMatch(/@media\s*\(min-width:\s*760px\)[\s\S]*\.header__quote-label--desktop[^}]*display:\s*inline/s)
  })
})
```

- [ ] **Step 3: Confirmar o estado RED**

Run: `npm test -- src/components/Header.test.jsx src/components/BrandPalette.test.js`

Expected: falhas por ausência dos rótulos separados, dos novos tokens e das regras responsivas.

### Task 2: Implementar o rótulo responsivo

**Files:**
- Modify: `src/components/Header.jsx`
- Modify: `src/components/Header.css`

- [ ] **Step 1: Separar os rótulos no link existente**

Adicionar `aria-label="Orçar receita"` ao link e substituir o único `span` por:

```jsx
<span className="header__quote-label header__quote-label--mobile">Orçar receita</span>
<span className="header__quote-label header__quote-label--desktop">Orçar minha receita</span>
```

- [ ] **Step 2: Aplicar o layout móvel e desktop**

Substituir o comportamento atual do rótulo por:

```css
.header__quote-btn {
  width: 58px;
  min-height: 54px;
  flex-direction: column;
  justify-content: center;
  gap: 2px;
  padding: 5px 4px;
  font-size: 9px;
  line-height: 1.05;
  text-align: center;
}

.header__quote-label--mobile {
  display: inline;
  max-width: 46px;
  white-space: normal;
}

.header__quote-label--desktop { display: none; }

@media (min-width: 760px) {
  .header__quote-btn {
    width: auto;
    min-height: 42px;
    flex-direction: row;
    gap: 8px;
    padding: 9px 14px;
    font-size: 12px;
    line-height: normal;
  }
  .header__quote-label--mobile { display: none; }
  .header__quote-label--desktop { display: inline; }
}
```

Em `max-width: 719px`, usar `gap: 8px` no interior do cabeçalho e `gap: 4px` nas ações. Em `max-width: 440px`, preservar os 58 px do botão, reduzir o ícone da marca para 30 px e o nome para 17 px. Manter `.header__quote-btn { display: none; }` em `max-width: 359px`.

- [ ] **Step 3: Confirmar o teste do cabeçalho**

Run: `npm test -- src/components/Header.test.jsx`

Expected: 1 teste aprovado.

### Task 3: Aplicar a paleta escura e o verde do WhatsApp

**Files:**
- Modify: `src/index.css`
- Modify: `src/components/Hero.css`
- Modify: `src/components/About.css`
- Modify: `src/components/ProductGrid.css`
- Modify: `src/components/SearchBar.css`
- Modify: `src/components/WhatsAppButton.css`

- [ ] **Step 1: Atualizar os tokens globais**

```css
--color-primary: #4a6709;
--color-primary-dark: #355006;
--color-primary-darker: #243704;
--color-primary-light: #eaf0dc;
--color-primary-soft: #d8e3be;
--color-primary-mid: #58780a;
--color-lime: #64860c;
--color-lime-soft: #e7eed7;
--color-whatsapp: #25d366;
--color-whatsapp-dark: #1ebe5d;
```

- [ ] **Step 2: Corrigir contraste e ambiência**

Usar os seguintes valores:

```css
.btn-primary {
  background: var(--color-lime);
  color: #fff;
  box-shadow: 0 12px 26px rgba(74, 103, 9, 0.24);
}
```

Substituir `rgba(148, 185, 47, 0.08)`, `rgba(148, 185, 47, 0.11)` e `rgba(148, 185, 47, 0.12)` por `rgba(74, 103, 9, 0.08)`, `rgba(74, 103, 9, 0.11)` e `rgba(74, 103, 9, 0.12)` respectivamente. Substituir os anéis `rgba(100, 134, 12, ...)` por `rgba(74, 103, 9, ...)` mantendo a opacidade.

- [ ] **Step 3: Ajustar o botão flutuante**

Manter o token e atualizar a sombra:

```css
.whatsapp-fab {
  background: var(--color-whatsapp);
  color: #fff;
  box-shadow: 0 18px 38px rgba(18, 140, 69, 0.3);
}
```

- [ ] **Step 4: Confirmar os testes de paleta**

Run: `npm test -- src/components/BrandPalette.test.js`

Expected: 2 testes aprovados.

### Task 4: Verificar e publicar

**Files:**
- Verify: `src/components/Header.jsx`
- Verify: `src/components/Header.css`
- Verify: `src/index.css`
- Deploy: `dist/`

- [ ] **Step 1: Executar a verificação completa**

Run: `npx vitest run --maxWorkers=1`

Expected: todos os testes aprovados.

Run: `npm run lint`

Expected: nenhum erro; os dois avisos preexistentes podem permanecer.

Run: `npm run build`

Expected: build Vite concluído com código 0.

- [ ] **Step 2: Fazer QA responsivo**

Conferir 320, 360, 390, 760, 1099, 1100 e 1440 px. Validar rótulos corretos, ausência de overflow, contraste dos verdes e botão flutuante `rgb(37, 211, 102)`.

- [ ] **Step 3: Publicar e validar produção**

Disponibilizar `CLOUDFLARE_API_TOKEN` apenas em memória e executar:

```powershell
npx wrangler pages deploy dist --project-name artesani-farmacia --branch main
```

Validar `https://artesaninh.com.br` e o CSS publicado.

> A pasta não é um repositório Git; não há etapas de commit, merge ou pull request.
