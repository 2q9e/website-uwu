// Copyright (c) 2026 Enactus McMaster. All rights reserved. Source available for viewing only. See LICENSE.

import { links } from '../config.ts';
import type { Page, PageContext } from '../config.ts';
import { funding, photos, results } from '../content.ts';
import { photoImage } from './home.ts';

function heading(label: string, title: string, intro: string, visual = ''): string {
  return `
    <section class="page-heading container${visual ? ' page-heading-split' : ''}" aria-labelledby="page-title">
      <div><p class="page-label">${label}</p><h1 id="page-title">${title}</h1><p class="page-lead">${intro}</p></div>
      ${visual}
    </section>`;
}

function figure(context: PageContext, photo: typeof photos[keyof typeof photos]): string {
  return `<figure class="page-photo">${photoImage(context, photo, true)}<figcaption>${photo.caption}</figcaption></figure>`;
}

export const about: Page = {
  path: 'about',
  title: 'About Us',
  description: 'Learn how McMaster students from different faculties work together on social and environmental challenges through Enactus.',
  render(context) {
    return `${heading('About Enactus McMaster', 'Ideas into action.', 'We’re a student team at McMaster University in Hamilton. We use entrepreneurship to work on problems that matter to our communities.', figure(context, photos.campus))}
    <section class="page-section container" aria-labelledby="mission-title">
      <div class="page-split" data-reveal>
        <h2 id="mission-title">A head for business.<br>A heart for our community.</h2>
        <div class="page-copy">
          <p>Enactus brings students together to develop projects with social and environmental goals. At McMaster, students from different faculties contribute research, project development and storytelling.</p>
          <p>Our team shares its work through Enactus Canada’s competitions. From 2025 to 2026, we earned ${results.length} documented podium finishes and ${funding} in awards across those regional results.</p>
          <a class="underlined-link" href="${context.page('projects')}#competition-results">Explore competition results</a>
        </div>
      </div>
    </section>
    <section class="page-callout container" aria-labelledby="about-join-title" data-reveal>
      <div><h2 id="about-join-title">Bring your perspective.</h2><p>See how to get involved with the McMaster team.</p></div>
      <a class="button button-maroon" href="${context.page('get-involved')}">Get involved</a>
    </section>`;
  },
};

export const projects: Page = {
  path: 'projects',
  title: 'Our Projects',
  description: 'Explore CPR Global, QuoBloc Technologies, Trayce, and Enactus McMaster’s 2025 and 2026 regional competition results.',
  render() {
    return `${heading('Our Projects', 'Ideas at work.', 'Explore the projects Enactus McMaster presented at Central Canada regional competitions in 2025 and 2026.')}
    <section class="page-section container" aria-label="Featured projects">
      <article id="cpr-global" class="inner-feature" data-reveal>
        <div><p class="page-label">Community health</p><h2>CPR Global</h2></div>
        <div class="page-copy">
          <p>CPR Global aims to make hands-only CPR education more accessible, including for communities that have limited access to conventional training. The project was founded by McMaster pediatrician Dr. Tapas Mondal.</p>
          <p>Enactus McMaster presented the project at regionals in 2025 and earned runner-up in the 2026 TD Entrepreneurship Challenge.</p>
        </div>
      </article>
      <div class="page-cards">
        <article class="page-card" data-reveal>
          <p class="page-label">2025 · Innovation and Impact</p><h2>QuoBloc Technologies</h2>
          <p>The team presented work addressing antimicrobial resistance and earned runner-up in Central Canada League A.</p>
        </article>
        <article class="page-card" data-reveal>
          <p class="page-label">2026 · Environmental Sustainability</p><h2>Trayce</h2>
          <p>Trayce earned second runner-up in Central Canada League B at the Canadian Tire Environmental Sustainability Impact Challenge.</p>
        </article>
      </div>
    </section>
    <section class="page-section container results-section" id="competition-results" aria-labelledby="results-title">
      <h2 id="results-title">Regional competition results</h2>
      <p>Central Canada · 2025–2026 · ${funding} across five podium finishes</p>
      <div class="results-list">
        ${results.map(result => `
        <article>
          <p class="page-label">${result.year} · League ${result.league}</p>
          <div><h3>${result.challenge}</h3><p>${result.project} · ${result.place}</p></div>
          <strong>$${result.award.toLocaleString('en-CA')}</strong>
        </article>`).join('')}
      </div>
    </section>`;
  },
};

export const team: Page = {
  path: 'team',
  title: 'Our Team',
  description: 'Meet the students who represented Enactus McMaster at the 2025 National Exposition and 2026 regional competition.',
  render(context) {
    return `${heading('Our Team', 'Different faculties. One McMaster team.', 'Meet some of the students who have represented Enactus McMaster on the regional and national stages.', figure(context, photos.nationals))}
    <section class="page-section container" aria-label="Team milestones">
      <div class="page-cards">
        <article class="page-card" data-reveal>
          <p class="page-label">2026 · Central Canada regionals</p><h2>Presenting CPR Global</h2>
          <p>Aleena Siddique, Claire Li and Kareem Sokhon presented the team’s work in the TD Entrepreneurship Challenge. Cáoimhe Crosson and Diego Brunetto served as presidents at the time.</p>
        </article>
        <article class="page-card" data-reveal>
          <p class="page-label">2025 · National Exposition</p><h2>Together in Calgary</h2>
          <p>Aleena Siddique attended as VP of Marketing and helped prepare the team’s presentations. Aadil Merali was the team’s faculty advisor at the event.</p>
        </article>
      </div>
    </section>
    <section class="page-callout container" aria-labelledby="team-updates" data-reveal>
      <div><h2 id="team-updates">Follow the team.</h2><p>See chapter updates and meet the people behind the projects.</p></div>
      <div class="page-actions"><a class="button button-maroon" href="${links.linkedin}">Enactus McMaster on LinkedIn</a>
      <a class="underlined-link" href="${links.instagram}">@mcmasterenactus</a></div>
    </section>`;
  },
};

export const getInvolved: Page = {
  path: 'get-involved',
  title: 'Get Involved',
  description: 'Find Enactus McMaster recruitment updates and learn how to contact the student team.',
  render(context) {
    const mark = `<figure class="page-mark"><img src="${context.asset('enactus-mcmaster.png')}" width="357" height="357" alt="Enactus McMaster University logo"></figure>`;
    return `${heading('Get Involved', 'Find your place at Enactus.', 'Bring your perspective to a team of McMaster students working on social and environmental projects.', mark)}
    <section class="page-section container" aria-label="Ways to get involved">
      <div class="page-cards">
        <article class="page-card" data-reveal>
          <h2>Join the student team</h2>
          <p>Use the chapter’s recruitment hub to check for open roles, eligibility and application instructions. Follow the team on Instagram for recruitment announcements.</p>
          <a class="button button-maroon" href="${links.recruitment}">Open the recruitment hub</a>
        </article>
        <article class="page-card" data-reveal>
          <h2>Get in touch</h2>
          <p>Have a question about a project, an event, or working with the team? Reach out through the chapter’s public social channels.</p>
          <div class="page-actions"><a class="underlined-link" href="${links.instagram}">Message on Instagram</a><a class="underlined-link" href="${links.linkedin}">Find us on LinkedIn</a></div>
        </article>
      </div>
    </section>`;
  },
};
