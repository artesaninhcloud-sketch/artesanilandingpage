import { describe, expect, it } from 'vitest'
import config from './vite.config'

describe('Vite config', () => {
  it('não pré-otimiza o worker interno do MapLibre', () => {
    expect(config.optimizeDeps?.exclude).toContain('maplibre-gl')
  })
})
