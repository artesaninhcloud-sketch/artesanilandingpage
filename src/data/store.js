// Dados reais da farmácia — fonte: info artesani.txt + confirmação ao vivo no Google Maps.
// Não alterar/complementar com informações não confirmadas por essas fontes.

export const store = {
  name: 'Artesani',
  fullName: 'Artesani Farmácia de Manipulação',
  whatsappNumber: '5551981992314', // (51) 98199-2314, formato E.164 sem símbolos
  whatsappDisplay: '(51) 98199-2314',
  address: 'Av. Pedro Adams Filho, 5641 - Centro, Novo Hamburgo - RS, 93510-135',
  // Coordenadas resolvidas pelo geocoding do próprio Google Maps para este endereço exato.
  coordinates: { lng: -51.1301426, lat: -29.682726 },
  instagram: 'https://www.instagram.com/artesaninh/',
  googleRating: 4.8,
  googleReviewCount: 43,
}

export const testimonials = [
  {
    author: 'Marcia Bohrer',
    rating: 5,
    text: 'Excelente farmácia de manipulação! Equipe competente, produtos confiáveis, de primeira qualidade e preço justo. Ampla variedade de medicamentos. Super recomendo!!',
  },
  {
    author: 'Elaine Rodrigues da Rocha',
    rating: 5,
    text: 'Ótimo atendimento, ótimos preços, ótima qualidade, já sou cliente a anos!',
  },
  {
    author: 'Melanie Hahn Scheid',
    rating: 5,
    text: 'Ótimo atendimento, pessoas simpáticas, são muito solícitos!!! Tudo que precisava conseguiram pra mim.',
  },
  {
    author: 'Alessandra Silva',
    rating: 5,
    text: 'Farmácia preferida da nossa família, só compramos na Artesani, remédios manipulados de qualidade.',
  },
]
