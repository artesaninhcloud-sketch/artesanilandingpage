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
