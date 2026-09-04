import { useCallback, useEffect, useMemo, useState } from 'react'
import { loadCart, saveCart } from '../utils/storage'

export function useCart() {
  const [items, setItems] = useState(() => loadCart())

  useEffect(() => {
    saveCart(items)
  }, [items])

  const addItem = useCallback((product) => {
    setItems((current) => {
      const existing = current.find((item) => item.id === product.id)
      if (existing) {
        return current.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
      }
      return [
        ...current,
        {
          id: product.id,
          name: product.name,
          image: product.image,
          price: product.price,
          quantity: 1,
        },
      ]
    })
  }, [])

  const increment = useCallback((id) => {
    setItems((current) =>
      current.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item)),
    )
  }, [])

  const decrement = useCallback((id) => {
    setItems((current) =>
      current
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0),
    )
  }, [])

  const removeItem = useCallback((id) => {
    setItems((current) => current.filter((item) => item.id !== id))
  }, [])

  const totalItems = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items])

  return { items, addItem, increment, decrement, removeItem, totalItems }
}
