import { test, expect } from '@playwright/test';
import * as fs from 'fs';

test.setTimeout(300000);

test('Crawl and check all pages for errors', async ({ page }) => {
  const baseURL = 'http://localhost:3000';
  const visited = new Set<string>();
  const toVisit = ['/en', '/fr']; 
  const brokenPages: { url: string; status: number }[] = [];

  while (toVisit.length > 0) {
    const path = toVisit.pop()!;
    if (visited.has(path)) continue;

    visited.add(path);
    const fullURL = `${baseURL}${path}`;

    try {
      const response = await page.goto(fullURL, { waitUntil: 'domcontentloaded', timeout: 10000 });
      const status = response?.status() || 0;

      if (status >= 400) {
        brokenPages.push({ url: fullURL, status });
      }

      const links = await page.locator('a[href^="/"]').evaluateAll(
        (elements) => elements.map((el) => el.getAttribute('href'))
      );

      for (const link of links) {
        if (link && !visited.has(link) && !toVisit.includes(link)) {
          if (!link.startsWith('/_next') && !link.startsWith('/api') && !link.includes('#')) {
            toVisit.push(link);
          }
        }
      }
    } catch (err) {
      brokenPages.push({ url: fullURL, status: 500 });
    }
  }

  // Save broken links to a file for Claude Code
  fs.writeFileSync('broken-links.txt', JSON.stringify(brokenPages, null, 2));

  expect(brokenPages.length, `Found ${brokenPages.length} broken page(s)`).toBe(0);
});
