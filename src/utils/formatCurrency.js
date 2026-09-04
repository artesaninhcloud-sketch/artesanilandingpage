export function formatCurrency(value) {
  if (value == null) return null
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}
