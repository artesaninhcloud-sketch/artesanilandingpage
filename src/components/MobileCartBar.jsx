import { useCartContext } from '../context/CartContext'
import { buildOrderWhatsAppUrl } from '../services/whatsapp'
import { formatCurrency } from '../utils/formatCurrency'
import { WhatsAppIcon } from './WhatsAppIcon'
import './MobileCartBar.css'

export function MobileCartBar() {
  const { items, totalItems } = useCartContext()

  if (items.length === 0) return null

  const hasAllPrices = items.every((item) => item.price != null)
  const total = hasAllPrices
    ? items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    : null

  return (
    <div className="mobile-cart-bar">
      <div className="mobile-cart-bar__info">
        <span>
          {totalItems} {totalItems === 1 ? 'item' : 'itens'}
        </span>
        {total != null && <strong>{formatCurrency(total)}</strong>}
      </div>
      <a
        href={buildOrderWhatsAppUrl(items)}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-whatsapp"
      >
        <WhatsAppIcon size={16} />
        Finalizar pelo WhatsApp
      </a>
    </div>
  )
}
