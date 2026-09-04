import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const headerCss = readFileSync(new URL('./Header.css', import.meta.url), 'utf8');
const heroCss = readFileSync(new URL('./Hero.css', import.meta.url), 'utf8');
const globalCss = readFileSync(new URL('../index.css', import.meta.url), 'utf8');

function stripCssComments(css) {
  return css.replace(/\/\*[\s\S]*?\*\//g, '');
}

describe('header and hero visuals', () => {
  it('does not use blending to hide the brand icon background', () => {
    const css = stripCssComments(headerCss);

    expect(css).not.toContain('mix-blend-mode');
  });

  it('does not render the hero content overlay', () => {
    const css = stripCssComments(heroCss);

    expect(css).not.toMatch(/(?:^|[{}])\s*\.hero__content::after\s*\{/);
  });

  it('does not render decorative lines before eyebrow labels', () => {
    const css = stripCssComments(globalCss);

    expect(css).not.toMatch(/(?:^|[{}])\s*\.eyebrow::before\s*\{/);
  });
});
