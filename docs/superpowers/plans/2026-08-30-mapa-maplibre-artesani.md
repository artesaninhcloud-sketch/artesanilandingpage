# Mapa MapLibre da Artesani Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Substituir o iframe da seção de localização por um mapa MapLibre com um marcador da Artesani, mantendo o link externo do Google Maps e o comportamento responsivo atual.

**Architecture:** Um componente `StoreMap` encapsulará o ciclo de vida do MapLibre, o marcador, o popup e os estados de carregamento/erro. `Location` continuará responsável pelo conteúdo da seção e passará os dados reais de `store` ao mapa. A implementação permanecerá em React com JavaScript e CSS próprio.

**Tech Stack:** React 19, Vite 8, MapLibre GL JS, CSS, Vitest e Testing Library.

---

## Estrutura de arquivos

- Criar `src/components/StoreMap.jsx`: inicialização, marcador, popup, carregamento, falha e limpeza do MapLibre.
- Criar `src/components/StoreMap.css`: canvas, estados, marcador, popup e ajustes do MapLibre.
- Criar `src/components/StoreMap.test.jsx`: contrato do mapa, coordenadas, acessibilidade e limpeza.
- Criar `src/components/Location.test.jsx`: integração da seção com os dados reais e link externo.
- Modificar `src/components/Location.jsx`: trocar o iframe pelo `StoreMap`.
- Modificar `src/components/Location.css`: remover regras do iframe e dimensionar o novo mapa.
- Modificar `package.json` e `package-lock.json`: adicionar `maplibre-gl`.

### Task 1: Instalar a dependência do mapa

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`

- [ ] **Step 1: Instalar MapLibre GL JS**

Run: `npm install maplibre-gl`

Expected: instalação concluída e `maplibre-gl` listado em `dependencies`.

- [ ] **Step 2: Confirmar a instalação**

Run: `npm ls maplibre-gl --depth=0`

Expected: `maplibre-gl` resolvido sem erros.

### Task 2: Definir o contrato do componente com TDD

**Files:**
- Create: `src/components/StoreMap.test.jsx`

- [ ] **Step 1: Criar o teste com mock do MapLibre**

```jsx
// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
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
    Map: vi.fn(() => map),
    Marker: vi.fn(() => marker),
    Popup: vi.fn(() => popup),
    map,
    marker,
    popup,
  }
})

vi.mock('maplibre-gl', () => ({
  default: {
    Map: mapLibreMocks.Map,
    Marker: mapLibreMocks.Marker,
    Popup: mapLibreMocks.Popup,
  },
}))

afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})

describe('StoreMap', () => {
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
    expect(screen.getByRole('button', { name: 'Ver localização da Artesani' })).toBeInTheDocument()

    unmount()
    expect(mapLibreMocks.marker.remove).toHaveBeenCalled()
    expect(mapLibreMocks.map.remove).toHaveBeenCalled()
  })
})
```

- [ ] **Step 2: Executar o teste para confirmar a falha inicial**

Run: `npm test -- src/components/StoreMap.test.jsx`

Expected: FAIL porque `./StoreMap` ainda não existe.

### Task 3: Implementar o componente MapLibre

**Files:**
- Create: `src/components/StoreMap.jsx`
- Create: `src/components/StoreMap.css`

- [ ] **Step 1: Criar `StoreMap.jsx`**

```jsx
import { useEffect, useRef, useState } from 'react'
import MapLibreGL from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import './StoreMap.css'

