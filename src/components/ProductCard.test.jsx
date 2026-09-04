// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { CartProvider } from '../context/CartContext'
import { ProductCard } from './ProductCard'

const productCardCss = readFileSync(
  resolve(process.cwd(), 'src/components/ProductCard.css'),
  'utf8',
)

describe('ProductCard', () => {
  it('exibe as informações comerciais do produto na estrutura do card', () => {
    render(
      <CartProvider>
        <ProductCard
          product={{
            id: 31,
            name: 'Hydralume',
            description: '30 g',
            price: 65,
            image: '/remedios/novos/hydralume.webp',
            category: 'Cuidados com a pele',
            active: true,
          }}
        />
      </CartProvider>,
    )

    expect(screen.getByRole('heading', { name: 'Hydralume' })).toHaveClass('product-card__name')
    expect(screen.getByText('30 g')).toHaveClass('product-card__description')
    expect(screen.getByText('R$ 65,00')).toHaveClass('product-card__price')
    expect(screen.getByRole('button', { name: 'Adicionar' })).toHaveClass('product-card__btn')
  })

  it('ancora preço e botão na base para alinhar cards com textos diferentes', () => {
    expect(productCardCss).toMatch(/\.product-card__price\s*\{[^}]*margin-top:\s*auto;/s)
  })
})
