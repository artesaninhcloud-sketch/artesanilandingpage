import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import './Faq.css'

const FAQ_ITEMS = [
  {
    question: 'Como faço um pedido?',
    answer:
      'Escolha os produtos no catálogo, adicione ao carrinho e clique em "Finalizar pelo WhatsApp". Sua mensagem já sai pronta com os itens selecionados.',
  },
  {
    question: 'Preciso me cadastrar ou criar uma conta?',
    answer: 'Não. Este site não tem cadastro, login ou formulário, só o carrinho e o WhatsApp.',
  },
  {
    question: 'Como funciona o pagamento?',
    answer:
      'O pagamento não é feito pelo site. Ele é combinado diretamente com a farmácia durante a conversa no WhatsApp.',
  },
  {
    question: 'Os preços do site são os finais?',
    answer:
      'Os preços exibidos são os cadastrados pela farmácia. Qualquer detalhe sobre disponibilidade ou valor final é confirmado diretamente no WhatsApp.',
  },
  {
    question: 'Vocês fazem entrega ou é só retirada?',
    answer: 'Consulte a disponibilidade de entrega ou retirada diretamente com a farmácia pelo WhatsApp.',
  },
]

export function Faq() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="faq" className="faq">
      <div className="container">
        <div className="section-head section-head--center">
          <span className="eyebrow">Dúvidas</span>
          <h2>Perguntas frequentes</h2>
          <p>Sobre como funciona o pedido neste site.</p>
        </div>

        <div className="faq__list">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index
            return (
              <div className="faq__item" key={item.question}>
                <button
                  type="button"
                  className="faq__question"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  aria-expanded={isOpen}
                >
                  <span>{item.question}</span>
                  <ChevronDown
                    size={18}
                    strokeWidth={2}
                    className={`faq__chevron ${isOpen ? 'faq__chevron--open' : ''}`}
                  />
                </button>
                {isOpen && <p className="faq__answer">{item.answer}</p>}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
