import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const routes = [
  '/',
  '/accueil',
  '/produit/1',
  '/panier',
  '/signup',
  '/forgot-password',
  '/reset-password?token=test-token',
];

test('document declares its language and an explicit product title', async ({ page }) => {
  await page.goto('/accueil');
  await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
  await expect(page).toHaveTitle('Atelier Héritage — Mobilier vintage');
});

for (const route of routes) {
  test('route ' + route + ' has no critical accessibility issues', async ({ page }) => {
    await page.goto(route);
    await expect(page.locator('body')).toBeVisible();

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    const serious = results.violations.filter((violation) =>
      ['critical', 'serious'].includes(violation.impact ?? ''),
    );
    expect(serious).toEqual([]);
  });
}
