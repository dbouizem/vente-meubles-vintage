import { expect, test } from '@playwright/test';

for (const viewport of [
  { width: 390, height: 844, name: 'mobile' },
  { width: 768, height: 1024, name: 'tablet' },
  { width: 1440, height: 1000, name: 'desktop' },
]) {
  test('home renders without horizontal overflow on ' + viewport.name, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto('/accueil');
    await expect(page.locator('body')).toBeVisible();

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(2);
  });
}
