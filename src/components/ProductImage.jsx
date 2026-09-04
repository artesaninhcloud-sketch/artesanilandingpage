import { useState } from 'react'

export function ProductImage({ src, alt }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return <span className="product-card__image-fallback">Imagem indisponível</span>
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      width="400"
      height="400"
      onError={() => setFailed(true)}
    />
  )
}
