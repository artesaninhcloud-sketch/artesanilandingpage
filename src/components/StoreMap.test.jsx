// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { act, cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { StoreMap } from './StoreMap'

const mapLibreMocks = vi.hoisted(() => {
  const map = {
    on: vi.fn(),
    off: vi.fn(),
    remove: vi.fn(),
  }
  const marker = {
    setLngLat: vi.fn().mockReturnThis(),
    setPopup: vi.fn().mockReturnThis(),
    addTo: vi.fn().mockReturnThis(),
    remove: vi.fn(),
  }
  const popup = {
    setDOMContent: vi.fn().mockReturnThis(),
    remove: vi.fn(),
  }

  return {
    Map: vi.fn(function Map() { return map }),
    Marker: vi.fn(function Marker() { return marker }),
    Popup: vi.fn(function Popup() { return popup }),
    setWorkerUrl: vi.fn(),
    map,
    marker,
    popup,
  }
})

vi.mock('maplibre-gl', () => ({
  Map: mapLibreMocks.Map,
  Marker: mapLibreMocks.Marker,
  Popup: mapLibreMocks.Popup,
  setWorkerUrl: mapLibreMocks.setWorkerUrl,
}))

vi.mock('maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url', () => ({
  default: '/assets/maplibre-worker.js',
}))

afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})

describe('StoreMap', () => {
  it('configura o worker empacotado pelo Vite antes de criar o mapa', () => {
    expect(mapLibreMocks.setWorkerUrl).toHaveBeenCalledWith(
      '/assets/maplibre-worker.js',
    )
  })

  it('inicializa o mapa nas coordenadas da loja sem zoom pela rolagem', () => {
    const { unmount } = render(
      <StoreMap
        name="Artesani"
        address="Av. Pedro Adams Filho, 5641"
        coordinates={{ lng: -51.1301426, lat: -29.682726 }}
      />,
    )

    expect(mapLibreMocks.Map).toHaveBeenCalledWith(
      expect.objectContaining({
        center: [-51.1301426, -29.682726],
        zoom: 15.6,
        scrollZoom: false,
      }),
    )
    expect(mapLibreMocks.marker.setLngLat).toHaveBeenCalledWith([
      -51.1301426,
      -29.682726,
    ])
    const markerOptions = mapLibreMocks.Marker.mock.calls[0][0]
    expect(markerOptions.anchor).toBe('bottom')
    expect(markerOptions.element).toHaveAccessibleName('Ver localização da Artesani')

    unmount()
    expect(mapLibreMocks.marker.remove).toHaveBeenCalled()
    expect(mapLibreMocks.map.remove).toHaveBeenCalled()
  })

  it('remove o estado de carregamento quando o estilo do mapa está pronto', () => {
    render(
      <StoreMap
        name="Artesani"
        address="Av. Pedro Adams Filho, 5641"
        coordinates={{ lng: -51.1301426, lat: -29.682726 }}
      />,
    )

    expect(screen.getByText('Carregando mapa')).toBeInTheDocument()

    const styleLoadCall = mapLibreMocks.map.on.mock.calls.find(
      ([eventName]) => eventName === 'style.load',
    )

    expect(styleLoadCall).toBeDefined()
    act(() => styleLoadCall[1]())

    expect(screen.queryByText('Carregando mapa')).not.toBeInTheDocument()
  })
})
