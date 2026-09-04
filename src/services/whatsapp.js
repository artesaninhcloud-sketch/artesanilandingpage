import { store } from '../data/store'
import { formatCurrency } from '../utils/formatCurrency'

// Monta a mensagem do pedido e retorna o link wa.me pronto para redirecionar o cliente.
// Se algum item do carrinho não tiver preço, o total financeiro simplesmente não é exibido
// (nunca inventamos preço).
export function buildOrderWhatsAppUrl(items) {
  const lines = ['Olá! Gostaria de fazer um pedido na Farmácia Artesani.', '', 'Meu pedido:']

  let totalItems = 0
  let totalValue = 0
  let hasAllPrices = items.length > 0

  for (const item of items) {
    totalItems += item.quantity
    lines.push('', `• ${item.name}`)
    if (item.price != null) {
      const subtotal = item.price * item.quantity
      totalValue += subtotal
      lines.push(`${item.quantity}x ${formatCurrency(item.price)} = ${formatCurrency(subtotal)}`)
    } else {
      hasAllPrices = false
      lines.push(`Quantidade: ${item.quantity}`)
    }
  }

  lines.push('', `Total de itens: ${totalItems}`)
  if (hasAllPrices && totalValue > 0) {
    lines.push(`Total: ${formatCurrency(totalValue)}`)
  }
  lines.push('', 'Gostaria de verificar a disponibilidade e finalizar o pedido.')

  const message = lines.join('\n')
  return `https://wa.me/${store.whatsappNumber}?text=${encodeURIComponent(message)}`
}

export function buildGreetingWhatsAppUrl() {
  const message = 'Olá! Gostaria de mais informações sobre os produtos da Farmácia Artesani.'
  return `https://wa.me/${store.whatsappNumber}?text=${encodeURIComponent(message)}`
}

export function buildPrescriptionQuoteWhatsAppUrl() {
  const message =
    'Olá! Gostaria de orçar uma receita na Farmácia Artesani. Vou enviar a foto da receita por aqui.'
  return `https://wa.me/${store.whatsappNumber}?text=${encodeURIComponent(message)}`
}
