// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { FeatureStrip } from './FeatureStrip'

const globalCss = readFileSync(resolve(process.cwd(), 'src/index.css'), 'utf8')
const headerCss = readFileSync(resolve(process.cwd(), 'src/components/Header.css'), 'utf8')
const categoryCss = readFileSync(
  resolve(process.cwd(), 'src/components/CategoryPills.css'),
  'utf8',
)
const productCardCss = readFileSync(
  resolve(process.cwd(), 'src/components/ProductCard.css'),
  'utf8',
)

afterEach(cleanup)

describe('accessibility refresh', () => {
  it('usa verde-bandeira como cor principal da interface', () => {
    expect(globalCss).toContain('--color-primary: #009c3b;')
    expect(globalCss).toContain('--color-primary-dark: #006b2a;')
  })

  it('apresenta os diferenciais como uma seção de escolha da Artesani', () => {
    render(<FeatureStrip />)

    expect(
      screen.getByRole('heading', { name: 'Por que escolher a Artesani?' }),
    ).toBeInTheDocument()
    expect(screen.getByText('Laboratório próprio')).toBeInTheDocument()
    expect(screen.getByText('Resposta em até 5 minutos')).toBeInTheDocument()
    expect(screen.getByText('Entrega ágil, com qualidade')).toBeInTheDocument()
    expect(screen.getByText(/Manipulou na segunda\? Retire na terça\./)).toBeInTheDocument()
  })

  it('mantém ações principais com texto e altura confortáveis', () => {
    expect(globalCss).toMatch(/\.btn\s*\{[^}]*min-height:\s*54px[^}]*font-size:\s*16px/s)
    expect(headerCss).toMatch(
      /@media\s*\(min-width:\s*760px\)[\s\S]*?\.header__quote-btn\s*\{[^}]*min-height:\s*54px[^}]*font-size:\s*16px/s,
    )
    expect(headerCss).toMatch(
      /@media\s*\(max-width:\s*440px\)[\s\S]*?\.header__quote-btn\s*\{[^}]*width:\s*76px[^}]*font-size:\s*12px/s,
    )
  })

  it('usa categorias grandes o suficiente para leitura e toque', () => {
    expect(categoryCss).toMatch(
      /\.category-pill\s*\{[^}]*min-height:\s*48px[^}]*font-size:\s*15px/s,
    )
  })

  it('amplia também a ação de adicionar produtos', () => {
    expect(productCardCss).toMatch(
      /\.product-card__btn\s*\{[^}]*min-height:\s*50px[^}]*font-size:\s*14px/s,
    )
  })

  it('padroniza o catálogo com o verde escuro da marca', () => {
    expect(categoryCss).toMatch(
      /\.category-pill:hover\s*\{[^}]*color:\s*var\(--color-primary-dark\)/s,
    )
    expect(productCardCss).toMatch(
      /\.product-card__tag\s*\{[^}]*border-left:\s*3px\s+solid\s+var\(--color-primary-dark\)/s,
    )
    expect(productCardCss).toMatch(
      /\.product-card__btn\s*\{[^}]*border:\s*1px\s+solid\s+var\(--color-primary-dark\)/s,
    )
  })
})
