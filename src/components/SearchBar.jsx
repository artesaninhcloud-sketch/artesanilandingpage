import { Search, X } from 'lucide-react'
import './SearchBar.css'

export function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <Search size={18} strokeWidth={2} className="search-bar__icon" aria-hidden="true" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Buscar medicamentos..."
        aria-label="Buscar medicamentos"
      />
      {value && (
        <button
          type="button"
          className="search-bar__clear"
          onClick={() => onChange('')}
          aria-label="Limpar busca"
        >
          <X size={16} />
        </button>
      )}
    </div>
  )
}
