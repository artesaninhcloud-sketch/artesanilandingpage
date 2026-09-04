import { FlaskConical, PackageCheck, ShieldCheck, Timer } from 'lucide-react'
import { WhatsAppIcon } from './WhatsAppIcon'
import './FeatureStrip.css'

const FEATURES = [
  {
    icon: FlaskConical,
    title: 'Laboratório próprio',
    text: 'Manipulamos aqui mesmo: pedidos ficam prontos no mesmo dia ou no dia seguinte.',
    highlight: true,
  },
  {
    icon: Timer,
    title: 'Resposta em até 5 minutos',
    text: 'Todas as mensagens do WhatsApp são respondidas rapidamente.',
    highlight: true,
  },
  {
    icon: PackageCheck,
    title: 'Entrega ágil, com qualidade',
    text: 'Manipulou na segunda? Retire na terça. Em alguns casos, pedidos feitos pela manhã ficam prontos no mesmo dia.',
    highlight: true,
  },
  {
    icon: WhatsAppIcon,
    title: 'Pedido pelo WhatsApp',
    text: 'Monte seu pedido e envie direto para a farmácia, sem formulários.',
  },
  {
    icon: ShieldCheck,
    title: 'Sem cadastro',
    text: 'Nenhum dado pessoal é solicitado ou armazenado no site.',
  },
]

export function FeatureStrip() {
  return (
    <section className="feature-strip" aria-label="Diferenciais da Artesani">
      <div className="container">
        <div className="feature-strip__panel">
          <div className="feature-strip__intro">
            <span className="eyebrow">Cuidado de verdade</span>
            <h2>Por que escolher a Artesani?</h2>
            <p>
              Da manipulação ao atendimento, cada etapa foi pensada para deixar seu pedido mais
              simples, rápido e próximo.
            </p>
          </div>

          <div className="feature-strip__grid">
            {FEATURES.map((feature) => (
              <article className="feature-strip__card" key={feature.title}>
                <feature.icon size={22} strokeWidth={1.8} />
                <div>
                  <h3>{feature.title}</h3>
                  <p>{feature.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
