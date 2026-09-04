// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { store } from '../data/store'
import { Location } from './Location'

vi.mock('./StoreMap', () => ({
  StoreMap: (props) => (
    <div data-testid="store-map" data-props={JSON.stringify(props)} />
  ),
}))

afterEach(cleanup)

describe('Location', () => {
  it('envia os dados reais da loja ao mapa e preserva o Google Maps', async () => {
    render(<Location />)

    const mapProps = JSON.parse((await screen.findByTestId('store-map')).dataset.props)
    expect(mapProps).toEqual({
      name: store.name,
      address: store.address,
      coordinates: store.coordinates,
    })
    expect(
      screen.getByRole('link', { name: 'Abrir no Google Maps' }),
    ).toHaveAttribute('href', expect.stringContaining('google.com/maps/search'))
  })
})
