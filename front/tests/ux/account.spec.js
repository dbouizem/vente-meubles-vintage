import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('authToken', 'customer-token'));
  await page.route('**/account/profile', async (route) => {
    if (route.request().method() === 'PUT') {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Profil mis à jour' }),
      });
    } else {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          id: 7,
          name: 'Martin',
          firstname: 'Marie',
          email: 'marie@example.com',
          phone: '',
        }),
      });
    }
  });
  await page.route('**/account/orders', (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        {
          orderNumber: 'AH-TEST',
          confirmationToken: '123e4567-e89b-12d3-a456-426614174000',
          status: 'pending',
          total: 120,
          createdAt: '2026-07-15T10:00:00Z',
        },
      ]),
    }),
  );
  await page.route('**/account/favorites', (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([{ id: 4, titre: 'Fauteuil favori', prix: 120, photo: 'fauteuil.jpg' }]),
    }),
  );
  await page.route('**/account/favorites/4', (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ message: 'Favori supprimé' }),
    }),
  );
});

test('displays and updates the customer account', async ({ page }) => {
  await page.goto('/compte');
  await expect(page.getByRole('heading', { name: 'Mon compte' })).toBeVisible();
  await expect(page.getByText('AH-TEST')).toBeVisible();
  await expect(page.getByText('Fauteuil favori')).toBeVisible();
  await page.getByLabel('Téléphone').fill('0600000000');
  await page.getByRole('button', { name: 'Enregistrer le profil' }).click();
  await expect(page.getByText('Profil mis à jour')).toBeVisible();
  const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();
  expect(
    results.violations.filter((violation) => ['critical', 'serious'].includes(violation.impact)),
  ).toEqual([]);
});
