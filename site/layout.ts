// Copyright (c) 2026 Enactus McMaster. All rights reserved. Source available for viewing only. See LICENSE.

import { escapeHtml, links, navigation, siteName } from './config.ts';
import type { Page, PageContext } from './config.ts';

const notice = '<!-- Copyright (c) 2026 Enactus McMaster. All rights reserved. Source available for viewing only. See LICENSE. -->';
const publicCard = 'https://raw.githubusercontent.com/2q9e/website-uwu/main/site/assets/card.jpg';

export function pageContext(path: string): PageContext {
  const up = '../'.repeat(path ? path.split('/').length : 0) || './';
  return {
    page: (target = '') => target ? `${up}${target}/` : up,
    asset: name => `${up}assets/${name}`,
  };
}

export function renderPage(page: Page, origin?: URL): string {
  const context = pageContext(page.path);
  const home = page.path === '';
  const title = home ? page.title : `${page.title} | ${siteName}`;
  const canonical = origin && new URL(page.path ? `${page.path}/` : './', origin).href;
  const card = origin ? new URL('assets/card.jpg', origin).href : publicCard;
  const policyLinks = `<a href="${context.page('privacy')}">Privacy Policy</a>
          <a href="${context.page('terms')}">Terms of Use</a>`;
  const wordmark = `<a class="wordmark" href="${context.page()}" aria-label="Enactus McMaster home">
          <span>enactus.</span><small>McMaster University</small>
        </a>`;

  return `<!doctype html>
${notice}
<html lang="en-CA">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#7A003C">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(page.description)}">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="en_CA">
  <meta property="og:site_name" content="${siteName}">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(page.description)}">
  <meta property="og:image" content="${escapeHtml(card)}">
  <meta property="og:image:type" content="image/jpeg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="Enactus McMaster’s student team at the 2025 Central Canada regional competition.">
  <meta name="twitter:card" content="summary_large_image">
  ${canonical ? `<link rel="canonical" href="${escapeHtml(canonical)}"><meta property="og:url" content="${escapeHtml(canonical)}">` : ''}
  <link rel="icon" href="${context.asset('favicon.png')}" type="image/png">
  <link rel="apple-touch-icon" href="${context.asset('favicon.png')}">
  <link rel="stylesheet" href="${context.asset('base.css')}">
  <link rel="stylesheet" href="${context.asset(home ? 'home.css' : 'pages.css')}">
  <script type="module" src="${context.asset('main.js')}"></script>
</head>
<body class="${home ? 'home-page' : 'inner-page'}">
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header">
    <div class="header-inner container">
      ${wordmark}
      <button class="menu-button" type="button" aria-expanded="false" aria-controls="main-nav" hidden>Menu <span class="menu-symbol" aria-hidden="true">+</span></button>
      <nav id="main-nav" aria-label="Main navigation">
        ${navigation.map(({path, label}) => `<a href="${context.page(path)}"${path === page.path ? ' aria-current="page"' : ''}${path === 'get-involved' ? ' class="nav-join"' : ''}>${label}</a>`).join('\n        ')}
      </nav>
    </div>
  </header>
  <main id="main">
${page.render(context)}
  </main>
  <footer class="site-footer">
    <div class="container">
      <div class="footer-top">
        <div class="footer-identity">${wordmark}<p>Different faculties.<br>A shared McMaster spirit.</p></div>
        <div class="footer-connect">
          <h2>Keep the connection.</h2>
          <div class="footer-links">
            <a href="${links.instagram}">Instagram <span aria-hidden="true">↗</span></a>
            <a href="${context.page('get-involved')}">Get involved</a>
            <a href="${links.enactus}">Enactus Canada <span aria-hidden="true">↗</span></a>
          </div>
          <div class="footer-links policy-links">${policyLinks}</div>
        </div>
      </div>
      <div class="footer-bottom">
        <span>Hamilton, Ontario</span>
        <span class="footer-copyright">© 2026 Enactus McMaster</span>
        <a href="#main">Back to top <span aria-hidden="true">↑</span></a>
      </div>
    </div>
  </footer>
</body>
</html>
`;
}
