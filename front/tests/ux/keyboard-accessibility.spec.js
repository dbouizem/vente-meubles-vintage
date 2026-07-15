import { expect, test } from '@playwright/test';

test('skip link is visible with keyboard and moves focus to main content', async ({ page }) => {
  await page.goto('/accueil');
  await page.keyboard.press('Tab');
  const skipLink = page.getByRole('link', { name: 'Aller au contenu principal' });
  await expect(skipLink).toBeFocused();
  await expect(skipLink).toBeVisible();
  await page.keyboard.press('Enter');
  await expect(page.locator('#main-content')).toBeFocused();
});

test('cart quantity controls are keyboard operable and announce their value', async ({ page }) => {
  await page.addInitScript(() =>
    localStorage.setItem(
      'panier',
      JSON.stringify([{ id: 10, nom: 'Chaise clavier', prix: 80, stock: 2, quantity: 1 }]),
    ),
  );
  await page.goto('/panier');
  const increase = page.getByRole('button', { name: 'Augmenter la quantité de Chaise clavier' });
  await increase.focus();
  await page.keyboard.press('Enter');
  await expect(increase).toBeDisabled();
  await expect(page.getByText('2 articles sélectionnés')).toBeVisible();
});

test('reduced motion preference disables smooth scrolling and long transitions', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/accueil');
  const styles = await page.evaluate(() => ({
    scrollBehavior: getComputedStyle(document.documentElement).scrollBehavior,
    transitionDuration: getComputedStyle(document.querySelector('a')).transitionDuration,
  }));
  expect(styles.scrollBehavior).toBe('auto');
  expect(Number.parseFloat(styles.transitionDuration)).toBeLessThan(0.001);
});
