# Artesani Frontend Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Entregar uma vitrine premium e acolhedora para a Artesani, com catálogo e fotos visualmente consistentes, preservando carrinho, WhatsApp, catálogo local e API Cloudflare.

**Architecture:** A implementação preserva a arquitetura React/Vite existente e reorganiza somente a apresentação dos componentes. O sistema visual fica centralizado em `src/index.css`; cada seção mantém seu CSS dedicado. O tratamento das fotos será não destrutivo: os JPEGs originais permanecem intactos e um palco branco uniforme elimina a percepção de fundos divergentes sem alterar cores ou textos dos rótulos.

**Tech Stack:** React 19, Vite 8, CSS modular por componente, Lucide React, Cloudflare Pages, Wrangler 4, Worker + D1.

---

## Mapa de arquivos

- `src/index.css`: tokens, tipografia, botões, containers, acessibilidade e redução de movimento.
- `src/components/Header.jsx` e `Header.css`: navegação, marca e ações.
- `src/components/Hero.jsx` e `Hero.css`: primeira dobra e sinais de confiança.
- `src/components/FeatureStrip.jsx` e `FeatureStrip.css`: faixa editorial de benefícios.
- `src/components/ProductGrid.jsx` e `ProductGrid.css`: cabeçalho, busca, ordenação, categorias, grid e estados.
- `src/components/ProductCard.jsx` e `ProductCard.css`: palco da foto, hierarquia comercial e estado de adição.
- `src/components/ProductImage.jsx`: imagem do produto e fallback acessível em caso de falha.
- `src/components/SearchBar.css` e `CategoryPills.css`: controles de descoberta.
- `src/components/About.jsx` e `About.css`: história, equipe e indicadores.
- `src/components/HowItWorks.css`, `Testimonials.css`, `Location.css`, `Faq.css`: seções de apoio.
- `src/components/CartDrawer.css`, `CartItem.css`, `MobileCartBar.css`, `WhatsAppButton.css`, `Toast.css`: compra e feedback.
- `src/components/Footer.jsx` e `Footer.css`: fechamento da página.
- `index.html`: metadados e preload de imagem crítica.
- `src/**/*.test.{js,jsx}`: regressões do fluxo comercial.

### Task 1: Proteger o comportamento comercial existente

**Files:**
- Modify: `package.json`
- Create: `src/services/whatsapp.test.js`
- Create: `src/utils/formatCurrency.test.js`

- [ ] **Step 1: adicionar Vitest como executor de testes**

Executar:

```powershell
npm install -D vitest@latest @testing-library/react@latest @testing-library/jest-dom@latest jsdom@latest
```

Adicionar aos scripts de `package.json`:

```json
"test": "vitest run"
```

- [ ] **Step 2: escrever testes de moeda e mensagem de pedido**

Criar `src/utils/formatCurrency.test.js`:

```js
import { describe, expect, it } from 'vitest'
import { formatCurrency } from './formatCurrency'

describe('formatCurrency', () => {
  it('formata valores em real brasileiro', () => {
    expect(formatCurrency(45)).toBe('R$ 45,00')
  })

  it('não inventa preço ausente', () => {
    expect(formatCurrency(null)).toBeNull()
  })
})
```

Criar `src/services/whatsapp.test.js`:

```js
import { describe, expect, it } from 'vitest'
import { buildOrderWhatsAppUrl } from './whatsapp'

describe('buildOrderWhatsAppUrl', () => {
  it('inclui item, quantidade e total no pedido', () => {
    const url = buildOrderWhatsAppUrl([
      { id: 18, name: 'Clari Mãos Rosa Mosqueta', price: 45, quantity: 2 },
    ])
    const message = decodeURIComponent(url.split('?text=')[1])

    expect(message).toContain('Clari Mãos Rosa Mosqueta')
    expect(message).toContain('2x R$ 45,00 = R$ 90,00')
    expect(message).toContain('Total: R$ 90,00')
  })

  it('omite total quando um item não tem preço', () => {
    const url = buildOrderWhatsAppUrl([
      { id: 99, name: 'Produto sob consulta', price: null, quantity: 1 },
    ])
    const message = decodeURIComponent(url.split('?text=')[1])

    expect(message).toContain('Quantidade: 1')
    expect(message).not.toContain('Total: R$')
  })
})
```

- [ ] **Step 3: executar os testes e confirmar a linha de base**

Run: `npm test`

Expected: 4 testes aprovados.

### Task 2: Construir o sistema visual premium

**Files:**
- Modify: `src/index.css`
- Modify: `index.html`

- [ ] **Step 1: substituir tokens visuais e tipografia**

Definir em `:root` uma paleta única com `--color-primary: #1f5a45`, `--color-primary-dark: #153f32`, `--color-lime: #94b92f`, `--color-bg: #f6f7f1`, `--color-surface: #fffef9`, `--color-ink: #17231d` e bordas esverdeadas suaves. Usar `Manrope` para texto e `Bricolage Grotesque` para títulos, importadas por URL no topo do CSS. A combinação evita o clichê de marfim com serifada de alto contraste e aproxima a identidade da precisão contemporânea de um laboratório de manipulação.

