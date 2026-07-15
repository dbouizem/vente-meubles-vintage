import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const confirmationToken = '123e4567-e89b-12d3-a456-426614174000';
const expectNoSeriousAccessibilityIssue = async (page) => {
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();
  expect(
    results.violations.filter((violation) => ['critical', 'serious'].includes(violation.impact)),
  ).toEqual([]);
};

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
        addressLine1: '10 rue Vintage',
        addressLine2: '',
        postalCode: '75001',
        city: 'Paris',
        country: 'France',
        deliveryMethod: 'home_delivery',
        paymentMethod: 'pay_on_delivery',
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
  await page.getByRole('link', { name: /Continuer vers la livraison/ }).click();
  await expect(page).toHaveURL('/commande/livraison');
  await expectNoSeriousAccessibilityIssue(page);
  await page.getByLabel('Nom complet').fill('Marie Test');
  await page.getByLabel('E-mail').fill('marie@example.com');
  await page.getByLabel('Adresse', { exact: true }).fill('10 rue Vintage');
  await page.getByLabel('Code postal').fill('75001');
  await page.getByLabel('Ville').fill('Paris');
  await page.getByRole('button', { name: 'Continuer vers le paiement' }).click();
  await expect(page).toHaveURL('/commande/paiement');
  await expectNoSeriousAccessibilityIssue(page);
  await page.getByRole('button', { name: 'Confirmer la réservation' }).click();

  await expect(page).toHaveURL(`/commande/${confirmationToken}`);
  await expectNoSeriousAccessibilityIssue(page);
  await expect(page.getByRole('heading', { name: 'Merci Marie Test' })).toBeVisible();
  await expect(page.getByText('AH-20260715-ABC123')).toBeVisible();
  expect(submittedOrder).toEqual({
    customerName: 'Marie Test',
    customerEmail: 'marie@example.com',
    address: {
      line1: '10 rue Vintage',
      line2: '',
      postalCode: '75001',
      city: 'Paris',
      country: 'France',
    },
    deliveryMethod: 'home_delivery',
    paymentMethod: 'pay_on_delivery',
    promoCode: '',
    items: [{ productId: 101, quantity: 2 }],
  });
  await expect.poll(() => page.evaluate(() => localStorage.getItem('panier'))).toBe('[]');
});
