// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { cleanup, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { CartProvider } from '../context/CartContext';
import { Header } from './Header';

const headerCss = readFileSync(resolve(process.cwd(), 'src/components/Header.css'), 'utf8');

afterEach(cleanup);

describe('Header', () => {
  it('expõe rótulos claros para orçar receita no celular e no desktop', () => {
    render(
      <CartProvider>
        <Header />
      </CartProvider>,
    );

    const quoteLink = screen.getByRole('link', { name: 'Orçar receita' });

    expect(within(quoteLink).getByText('Orçar receita')).toHaveClass(
      'header__quote-label--mobile',
    );
    expect(within(quoteLink).getByText('Orçar minha receita')).toHaveClass(
      'header__quote-label--desktop',
    );
  });

  it('usa o símbolo da marca com fundo realmente transparente', () => {
    render(
      <CartProvider>
        <Header />
      </CartProvider>,
    );

    expect(screen.getByTestId('header-brand-icon')).toHaveAttribute(
      'src',
      '/logo-icon-transparent.png',
    );
  });

  it('não depende de mistura de cor para esconder o fundo da logo', () => {
    expect(headerCss).not.toContain('mix-blend-mode');
  });
});
