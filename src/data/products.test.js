import { existsSync, readFileSync, statSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { products } from './products'

describe('catálogo de produtos', () => {
  it('mantém o seed do D1 alinhado com os dados aprovados', () => {
    const seedPath = fileURLToPath(new URL('../../seed.sql', import.meta.url))
    const seed = readFileSync(seedPath, 'utf8')

    expect(seed).toContain("'120 cápsulas (60 doses)', 55.00")
    expect(seed).toContain("'Dimpless 40mg', '30 cápsulas', 125.00, '/remedios/novos/dimpless.webp'")
  })

  it('apresenta a Glucosamina de R$ 55 com 120 cápsulas e 60 doses', () => {
    const glucosamina = products.find(
      (product) => product.name === 'Glucosamina 500mg + Condroitina 400mg',
    )

    expect(glucosamina).toMatchObject({
      description: '120 cápsulas (60 doses)',
      price: 55,
      active: true,
    })
  })

  it('usa a foto nova padronizada no Dimpless', () => {
    const dimpless = products.find((product) => product.name === 'Dimpless 40mg')

    expect(dimpless).toMatchObject({
      description: '30 cápsulas',
      price: 125,
      image: '/remedios/novos/dimpless.webp',
      active: true,
    })
  })

  it('inclui o Hydralume com os dados comerciais aprovados', () => {
    const hydralume = products.find((product) => product.name === 'Hydralume')

    expect(hydralume).toMatchObject({
      id: 31,
      description: '30 g',
      price: 65,
      image: '/remedios/novos/hydralume.webp',
      category: 'Cuidados com a pele',
      active: true,
    })
  })

  it('usa as novas fotos em todos os produtos ativos que possuem substituição', () => {
    const activeProductsWithNewPhotos = products.filter((product) => product.active)

    expect(activeProductsWithNewPhotos).not.toHaveLength(0)
    expect(activeProductsWithNewPhotos).toSatisfy(
      (items) => items.every((product) => /^\/remedios\/novos\/[a-z0-9-]+\.webp$/.test(product.image)),
    )
  })

  it('possui um arquivo público válido para cada nova foto do catálogo', () => {
    const newImagePaths = products
      .filter((product) => product.image.startsWith('/remedios/novos/'))
      .map((product) => product.image)

    for (const imagePath of newImagePaths) {
      const publicFile = fileURLToPath(new URL(`../../public${imagePath}`, import.meta.url))

      expect(existsSync(publicFile), `${imagePath} deve existir em public`).toBe(true)
      expect(statSync(publicFile).size, `${imagePath} não pode estar vazio`).toBeGreaterThan(0)
    }
  })
})
