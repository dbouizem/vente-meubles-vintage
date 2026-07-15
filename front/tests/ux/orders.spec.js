import { expect, test } from '@playwright/test';

const confirmationToken = '123e4567-e89b-12d3-a456-426614174000';

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    if (localStorage.getItem('panier') !== null) return;
    localStorage.setItem(
      'panier',
      JSON.stringify([{ id: 101, nom: 'Fauteuil test', prix: 100, stock: 3, quantity: 2 }]),
    );
  });
});

test('creates an order, clears the cart, and displays its confirmation', async ({ page }) => {
  let submittedOrder;
  await page.route('**/orders', async (route) => {
    submittedOrder = route.request().postDataJSON();
    await route.fulfill({
      status: 201,
      contentType: 'application/json',
      body: JSON.stringify({
        message: 'Commande créée avec succès',
        orderNumber: 'AH-20260715-ABC123',
        confirmationToken,
        total: 200,
      }),
    });
  });
  await page.route('**/orders/*', (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        orderNumber: 'AH-20260715-ABC123',
        customerName: 'Marie Test',
        customerEmail: 'marie@example.com',
        status: 'pending',
        subtotal: 200,
        discount: 0,
        total: 200,
        items: [
          {
            productId: 101,
            sku: 'VH-101',
            title: 'Fauteuil test',
            unitPrice: 100,
            quantity: 2,
            lineTotal: 200,
          },
        ],
      }),
    }),
  );

  await page.goto('/panier');
  await page.getByLabel('Nom complet').fill('Marie Test');
  await page.getByLabel('E-mail').fill('marie@example.com');
  await page.getByRole('button', { name: /Réserver/ }).click();

  await expect(page).toHaveURL(`/commande/${confirmationToken}`);
  await expect(page.getByRole('heading', { name: 'Merci Marie Test' })).toBeVisible();
  await expect(page.getByText('AH-20260715-ABC123')).toBeVisible();
  expect(submittedOrder).toEqual({
    customerName: 'Marie Test',
    customerEmail: 'marie@example.com',
    promoCode: '',
    items: [{ productId: 101, quantity: 2 }],
  });
  await expect.poll(() => page.evaluate(() => localStorage.getItem('panier'))).toBe('[]');
});
