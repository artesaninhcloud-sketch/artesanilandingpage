import { Star } from 'lucide-react'
import { testimonials } from '../data/store'
import './Testimonials.css'

function initials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}

export function Testimonials() {
  return (
    <section id="avaliacoes" className="testimonials">
      <div className="container">
        <div className="section-head section-head--center">
          <span className="eyebrow">Avaliações</span>
          <h2>O que dizem nossos clientes</h2>
          <p>Depoimentos reais, publicados no Google.</p>
        </div>

        <div className="testimonials__grid">
          {testimonials.map((testimonial) => (
            <figure className="testimonial" key={testimonial.author}>
              <div className="testimonial__head">
                <span className="testimonial__avatar">{initials(testimonial.author)}</span>
                <div>
                  <figcaption>{testimonial.author}</figcaption>
                  <div className="testimonial__stars">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} size={13} fill="currentColor" strokeWidth={0} />
                    ))}
                  </div>
                </div>
              </div>
              <blockquote>&ldquo;{testimonial.text}&rdquo;</blockquote>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
