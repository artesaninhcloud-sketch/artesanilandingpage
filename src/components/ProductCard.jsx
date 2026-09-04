import { useState } from 'react'
import { Check, Plus } from 'lucide-react'
import { useCartContext } from '../context/CartContext'
import { formatCurrency } from '../utils/formatCurrency'
import { ProductImage } from './ProductImage'
import './ProductCard.css'

export function ProductCard({ product }) {
  const { addItem } = useCartContext()
  const [justAdded, setJustAdded] = useState(false)

  const handleAdd = () => {
    addItem(product)
    setJustAdded(true)
    window.setTimeout(() => setJustAdded(false), 1400)
  }

  const price = formatCurrency(product.price)

  return (
    <article className="product-card">
      <div className="product-card__image">
        {product.category && <span className="product-card__tag">{product.category}</span>}
        <ProductImage src={product.image} alt={product.name} />
      </div>
      <div className="product-card__body">
        <h3 className="product-card__name">{product.name}</h3>
        {product.description && (
          <p className="product-card__description">{product.description}</p>
        )}
        {price && <p className="product-card__price">{price}</p>}
        <button
          type="button"
          className={`product-card__btn ${justAdded ? 'product-card__btn--added' : ''}`}
          onClick={handleAdd}
        >
          {justAdded ? (
            <>
              <Check size={17} strokeWidth={2.4} />
              Adicionado
            </>
          ) : (
            <>
              <Plus size={17} strokeWidth={2.4} />
              Adicionar
            </>
          )}
        </button>
      </div>
    </article>
  )
}
