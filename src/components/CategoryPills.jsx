import './CategoryPills.css'

export function CategoryPills({ categories, active, onSelect }) {
  return (
    <div className="category-pills" role="group" aria-label="Filtrar por categoria">
      <button
        type="button"
        className={`category-pill ${active === null ? 'category-pill--active' : ''}`}
        onClick={() => onSelect(null)}
      >
        Todas
      </button>
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          className={`category-pill ${active === category ? 'category-pill--active' : ''}`}
          onClick={() => onSelect(category)}
        >
          {category}
        </button>
      ))}
    </div>
  )
}
