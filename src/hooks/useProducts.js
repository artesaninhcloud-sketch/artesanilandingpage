import { useEffect, useState } from 'react'
import { fetchProducts } from '../services/products'

export function useProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    fetchProducts().then((data) => {
      if (!cancelled) {
        setProducts(data)
        setLoading(false)
      }
    })
    return () => {
      cancelled = true
    }
  }, [])

  return { products, loading }
}