const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json'

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

    map.on('load', handleLoad)
    map.on('error', handleError)

    return () => {
      map.off('load', handleLoad)
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
        <div className="store-map__state" role="status">Carregando mapa</div>
      )}
      {status === 'error' && (
        <div className="store-map__state store-map__state--error" role="status">
          Não foi possível carregar o mapa. Use o botão “Abrir no Google Maps”.
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Criar `StoreMap.css`**

```css
.store-map {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 420px;
  overflow: hidden;
  background: var(--color-bg);
}

.store-map__canvas { position: absolute; inset: 0; }

.store-map__state {
  position: absolute;
  inset: 0;
  z-index: 2;
  display: grid;
  place-items: center;
  padding: 24px;
  background: rgba(246, 247, 241, 0.86);
  color: var(--color-ink-soft);
  font-size: 13px;
  font-weight: 700;
  text-align: center;
}

.store-map__marker {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  border: 0;
  padding: 0;
  background: transparent;
  cursor: pointer;
}

.store-map__marker-label {
  padding: 5px 9px;
  border: 1px solid rgba(45, 66, 6, 0.18);
  border-radius: 999px;
  background: rgba(255, 254, 249, 0.96);
  box-shadow: 0 7px 20px rgba(45, 66, 6, 0.14);
  color: var(--color-primary-dark);
  font: 800 11px/1 var(--font-body);
  white-space: nowrap;
}

.store-map__pin {
  display: grid;
  width: 38px;
  height: 38px;
  place-items: center;
  border: 3px solid #fff;
  border-radius: 50% 50% 50% 0;
  background: var(--color-primary-dark);
  box-shadow: 0 10px 24px rgba(45, 66, 6, 0.3);
  transform: rotate(-45deg);
  transition: transform var(--transition-fast);
}

.store-map__pin-core {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--color-lime);
}

.store-map__marker:hover .store-map__pin,
.store-map__marker:focus-visible .store-map__pin {
  transform: rotate(-45deg) scale(1.08);
}

.store-map__marker:focus-visible { outline: 3px solid var(--color-lime); outline-offset: 5px; }
.store-map__popup { display: grid; gap: 5px; padding: 4px 2px; color: var(--color-ink); }
.store-map__popup strong { color: var(--color-primary-dark); font-size: 13px; }
.store-map__popup span { max-width: 32ch; color: var(--color-ink-soft); font-size: 11px; line-height: 1.45; }
.store-map .maplibregl-popup-content { border-radius: 12px; box-shadow: var(--shadow-md); }
.store-map .maplibregl-ctrl-attrib { font-size: 9px; }

@media (max-width: 620px) {
  .store-map { min-height: 330px; }
}
```

- [ ] **Step 3: Rodar o teste do componente**

Run: `npm test -- src/components/StoreMap.test.jsx`

Expected: PASS.

### Task 4: Integrar o mapa na seção de localização

**Files:**
- Create: `src/components/Location.test.jsx`
- Modify: `src/components/Location.jsx`
- Modify: `src/components/Location.css`

- [ ] **Step 1: Criar o teste de integração antes da alteração**

```jsx
// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { store } from '../data/store'
import { Location } from './Location'

vi.mock('./StoreMap', () => ({
  StoreMap: (props) => <div data-testid="store-map" data-props={JSON.stringify(props)} />,
}))

afterEach(cleanup)

describe('Location', () => {
  it('envia os dados reais da loja ao mapa e preserva o Google Maps', () => {
    render(<Location />)

    const mapProps = JSON.parse(screen.getByTestId('store-map').dataset.props)
    expect(mapProps).toEqual({
      name: store.name,
      address: store.address,
      coordinates: store.coordinates,
    })
    expect(screen.getByRole('link', { name: 'Abrir no Google Maps' })).toHaveAttribute(
      'href',
      expect.stringContaining('google.com/maps/search'),
    )
  })
})
```

- [ ] **Step 2: Executar o teste para confirmar a falha inicial**

Run: `npm test -- src/components/Location.test.jsx`

Expected: FAIL porque `Location` ainda renderiza o iframe e não o `StoreMap`.

- [ ] **Step 3: Substituir o iframe em `Location.jsx`**

Adicionar o import:

```jsx
import { StoreMap } from './StoreMap'
```

Substituir o iframe por:

```jsx
<StoreMap
  name={store.name}
  address={store.address}
  coordinates={store.coordinates}
/>
```

- [ ] **Step 4: Atualizar o dimensionamento em `Location.css`**

Remover a regra `.location__map iframe` e manter:

```css
.location__map {
  width: 100%;
  min-height: 420px;
  border: 10px solid var(--color-bg);
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-md);
}

@media (max-width: 620px) {
  .location { padding: 84px 0 92px; }
  .location__map { min-height: 330px; }
}
```

- [ ] **Step 5: Rodar os testes da integração**

Run: `npm test -- src/components/Location.test.jsx src/components/StoreMap.test.jsx`

Expected: 2 arquivos e 2 testes aprovados.

### Task 5: Verificação completa e teste visual local

**Files:**
- Verify: `src/components/StoreMap.jsx`
- Verify: `src/components/StoreMap.css`
- Verify: `src/components/Location.jsx`
- Verify: `src/components/Location.css`

- [ ] **Step 1: Rodar toda a suíte**

Run: `npm test`

Expected: todos os testes aprovados.

- [ ] **Step 2: Rodar análise estática e build**

Run: `npm run lint; npm run build`

Expected: lint sem erros e build concluído.

- [ ] **Step 3: Iniciar o ambiente local**

Run: `npm run dev -- --host 127.0.0.1`

Expected: Vite disponível em `http://127.0.0.1:5173`.

- [ ] **Step 4: Validar desktop e celular**

Conferir em 1000 × 700 e 390 × 844:

- mapa visível e centralizado na Artesani;
- marcador verde e rótulo legíveis;
- popup abre pelo marcador;
- rolagem da página não vira zoom do mapa;
- botão do Google Maps continua funcionando;
- nenhum overflow horizontal ou erro no console.

- [ ] **Step 5: Parar o servidor e entregar o resultado local**

Não publicar no Cloudflare nesta etapa. Entregar o teste local para aprovação visual do usuário.

## Observação sobre versionamento

Esta pasta não é um repositório Git. Por isso, os checkpoints serão registrados por testes e arquivos gerados, sem etapas de `git commit`.
