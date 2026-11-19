// Copyright (c) 2026 Enactus McMaster. All rights reserved. Source available for viewing only. See LICENSE.

import { description, escapeHtml, links } from '../config.ts';
import type { Page, PageContext } from '../config.ts';
import { funding, photos, results } from '../content.ts';

type Photo = (typeof photos)[keyof typeof photos];

export function photoImage({ asset }: PageContext, photo: Photo, eager = false, sizes = '(max-width: 760px) 100vw, min(50vw, 700px)'): string {
  return `<img src="${asset(photo.file)}" srcset="${asset(photo.file)} ${photo.width}w, ${asset(photo.hdFile)} ${photo.hdWidth}w" sizes="${sizes}" width="${photo.width}" height="${photo.height}" alt="${escapeHtml(photo.alt)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy" decoding="async"'}>`;
}

export function competitionTabs(): string {
  const years = [2026, 2025] as const;
  return `
      <div class="competition-years" id="competition-results" data-reveal>
        <div class="year-heading">
          <h3>On the regional stage.</h3>
          <div class="year-tabs" role="tablist" aria-label="Competition year" hidden>
            ${years.map((year, index) => `<button type="button" role="tab" id="tab-${year}" aria-controls="results-${year}" aria-selected="${index === 0}" data-result-year="${year}">${year}</button>`).join('')}
          </div>
        </div>
        ${years.map(year => `
        <div id="results-${year}" class="year-panel" aria-label="${year} regional results">
          <p class="year-placement">${year === 2026 ? '2 podium finishes' : '3 runner-up finishes'}</p>
          <div>
            <h4>${year} · Central Canada</h4>
            <ul>${results.filter(result => result.year === year).map(result => `
              <li><strong>${result.challenge}</strong><br><span>${result.project} · League ${result.league} · ${result.place}</span></li>`).join('')}
            </ul>
          </div>
        </div>`).join('')}
      </div>`;
}

export const home: Page = {
  path: '',
  title: 'Enactus McMaster | Ideas into action',
  description,
  render(context) {
    const { page, asset } = context;
    return `
    <section class="hero" aria-labelledby="hero-title">
      <div class="hero-stage">
        <figure class="hero-figure" id="our-people">
          <div class="hero-image">
            ${photoImage(context, photos.regionals, true, '100vw')}
            <p class="photo-error" hidden>Our team photograph couldn’t load. <button type="button" class="retry-image">Try again</button></p>
          </div>
          <figcaption><span>Enactus McMaster</span><span>Regional competition, 2025</span></figcaption>
        </figure>
        <div class="hero-heading">
          <h1 id="hero-title">Growth.<br>Innovation.<br>Connection.</h1>
          <a class="hero-scroll" href="#intro-title">Scroll to meet Enactus McMaster <span aria-hidden="true">↓</span></a>
        </div>
      </div>
    </section>

    <section class="introduction container section-space" aria-labelledby="intro-title">
      <figure class="chapter-photo">
        ${photoImage(context, photos.campus)}
        <figcaption>Our home in Hamilton · University Hall</figcaption>
      </figure>
      <div class="intro-copy" data-reveal>
        <h2 id="intro-title">We’re Enactus<br>McMaster.</h2>
        <p class="lead">We bring students across McMaster’s faculties together to work on social and environmental problems through entrepreneurship.</p>
        <p class="chapter-statement">A head for business.<br>A heart for our community.</p>
        <a class="button chapter-link" href="${page('about')}">About our chapter</a>
      </div>
    </section>

    <section class="competition-stats container" aria-labelledby="stats-title">
      <div class="stats-heading">
        <h2 id="stats-title">Our work,<br>recognised.</h2>
        <p>Central Canada regional results<br>2025–2026</p>
      </div>
      <dl class="stats-values">
        <div><dt>Regional podium finishes</dt><dd>${results.length}</dd></div>
        <div><dt>Competition funding awarded</dt><dd>${funding}</dd></div>
      </dl>
      <details class="stats-sources">
        <summary>Competition results</summary>
        <p>Four runner-up finishes earned $1,000 each. One second runner-up finish earned $500.</p>
        <ul>${results.map(({ year, challenge, project, place }) =>
          `<li>${year} · ${challenge} · ${project} · ${place}</li>`).join('')}</ul>
      </details>
    </section>

    <section class="community" aria-labelledby="community-title">
      <div class="container community-inner">
        <div class="community-title" data-reveal>
          <h2 id="community-title">Different faculties.<br>One McMaster team.</h2>
          <div>
            <p class="community-line">Students work together on projects and bring their work to the regional and national stages.</p>
            <p class="leadership-note"><span>2026 Central Canada regional presenters</span><strong>Aleena Siddique, Claire Li and Kareem Sokhon</strong></p>
            <div class="community-links">
              <a class="light-link" href="${page('team')}">Meet our team</a>
              <a class="light-link" href="${links.instagram}">Follow @mcmasterenactus</a>
            </div>
          </div>
        </div>
        <div class="team-gallery" role="region" aria-label="McMaster team photographs" aria-roledescription="carousel" data-reveal>
          <figure class="community-photo">
            ${photoImage(context, photos.nationals)}
            <figcaption><span class="gallery-source">${photos.nationals.caption}</span></figcaption>
          </figure>
          <div class="gallery-controls" hidden>
            <p class="gallery-position" aria-live="polite" aria-atomic="true">Photo 1 of 2: Nationals, 2025</p>
            <div>
              <button type="button" data-gallery-step="-1" aria-label="Previous team photo"><span aria-hidden="true">←</span></button>
              <button type="button" data-gallery-step="1" aria-label="Next team photo"><span aria-hidden="true">→</span></button>
            </div>
          </div>
          <p class="gallery-error" hidden>The team photo couldn’t load. <button type="button" class="gallery-retry">Try again</button></p>
          ${[photos.nationals, photos.regionals].map(photo =>
            `<span hidden class="gallery-slide" data-src="${asset(photo.file)}" data-src-width="${photo.width}" data-hd-src="${asset(photo.hdFile)}" data-hd-width="${photo.hdWidth}" data-alt="${escapeHtml(photo.alt)}" data-caption="${escapeHtml(photo.caption)}" data-label="${escapeHtml(photo.label)}"></span>`).join('')}
        </div>
      </div>
    </section>

    <section class="project-section container section-space" aria-labelledby="project-title">
      <div class="project-header">
        <h2 id="project-title">Ideas at work.</h2>
        <a class="underlined-link" href="${page('projects')}">Our projects</a>
      </div>
      <article class="project-feature" data-reveal>
        <span class="project-backdrop" aria-hidden="true">CPR</span>
        <div class="project-poster"><p class="project-category">Community health</p><h3>CPR Global</h3></div>
        <div class="project-copy">
          <p class="lead">Making hands-only CPR education more accessible.</p>
          <a class="underlined-link" href="${page('projects')}#cpr-global">Explore CPR Global</a>
        </div>
      </article>
      ${competitionTabs()}
    </section>

    <section class="join-section" aria-labelledby="join-title">
      <div class="join-scene">
        <div class="join-visual" data-reveal>${photoImage(context, photos.campus)}</div>
        <div class="join-inner" data-reveal>
          <h2 id="join-title">Find your place<br>at Enactus.</h2>
          <p>Bring your perspective.<br>Build something together.</p>
          <a class="button button-maroon" href="${page('get-involved')}">Get involved</a>
        </div>
      </div>
      <p class="join-credit">${photos.campus.caption}</p>
    </section>`;
  },
};
