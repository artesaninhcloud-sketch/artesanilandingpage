import { createContext, useContext, useState, useCallback } from 'react'
import { useCart } from '../hooks/useCart'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const cart = useCart()
  const [isOpen, setIsOpen] = useState(false)
  const [toast, setToast] = useState(null)

  const notify = useCallback((message) => {
    setToast(message)
  }, [])

  const addItem = useCallback(
    (product) => {
      cart.addItem(product)
      notify(`${product.name} adicionado ao carrinho`)
    },
    [cart, notify],
  )

  const openCart = useCallback(() => setIsOpen(true), [])
  const closeCart = useCallback(() => setIsOpen(false), [])

  const value = {
    ...cart,
    addItem,
    isOpen,
    openCart,
    closeCart,
    toast,
    clearToast: () => setToast(null),
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCartContext() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCartContext deve ser usado dentro de CartProvider')
  return ctx
}
