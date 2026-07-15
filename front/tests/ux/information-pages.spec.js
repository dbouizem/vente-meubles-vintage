import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const pages = [
  ['/livraison-retours', 'Livraison & retours'],
  ['/paiement', 'Paiement'],
  ['/faq', 'Questions fréquentes'],
  ['/contact', 'Nous contacter'],
  ['/notre-histoire', 'Notre histoire'],
  ['/engagements', 'Nos engagements'],
  ['/mentions-legales', 'Mentions légales'],
  ['/cgv', 'Conditions générales de vente'],
  ['/confidentialite', 'Politique de confidentialité'],
];

test('all trust and legal pages are reachable and responsive', async ({ page }) => {
  for (const [route, heading] of pages) {
    await page.goto(route);
    await expect(page.getByRole('heading', { level: 1, name: heading })).toBeVisible();
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    expect(overflow, `horizontal overflow on ${route}`).toBe(false);
  }
});

test('legal content and footer links have no serious accessibility issue', async ({ page }) => {
  await page.goto('/mentions-legales');
  await expect(page.getByRole('note')).toContainText('avant une mise en production');
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();
  expect(
    results.violations.filter((violation) => ['critical', 'serious'].includes(violation.impact)),
  ).toEqual([]);
  await page.getByRole('link', { name: 'Confidentialité' }).last().click();
  await expect(page).toHaveURL('/confidentialite');
});
