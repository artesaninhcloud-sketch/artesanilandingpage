import { useCartContext } from '../context/CartContext'
import { buildGreetingWhatsAppUrl, buildOrderWhatsAppUrl } from '../services/whatsapp'
import { WhatsAppIcon } from './WhatsAppIcon'
import './WhatsAppButton.css'

export function WhatsAppButton() {
  const { items } = useCartContext()
  const hasItems = items.length > 0
  const href = hasItems ? buildOrderWhatsAppUrl(items) : buildGreetingWhatsAppUrl()

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`whatsapp-fab ${hasItems ? 'whatsapp-fab--raised' : ''}`}
      aria-label={hasItems ? 'Finalizar pedido pelo WhatsApp' : 'Falar com a farmácia no WhatsApp'}
    >
      <WhatsAppIcon size={28} />
    </a>
  )
}
