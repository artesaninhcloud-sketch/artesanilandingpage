import { store } from '../data/store'
import { buildGreetingWhatsAppUrl } from '../services/whatsapp'
import { WhatsAppIcon } from './WhatsAppIcon'
import './Hero.css'

export function Hero() {
  return (
    <section id="inicio" className="hero">
      <div className="container hero__grid">
        <div className="hero__content">
          <span className="eyebrow">Manipulação com cuidado e precisão</span>
          <h1>
            Sua farmácia de manipulação, <span>mais perto de você.</span>
          </h1>

          <p className="hero__subtitle">
            Encontre seus produtos e faça seu pedido diretamente pelo WhatsApp, sem cadastro, sem
            login e sem complicação.
          </p>

          <div className="hero__actions">
            <a href="#produtos" className="btn btn-primary">
              Ver produtos
            </a>
            <a
              href={buildGreetingWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              <WhatsAppIcon size={18} />
              Falar no WhatsApp
            </a>
          </div>

          <ul className="hero__trust" aria-label="Diferenciais da Artesani">
            <li>Laboratório próprio</li>
            <li>Atendimento próximo</li>
            <li>Pedido sem cadastro</li>
          </ul>

          <p className="hero__address">
            <span>Novo Hamburgo</span>
            {store.address}
          </p>
        </div>

        <div className="hero__media">
          <img
            src="/hero-produto.jpg"
            alt="Produto manipulado Artesani em composição com cápsulas"
            fetchPriority="high"
          />
          <div className="hero__seal" aria-label="Unidade Artesani em Novo Hamburgo">
            <strong>NH</strong>
            <span>Artesani<br />Novo Hamburgo</span>
          </div>
        </div>
      </div>
    </section>
  )
}
