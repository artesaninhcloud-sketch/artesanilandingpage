import { useEffect, useState } from 'react'
import { FileText, Menu, ShoppingCart, X } from 'lucide-react'
import { useCartContext } from '../context/CartContext'
import { buildPrescriptionQuoteWhatsAppUrl } from '../services/whatsapp'
import './Header.css'

const NAV_LINKS = [
  { href: '#inicio', label: 'Início' },
  { href: '#produtos', label: 'Produtos' },
  { href: '#sobre', label: 'Sobre' },
  { href: '#avaliacoes', label: 'Avaliações' },
  { href: '#localizacao', label: 'Localização' },
]

export function Header() {
  const { totalItems, openCart } = useCartContext()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      <div className="container header__inner">
        <a href="#inicio" className="header__brand" aria-label="Artesani Farmácia de Manipulação, Novo Hamburgo - RS">
          <img
            src="/logo-icon-transparent.png"
            alt=""
            className="header__brand-icon"
            data-testid="header-brand-icon"
          />
          <span className="header__brand-text">
            <span className="header__brand-row">
              <span className="header__brand-name">Artesani</span>
              <span className="header__brand-divider" aria-hidden="true" />
              <span className="header__brand-type">Farmácia de Manipulação</span>
            </span>
            <span className="header__brand-city">Novo Hamburgo - RS</span>
          </span>
        </a>

        <nav className="header__nav" aria-label="Navegação principal">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="header__actions">
          <a
            href={buildPrescriptionQuoteWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="header__quote-btn"
            aria-label="Orçar receita"
          >
            <FileText size={16} strokeWidth={2} />
            <span className="header__quote-label header__quote-label--mobile">Orçar receita</span>
            <span className="header__quote-label header__quote-label--desktop">
              Orçar minha receita
            </span>
          </a>

          <button
            type="button"
            className="header__cart-btn"
            onClick={openCart}
            aria-label={`Abrir carrinho, ${totalItems} ${totalItems === 1 ? 'item' : 'itens'}`}
          >
            <ShoppingCart size={22} strokeWidth={1.8} />
            {totalItems > 0 && <span className="header__cart-count">{totalItems}</span>}
          </button>

          <button
            type="button"
            className="header__menu-btn"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="header__mobile-nav" aria-label="Navegação mobile">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}
