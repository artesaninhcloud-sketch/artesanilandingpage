import { describe, expect, it } from 'vitest'
import { formatCurrency } from './formatCurrency'

describe('formatCurrency', () => {
  it('formata valores em real brasileiro', () => {
    expect(formatCurrency(45)).toBe('R$\u00a045,00')
  })

  it('não inventa preço ausente', () => {
    expect(formatCurrency(null)).toBeNull()
  })
})
