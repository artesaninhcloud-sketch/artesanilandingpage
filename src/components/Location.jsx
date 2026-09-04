import { lazy, Suspense } from 'react'
import { Clock, MapPin } from 'lucide-react'
import { store } from '../data/store'
import { WhatsAppIcon } from './WhatsAppIcon'
import './Location.css'

const StoreMap = lazy(() =>
  import('./StoreMap').then((module) => ({ default: module.StoreMap })),
)

const mapQuery = encodeURIComponent(store.address)
const mapLinkSrc = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`

export function Location() {
  return (
    <section id="localizacao" className="location">
      <div className="container location__grid">
        <div className="location__info">
          <span className="eyebrow">Localização</span>
          <h2>Visite ou fale com a gente</h2>

          <ul className="location__list">
            <li>
              <MapPin size={19} strokeWidth={1.8} />
              <div>
                <strong>Endereço</strong>
                <span>{store.address}</span>
              </div>
            </li>
            <li>
              <WhatsAppIcon size={19} />
              <div>
                <strong>WhatsApp</strong>
                <span>{store.whatsappDisplay}</span>
              </div>
            </li>
            <li>
              <Clock size={19} strokeWidth={1.8} />
              <div>
                <strong>Atendimento</strong>
                <span>Respondemos em até 5 minutos, direto pelo WhatsApp</span>
              </div>
            </li>
          </ul>

          <a
            href={mapLinkSrc}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
          >
            Abrir no Google Maps
          </a>
        </div>

        <div className="location__map">
          <Suspense
            fallback={
              <div className="location__map-loading" role="status">
                Carregando mapa
              </div>
            }
          >
            <StoreMap
              name={store.name}
              address={store.address}
              coordinates={store.coordinates}
            />
          </Suspense>
        </div>
      </div>
    </section>
  )
}
