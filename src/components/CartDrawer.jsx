import { useEffect } from 'react'
import { ShoppingBag, X } from 'lucide-react'
import { useCartContext } from '../context/CartContext'
import { CartItem } from './CartItem'
import { buildOrderWhatsAppUrl } from '../services/whatsapp'
import { formatCurrency } from '../utils/formatCurrency'
import { WhatsAppIcon } from './WhatsAppIcon'
import './CartDrawer.css'

export function CartDrawer() {
  const { items, isOpen, closeCart, increment, decrement, removeItem, totalItems } =
    useCartContext()

  useEffect(() => {
    if (!isOpen) return
    document.body.style.overflow = 'hidden'
    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeCart()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, closeCart])

  if (!isOpen) return null

  const hasAllPrices = items.length > 0 && items.every((item) => item.price != null)
  const total = hasAllPrices
    ? items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    : null

  return (
    <div className="cart-drawer-overlay" onClick={closeCart}>
      <aside
        className="cart-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Seu carrinho"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="cart-drawer__header">
          <h2>Seu carrinho</h2>
          <button type="button" onClick={closeCart} aria-label="Fechar carrinho">
            <X size={20} />
          </button>
        </header>

        {items.length === 0 ? (
          <div className="cart-drawer__empty">
            <ShoppingBag size={40} strokeWidth={1.4} />
            <p>Seu carrinho está vazio.</p>
            <span>Adicione produtos para iniciar seu pedido.</span>
            <button type="button" className="btn btn-primary" onClick={closeCart}>
              Ver produtos
            </button>
          </div>
        ) : (
          <>
            <ul className="cart-drawer__list">
              {items.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onIncrement={increment}
                  onDecrement={decrement}
                  onRemove={removeItem}
                />
              ))}
            </ul>

            <footer className="cart-drawer__footer">
              <div className="cart-drawer__summary">
                <span>
                  {totalItems} {totalItems === 1 ? 'item' : 'itens'}
                </span>
                {total != null && <strong>{formatCurrency(total)}</strong>}
              </div>
              <a
                href={buildOrderWhatsAppUrl(items)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-block"
              >
                <WhatsAppIcon size={18} />
                Finalizar pelo WhatsApp
              </a>
            </footer>
          </>
        )}
      </aside>
    </div>
  )
}
