import { AtSign, MapPin } from 'lucide-react'
import { store } from '../data/store'
import { WhatsAppIcon } from './WhatsAppIcon'
import './Footer.css'

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <span className="footer__brand-name">Artesani</span>
          <span className="footer__brand-type">Farmácia de Manipulação</span>
        </div>

        <ul className="footer__info">
          <li>
            <MapPin size={16} strokeWidth={1.8} />
            <span>{store.address}</span>
          </li>
          <li>
            <WhatsAppIcon size={16} />
            <a
              href={`https://wa.me/${store.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {store.whatsappDisplay}
            </a>
          </li>
          <li>
            <AtSign size={16} strokeWidth={1.8} />
            <a href={store.instagram} target="_blank" rel="noopener noreferrer">
              @artesaninh
            </a>
          </li>
        </ul>

        <p className="footer__copy">© 2026 Farmácia Artesani</p>
        <p className="footer__credit">Desenvolvido por Matheus Ramos - Solaire w+</p>
      </div>
    </footer>
  )
}