- [ ] **Step 2: atualizar primitivas globais**

Aplicar `text-wrap: balance` nos títulos, `text-wrap: pretty` nos parágrafos, botões com altura mínima de 48 px, foco de 3 px e container máximo de 1240 px. Incluir:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 3: otimizar a imagem crítica**

Adicionar ao `<head>` de `index.html`:

```html
<link rel="preload" as="image" href="/hero-produto.jpg" fetchpriority="high" />
```

- [ ] **Step 4: verificar compilação**

Run: `npm run build`

Expected: `dist/` gerada sem erro.

### Task 3: Reformular cabeçalho, hero e confiança

**Files:**
- Modify: `src/components/Header.jsx`
- Modify: `src/components/Header.css`
- Modify: `src/components/Hero.jsx`
- Modify: `src/components/Hero.css`
- Modify: `src/components/FeatureStrip.jsx`
- Modify: `src/components/FeatureStrip.css`

- [ ] **Step 1: refinar o cabeçalho**

Preservar os mesmos links e handlers. Exibir o texto completo da marca em desktop, manter o ícone no celular e transformar o orçamento de receita no CTA secundário dominante. Garantir `aria-expanded` no menu e altura mínima de 44 px para ações.

- [ ] **Step 2: reorganizar o hero**

Adicionar eyebrow “Manipulação com cuidado e precisão”, selo de atendimento em Novo Hamburgo e uma lista curta de confiança. Manter os dois links existentes e o endereço vindo de `store.address`. A foto deve ocupar a composição sem caixa translúcida solta; o conteúdo usa superfície marfim sólida com borda e sombra controladas.

- [ ] **Step 3: converter benefícios em faixa editorial**

Preservar os quatro textos e ícones de `FEATURES`, reduzindo a repetição visual: divisórias substituem cartões individuais em desktop e uma grade 2×2 permanece no celular.

- [ ] **Step 4: verificar navegação e responsividade inicial**

Run: `npm run build`

Expected: build aprovado e nenhuma mudança nos destinos de links.

### Task 4: Refazer catálogo, controles e fotos

**Files:**
- Modify: `src/components/ProductGrid.jsx`
- Modify: `src/components/ProductGrid.css`
- Modify: `src/components/ProductCard.jsx`
- Modify: `src/components/ProductCard.css`
- Create: `src/components/ProductImage.jsx`
- Create: `src/components/ProductImage.test.jsx`
- Modify: `src/components/SearchBar.css`
- Modify: `src/components/CategoryPills.css`

- [ ] **Step 1: criar cabeçalho comercial do catálogo**

Adicionar a contagem visível `filtered.length` e manter busca, categoria e ordenação sem navegação ou reload. Exibir texto singular/plural com:

```jsx
<span className="product-section__count">
  {filtered.length} {filtered.length === 1 ? 'produto' : 'produtos'}
</span>
```

- [ ] **Step 2: compactar controles**

Busca e ordenação formam uma única toolbar. Em até 639 px, `.category-pills` usa `flex-wrap: nowrap`, `overflow-x: auto` e `scroll-snap-type: x proximity`; cada `.category-pill` usa `scroll-snap-align: start`.

- [ ] **Step 3: escrever o teste que exige fallback para imagem quebrada**

Criar `src/components/ProductImage.test.jsx`:

```jsx
// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ProductImage } from './ProductImage'

describe('ProductImage', () => {
  it('substitui uma imagem quebrada por um fallback acessível', () => {
    render(<ProductImage src="/produto-ausente.jpg" alt="Produto de teste" />)

    fireEvent.error(screen.getByRole('img', { name: 'Produto de teste' }))

    expect(screen.queryByRole('img', { name: 'Produto de teste' })).not.toBeInTheDocument()
    expect(screen.getByText('Imagem indisponível')).toBeVisible()
  })
})
```

Run: `npm test -- src/components/ProductImage.test.jsx`

Expected: FAIL porque `ProductImage` ainda não existe.

- [ ] **Step 4: implementar o fallback e o palco uniforme**

Criar `src/components/ProductImage.jsx`:

```jsx
import { useState } from 'react'

export function ProductImage({ src, alt }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return <span className="product-card__image-fallback">Imagem indisponível</span>
  }

  return <img src={src} alt={alt} loading="lazy" width="400" height="400" onError={() => setFailed(true)} />
}
```

Substituir o `<img>` de `ProductCard.jsx` por `<ProductImage src={product.image} alt={product.name} />`.

Manter os JPEGs originais para preservar rótulos. A área visual do card deve usar fundo branco contínuo, recorte pelo próprio container e a imagem com `object-fit: contain`, escala padronizada e sombra CSS:

```css
.product-card__image {
  background: #fff;
  isolation: isolate;
}

.product-card__image img {
  width: 84%;
  height: 84%;
  object-fit: contain;
  filter: drop-shadow(0 18px 18px rgba(30, 67, 49, 0.12));
}
```

Run: `npm test -- src/components/ProductImage.test.jsx`

Expected: PASS.

- [ ] **Step 5: refinar hierarquia e adição**

