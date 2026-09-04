import { MessageCircle, Search, ShoppingCart, Check } from 'lucide-react'
import './HowItWorks.css'

const STEPS = [
  {
    icon: Search,
    title: 'Escolha os produtos',
    text: 'Navegue pelo catálogo ou use a busca para encontrar o que precisa.',
  },
  {
    icon: ShoppingCart,
    title: 'Adicione ao carrinho',
    text: 'Defina as quantidades e revise sua seleção quando quiser.',
  },
  {
    icon: MessageCircle,
    title: 'Finalize pelo WhatsApp',
    text: 'Um clique monta a mensagem com seu pedido e abre o WhatsApp.',
  },
  {
    icon: Check,
    title: 'Farmácia confirma',
    text: 'A Artesani confirma disponibilidade e finaliza com você.',
  },
]

export function HowItWorks() {
  return (
    <section className="how-it-works">
      <div className="container">
        <div className="section-head section-head--center">
          <span className="eyebrow">Como funciona</span>
          <h2>Do catálogo ao pedido, em quatro passos</h2>
          <p>Simples e direto, sem cadastro, sem senha, sem etapas extras.</p>
        </div>

        <ol className="how-it-works__steps">
          {STEPS.map((step, index) => (
            <li className="how-it-works__step" key={step.title}>
              <div className="how-it-works__icon">
                <step.icon size={20} strokeWidth={1.8} />
                <span>{index + 1}</span>
              </div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
