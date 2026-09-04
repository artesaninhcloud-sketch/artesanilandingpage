import { describe, expect, it } from 'vitest'
import { buildOrderWhatsAppUrl } from './whatsapp'

describe('buildOrderWhatsAppUrl', () => {
  it('inclui item, quantidade e total no pedido', () => {
    const url = buildOrderWhatsAppUrl([
      { id: 18, name: 'Clari Mãos Rosa Mosqueta', price: 45, quantity: 2 },
    ])
    const message = decodeURIComponent(url.split('?text=')[1])

    expect(message).toContain('Clari Mãos Rosa Mosqueta')
    expect(message).toContain('2x R$\u00a045,00 = R$\u00a090,00')
    expect(message).toContain('Total: R$\u00a090,00')
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
