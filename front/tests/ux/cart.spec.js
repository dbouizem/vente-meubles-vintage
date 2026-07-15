import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    if (localStorage.getItem('panier')) return;
    localStorage.setItem(
      'panier',
      JSON.stringify([
        { id: 101, nom: 'Fauteuil test', prix: 100, stock: 3, quantity: 1 },
        { id: 202, nom: 'Table test', prix: 50, stock: 1, quantity: 1 },
      ]),
    );
  });
  await page.goto('/panier');
});

test('updates quantities within stock and recalculates totals', async ({ page }) => {
  await page.getByRole('button', { name: 'Augmenter la quantité de Fauteuil test' }).click();

  await expect(page.getByText('3 articles sélectionnés')).toBeVisible();
  await expect(page.getByText(/250,00\s*€/).first()).toBeVisible();

  await page.getByRole('button', { name: 'Augmenter la quantité de Fauteuil test' }).click();
  await expect(
    page.getByRole('button', { name: 'Augmenter la quantité de Fauteuil test' }),
  ).toBeDisabled();
});

test('removes an item by product id and persists the cart', async ({ page }) => {
  await page.getByRole('button', { name: 'Supprimer Fauteuil test du panier' }).click();

  await expect(page.getByText('Fauteuil test')).toHaveCount(0);
  await expect(page.getByText('Table test').first()).toBeVisible();
  await expect
    .poll(() =>
      page.evaluate(() =>
        JSON.parse(localStorage.getItem('panier') || '[]').map((item) => item.id),
      ),
    )
    .toEqual([202]);
  await page.reload();
  await expect(page.getByText('Fauteuil test')).toHaveCount(0);
  await expect(page.getByText('Table test').first()).toBeVisible();
});
