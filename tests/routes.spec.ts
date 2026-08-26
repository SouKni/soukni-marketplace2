import { test, expect } from '@playwright/test';

const ROUTES = [
  '/en', '/en/welcome', '/en/search', '/en/feed', '/en/map', '/en/ar-finder',
  '/en/help', '/en/safety', '/en/contact', '/en/terms', '/en/privacy', '/en/about',
  '/en/listing/1', '/en/listing/4', '/en/listing/iphone-15-pro-max',
  '/en/auction/1', '/en/seller/1',
  '/en/auth', '/en/login', '/en/setup',
  '/en/account', '/en/account/my-ads',
  '/en/favorites', '/en/saved-searches',
  '/en/post-ad', '/en/post-ad-voice', '/en/bulk-import',
  '/en/boost/1', '/en/orders', '/en/messages', '/en/notifications',
  '/en/diamond', '/en/buyer-agent', '/en/analytics',
  '/en/admin',
  '/en/motors', '/en/property', '/en/vault', '/en/fashion', '/en/jobs',
  '/en/electronics', '/en/home-garden', '/en/services',
  '/en/property/for-sale', '/en/property/for-rent', '/en/property/rooms',
  '/en/property/commercial', '/en/property/daily-rentals',
  '/en/property/new-projects', '/en/property/land-plots', '/en/property/business-investment',
];

for (const route of ROUTES) {
  test(`${route} loads without error`, async ({ page }) => {
    const response = await page.goto(route, { waitUntil: 'domcontentloaded' });
    expect(response?.status(), `HTTP status for ${route}`).toBeLessThan(400);

    const heading = page.locator('text=This page could not be found').or(
      page.locator('text=This listing could not be found')
    );
    await expect(heading, `404 text on ${route}`).toHaveCount(0);
  });
}
