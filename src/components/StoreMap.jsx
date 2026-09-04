import { useEffect, useRef, useState } from 'react'
import * as MapLibreGL from 'maplibre-gl'
import mapLibreWorkerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url'
import 'maplibre-gl/dist/maplibre-gl.css'
import './StoreMap.css'

const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json'

MapLibreGL.setWorkerUrl(mapLibreWorkerUrl)

export function StoreMap({ name, address, coordinates }) {
  const containerRef = useRef(null)
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    if (!containerRef.current) return undefined

    let loaded = false
    const map = new MapLibreGL.Map({
      container: containerRef.current,
      style: MAP_STYLE,
      center: [coordinates.lng, coordinates.lat],
      zoom: 15.6,
      scrollZoom: false,
      renderWorldCopies: false,
      attributionControl: { compact: true },
    })

    const markerButton = document.createElement('button')
    markerButton.type = 'button'
    markerButton.className = 'store-map__marker'
    markerButton.setAttribute('aria-label', `Ver localização da ${name}`)

    const pin = document.createElement('span')
    pin.className = 'store-map__pin'
    pin.setAttribute('aria-hidden', 'true')

    const pinCore = document.createElement('span')
    pinCore.className = 'store-map__pin-core'
    pin.append(pinCore)

    const label = document.createElement('span')
    label.className = 'store-map__marker-label'
    label.textContent = name
    markerButton.append(label, pin)

    const popupContent = document.createElement('div')
    popupContent.className = 'store-map__popup'

    const popupName = document.createElement('strong')
    popupName.textContent = name

    const popupAddress = document.createElement('span')
    popupAddress.textContent = address
    popupContent.append(popupName, popupAddress)

    const popup = new MapLibreGL.Popup({
      offset: 28,
      closeButton: false,
      maxWidth: '260px',
    }).setDOMContent(popupContent)

    const marker = new MapLibreGL.Marker({ element: markerButton, anchor: 'bottom' })
      .setLngLat([coordinates.lng, coordinates.lat])
      .setPopup(popup)
      .addTo(map)

    const handleLoad = () => {
      loaded = true
      setStatus('ready')
    }

    const handleError = () => {
      if (!loaded) setStatus('error')
    }

    map.on('style.load', handleLoad)
    map.on('error', handleError)

    return () => {
      map.off('style.load', handleLoad)
      map.off('error', handleError)
      popup.remove()
      marker.remove()
      map.remove()
    }
  }, [address, coordinates.lat, coordinates.lng, name])

  return (
    <div className="store-map" aria-label={`Mapa da ${name}`}>
      <div ref={containerRef} className="store-map__canvas" />

      {status === 'loading' && (
        <div className="store-map__state" role="status">
          Carregando mapa
        </div>
      )}

      {status === 'error' && (
        <div className="store-map__state store-map__state--error" role="status">
          Não foi possível carregar o mapa. Use o botão “Abrir no Google Maps”.
        </div>
      )}
    </div>
  )
}
