import { store } from '../data/store'
import { useProducts } from '../hooks/useProducts'
import './About.css'

export function About() {
  const { products } = useProducts()

  const stats = [
    { value: '25+', label: 'Anos de história' },
    { value: '22', label: 'Unidades em 7 estados' },
    { value: `${store.googleRating}★`, label: `${store.googleReviewCount} avaliações no Google` },
    { value: products.length || '—', label: 'Produtos no catálogo' },
  ]

  return (
    <section id="sobre" className="about">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Sobre a Artesani</span>
          <h2>Nossa história</h2>
        </div>

        <div className="about__grid">
          <div className="about__text">
            <p>
              O nome <strong>Artesani</strong> nasce da união de dois conceitos: <em>arte</em>,
              pela dedicação em cada fórmula manipulada, e <em>sani</em>, do latim, que representa
              o propósito da empresa de promover o bem-estar com responsabilidade, ciência e
              cuidado.
            </p>
            <p>
              Com mais de 25 anos de história, a Artesani é hoje uma rede presente em 22 unidades
              espalhadas por 7 estados brasileiros. A missão é buscar a excelência em cada
              detalhe, com foco em segurança, bem-estar e personalização: manipular com arte e
              entregar saúde com humanidade.
            </p>
            <p>
              Aqui em <strong>Novo Hamburgo</strong>, a unidade Artesani segue esse mesmo padrão:
              fórmulas manipuladas com precisão, dentro dos mais altos padrões de qualidade,
              com atendimento e pedidos feitos diretamente pelo WhatsApp.
            </p>
            <a
              href="https://www.instagram.com/artesaninh/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              Ver no Instagram
            </a>
          </div>

          <div className="about__side">
            <div className="about__photo">
              <img src="/equipe-artesani.jpg" alt="Equipe da Artesani em Novo Hamburgo" />
            </div>

            <div className="about__stats">
              {stats.map((stat) => (
                <div className="about__stat" key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
