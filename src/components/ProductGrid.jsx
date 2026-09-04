import { useMemo, useState } from 'react'
import { SearchBar } from './SearchBar'
import { ProductCard } from './ProductCard'
import { CategoryPills } from './CategoryPills'
import { useProducts } from '../hooks/useProducts'
import './ProductGrid.css'

function normalize(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
}

const SORT_OPTIONS = [
  { value: 'default', label: 'Relevância' },
  { value: 'price-asc', label: 'Menor preço' },
  { value: 'price-desc', label: 'Maior preço' },
  { value: 'name-asc', label: 'Nome A-Z' },
]

export function ProductGrid() {
  const { products, loading } = useProducts()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState(null)
  const [sort, setSort] = useState('default')

  const categories = useMemo(
    () => [...new Set(products.map((p) => p.category).filter(Boolean))],
    [products],
  )

  const filtered = useMemo(() => {
    let list = products

    if (category) {
      list = list.filter((product) => product.category === category)
    }

    if (query.trim()) {
      const q = normalize(query.trim())
      list = list.filter((product) => normalize(product.name).includes(q))
    }

    if (sort === 'price-asc') {
      list = [...list].sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity))
    } else if (sort === 'price-desc') {
      list = [...list].sort((a, b) => (b.price ?? -Infinity) - (a.price ?? -Infinity))
    } else if (sort === 'name-asc') {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'))
    }

    return list
  }, [products, query, category, sort])

  return (
    <section id="produtos" className="product-section">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Catálogo</span>
          <h2>Nossos produtos</h2>
          <p>Escolha os produtos e finalize seu pedido diretamente pelo WhatsApp.</p>
        </div>

        <div className="product-section__toolbar">
          <SearchBar value={query} onChange={setQuery} />
          <select
            className="product-section__sort"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            aria-label="Ordenar produtos"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {categories.length > 1 && (
          <CategoryPills categories={categories} active={category} onSelect={setCategory} />
        )}

        {!loading && (
          <div className="product-section__results" aria-live="polite">
            <span className="product-section__count">
              {filtered.length} {filtered.length === 1 ? 'produto' : 'produtos'}
            </span>
            {(query || category) && (
              <button
                type="button"
                onClick={() => {
                  setQuery('')
                  setCategory(null)
                }}
              >
                Limpar filtros
              </button>
            )}
          </div>
        )}

        {loading ? (
          <div className="product-grid">
            {Array.from({ length: 8 }).map((_, i) => (
              <div className="product-card-skeleton" key={i} />
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <div className="product-grid">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="product-section__empty">
            <p>Nenhum produto encontrado.</p>
            <span>Tente buscar por outro nome.</span>
          </div>
        )}
      </div>
    </section>
  )
}
