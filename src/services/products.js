import { products as localProducts } from '../data/products'

const API_URL = import.meta.env.VITE_API_URL || '/api'

// Busca o catálogo via Cloudflare Worker (/api/products, backed by D1).
// Se a API ainda não estiver publicada (ambiente local sem worker, ou build
// estático sem backend configurado), cai de volta para o catálogo local —
// assim o site nunca fica sem produtos.
export async function fetchProducts() {
  try {
    const response = await fetch(`${API_URL}/products`)
    if (!response.ok) throw new Error(`API respondeu ${response.status}`)
    const data = await response.json()
    if (!Array.isArray(data) || data.length === 0) throw new Error('Catálogo vazio')
    return data.filter((product) => product.active)
  } catch {
    return localProducts.filter((product) => product.active)
  }
}
