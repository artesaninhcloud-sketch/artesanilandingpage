import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const globalCss = readFileSync(new URL('../index.css', import.meta.url), 'utf8');
const headerCss = readFileSync(new URL('./Header.css', import.meta.url), 'utf8');
const componentCss = readdirSync(resolve(process.cwd(), 'src/components'))
  .filter((file) => file.endsWith('.css'))
  .map((file) => readFileSync(resolve(process.cwd(), 'src/components', file), 'utf8'))
  .join('\n');

describe('brand palette and quote action', () => {
  it('usa o verde-bandeira e o verde oficial do WhatsApp', () => {
    expect(globalCss).toContain('--color-primary: #009c3b;');
    expect(globalCss).toContain('--color-primary-dark: #006b2a;');
    expect(globalCss).toContain('--color-lime: #009c3b;');
    expect(globalCss).toContain('--color-whatsapp: #25d366;');
  });

  it('mostra o rótulo curto no celular e o completo no desktop', () => {
    expect(headerCss).toMatch(/\.header__quote-label--mobile\s*\{[^}]*display:\s*inline/s);
    expect(headerCss).toMatch(
      /@media\s*\(min-width:\s*760px\)[\s\S]*?\.header__quote-label--mobile\s*\{[^}]*display:\s*none/s,
    );
    expect(headerCss).toMatch(
      /@media\s*\(min-width:\s*760px\)[\s\S]*?\.header__quote-label--desktop\s*\{[^}]*display:\s*inline/s,
    );
  });

  it('não força largura mínima que cause overflow em 320px', () => {
    expect(globalCss).not.toContain('min-width: 320px;');
  });

  it('não mantém sombras e superfícies com a antiga paleta oliva', () => {
    expect(componentCss).not.toMatch(/rgba\((?:74, 103, 9|45, 66, 6),/);
  });
});
