import { Minus, Plus, Trash2 } from 'lucide-react'
import { formatCurrency } from '../utils/formatCurrency'
import './CartItem.css'

export function CartItem({ item, onIncrement, onDecrement, onRemove }) {
  const subtotal = item.price != null ? formatCurrency(item.price * item.quantity) : null

  return (
    <li className="cart-item">
      <div className="cart-item__image">
        <img src={item.image} alt={item.name} width="64" height="64" loading="lazy" />
      </div>

      <div className="cart-item__info">
        <p className="cart-item__name">{item.name}</p>
        {subtotal && <p className="cart-item__subtotal">{subtotal}</p>}

        <div className="cart-item__controls">
          <div className="cart-item__stepper">
            <button
              type="button"
              onClick={() => onDecrement(item.id)}
              aria-label={`Diminuir quantidade de ${item.name}`}
            >
              <Minus size={14} strokeWidth={2.4} />
            </button>
            <span aria-live="polite">{item.quantity}</span>
            <button
              type="button"
              onClick={() => onIncrement(item.id)}
              aria-label={`Aumentar quantidade de ${item.name}`}
            >
              <Plus size={14} strokeWidth={2.4} />
            </button>
          </div>

          <button
            type="button"
            className="cart-item__remove"
            onClick={() => onRemove(item.id)}
            aria-label={`Remover ${item.name} do carrinho`}
          >
            <Trash2 size={16} strokeWidth={2} />
          </button>
        </div>
      </div>
    </li>
  )
}