Categoria vira pequeno label editorial; nome, descrição, preço e botão mantêm a ordem atual. O botão conserva o estado `justAdded`, com animação reduzida quando solicitado pelo sistema.

- [ ] **Step 6: verificar busca, filtros e card indicado**

No navegador local, pesquisar `Clari`, confirmar um único resultado e inspecionar que não existe retângulo cinza visível ao redor do frasco. Limpar a busca, selecionar uma categoria, alterar ordenação e confirmar que a página não recarrega.

### Task 5: Reformular conteúdo institucional

**Files:**
- Modify: `src/components/About.jsx`
- Modify: `src/components/About.css`
- Modify: `src/components/HowItWorks.css`
- Modify: `src/components/Testimonials.css`
- Modify: `src/components/Location.css`
- Modify: `src/components/Faq.css`

- [ ] **Step 1: criar composição editorial da história**

Preservar todo o texto confirmado, a foto da equipe, o Instagram e os quatro indicadores. Posicionar a foto como elemento principal, texto com largura máxima de 65 caracteres e indicadores em faixa abaixo da imagem.

- [ ] **Step 2: compactar os quatro passos**

Em desktop, usar linha contínua com numeração clara; em celular, manter uma coluna. Não alterar os textos ou a ordem.

- [ ] **Step 3: aumentar credibilidade das avaliações**

Preservar nomes, notas e depoimentos. Destacar a nota visualmente e usar cartões com alturas naturais, sem truncamento.

- [ ] **Step 4: integrar localização e perguntas frequentes**

Manter iframe, endereço, telefone e links. Garantir que o mapa tenha fallback de proporção e que as respostas do FAQ preservem `aria-expanded`.

### Task 6: Refinar carrinho, feedback e rodapé

**Files:**
- Modify: `src/components/CartDrawer.css`
- Modify: `src/components/CartItem.css`
- Modify: `src/components/MobileCartBar.css`
- Modify: `src/components/WhatsAppButton.css`
- Modify: `src/components/Toast.css`
- Modify: `src/components/Footer.jsx`
- Modify: `src/components/Footer.css`

- [ ] **Step 1: alinhar carrinho ao novo sistema visual**

Preservar handlers, cálculos e link do WhatsApp. Aplicar superfície marfim, contraste de total, stepper com alvos de 36 px e botão final com altura mínima de 52 px.

- [ ] **Step 2: impedir sobreposição móvel**

Usar `env(safe-area-inset-bottom)` e elevar o WhatsApp quando a barra do carrinho estiver visível. Adicionar margem inferior ao documento em telas móveis somente quando o carrinho tiver itens, usando a classe já derivada por `whatsapp-fab--raised` como referência visual.

- [ ] **Step 3: refazer rodapé**

Preservar todos os dados e crédito. Organizar marca, contatos e links em colunas no desktop e pilha legível no celular.

### Task 7: Verificar comportamento e qualidade

**Files:**
- Modify only if a defect is found in files already listed above.

- [ ] **Step 1: executar testes automatizados**

Run: `npm test`

Expected: todos os testes aprovados.

- [ ] **Step 2: executar lint**

Run: `npm run lint`

Expected: zero erros.

- [ ] **Step 3: executar build de produção**

Run: `npm run build`

Expected: Vite conclui e gera `dist/`.

- [ ] **Step 4: revisar em desktop**

No navegador em 1440×900, conferir hero, navegação, catálogo, busca, categorias, ordenação, adição, carrinho, FAQ, mapa e rodapé. Confirmar console sem erros relevantes.

- [ ] **Step 5: revisar em celular**

No navegador em 390×844, conferir menu, primeira dobra, categorias horizontais, cards, carrinho, WhatsApp, FAQ e ausência de sobreposições.

- [ ] **Step 6: validar mensagem sem transmissão**

Adicionar dois produtos, abrir o carrinho e inspecionar apenas o `href` do botão “Finalizar pelo WhatsApp”. Confirmar itens, quantidades e total sem abrir ou enviar a mensagem.

### Task 8: Publicar no Cloudflare

**Files:**
- Read: `wrangler.jsonc`
- Read: `dist/**`

- [ ] **Step 1: confirmar versão e conta do Wrangler**

Run: `npx wrangler --version`

Expected: Wrangler 4.x.

Fornecer o token apenas pela entrada padrão da sessão e executar `npx wrangler whoami`; não escrever o token em `.env`, `.dev.vars`, scripts ou histórico.

- [ ] **Step 2: identificar o projeto Pages existente**

Run: `npx wrangler pages project list`

Expected: localizar o projeto da Artesani sem criar duplicata.

- [ ] **Step 3: validar artefato**

Run: `npx wrangler pages deploy dist --project-name artesani-farmacia --branch main`

Expected: deploy concluído e URL HTTPS retornada para o projeto existente `artesani-farmacia`, que atende `artesaninh.com.br` e `www.artesaninh.com.br`.

- [ ] **Step 4: validar produção**

Abrir a URL retornada, confirmar status bem-sucedido, conteúdo atualizado, fotos consistentes, busca e carrinho funcionais. Não enviar mensagens pelo WhatsApp durante a validação.
