import { chromium } from 'playwright';
import fs from 'fs';

const BASE = 'http://localhost:3000';

const ROUTES = [
  '/en', '/en/welcome', '/en/search', '/en/search?q=iphone', '/en/feed', '/en/map',
  '/en/ar-finder', '/en/help', '/en/safety', '/en/contact', '/en/terms', '/en/privacy', '/en/about',
  '/en/listing/1', '/en/listing/4', '/en/listing/iphone-15-pro-max',
  '/en/auction/1', '/en/auction/10', '/en/seller/1', '/en/seller/youssef-alami',
  '/en/auth', '/en/login', '/en/setup',
  '/en/account', '/en/account/my-ads', '/en/account/edit-ad/1', '/en/account/edit-ad/2', '/en/account/edit-ad/3',
  '/en/favorites', '/en/saved-searches',
  '/en/post-ad', '/en/post-ad-voice', '/en/bulk-import',
  '/en/boost/1', '/en/boost/2', '/en/boost/3',
  '/en/orders', '/en/messages', '/en/notifications',
  '/en/escrow/TXN-2026-0029', '/en/review/TXN-2026-0029', '/en/review/TXN-2026-0041',
  '/en/report/1', '/en/report/2', '/en/report/8',
  '/en/diamond', '/en/buyer-agent', '/en/analytics',
  '/en/qr/1', '/en/translate/1',
  '/en/admin',
  '/en/motors', '/en/property', '/en/vault', '/en/fashion', '/en/jobs', '/en/electronics', '/en/home-garden', '/en/services',
  '/en/property/for-sale', '/en/property/for-rent', '/en/property/rooms', '/en/property/commercial',
  '/en/property/daily-rentals', '/en/property/new-projects', '/en/property/land-plots', '/en/property/business-investment',
];

// Only flag pages that show these EXACT Next.js / app error phrases,
// not pages that merely contain the digits "404" or "500" somewhere in content.
const HARD_ERROR_PHRASES = [
  'This page could not be found',
  'This listing could not be found',
  'could not be found.',
  'Application error: a client-side exception has occurred',
  'Internal Server Error',
  '500: Internal Server Error',
  'Unhandled Runtime Error',
];

async function auditRoutes() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const results = [];

  page.on('console', msg => {
    if (msg.type() === 'error') {
      page._lastConsoleErrors = page._lastConsoleErrors || [];
      page._lastConsoleErrors.push(msg.text());
    }
  });

  for (const route of ROUTES) {
    page._lastConsoleErrors = [];
    const url = BASE + route;
    let status = null, error = null, pageError = null;

    try {
      const response = await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });
      status = response ? response.status() : null;

      const bodyText = await page.textContent('body').catch(() => '') || '';

      // Real HTTP-level failure
      if (status && status >= 400) {
        pageError = `HTTP ${status}`;
      }

      // Only match exact known error phrases — no more loose "404" string match
      for (const phrase of HARD_ERROR_PHRASES) {
        if (bodyText.includes(phrase)) {
          pageError = phrase;
          break;
        }
      }
    } catch (e) {
      error = e.message;
    }

    results.push({
      route,
      status,
      pageError,
      error,
      consoleErrors: page._lastConsoleErrors?.slice(0, 3) || [],
    });

    const isFail = pageError || error || (status && status >= 400);
    const flag = isFail ? '❌' : '✅';
    console.log(`${flag} ${status || 'ERR'}  ${route}${pageError ? '  → ' + pageError : ''}${error ? '  → ' + error : ''}`);
  }

  await browser.close();

  const failures = results.filter(r => r.pageError || r.error || (r.status && r.status >= 400));
  console.log(`\n${'='.repeat(60)}`);
  console.log(`SUMMARY: ${results.length - failures.length}/${results.length} passed`);
  console.log(`${'='.repeat(60)}`);

  if (failures.length > 0) {
    console.log('\n🔴 REAL FAILURES:\n');
    failures.forEach(f => {
      console.log(`  ${f.route}`);
      if (f.status) console.log(`    Status: ${f.status}`);
      if (f.pageError) console.log(`    Page Error: ${f.pageError}`);
      if (f.error) console.log(`    Error: ${f.error}`);
      if (f.consoleErrors?.length) console.log(`    Console: ${f.consoleErrors.join(' | ')}`);
    });
  } else {
    console.log('\n🎉 No real failures found!');
  }

  fs.writeFileSync('audit-results.json', JSON.stringify(results, null, 2));
  console.log('\n📄 Full results saved to audit-results.json');
}

auditRoutes();
