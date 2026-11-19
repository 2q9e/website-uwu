// Copyright (c) 2026 Enactus McMaster. All rights reserved. Source available for viewing only. See LICENSE.

import { links } from '../config.ts';
import type { Page } from '../config.ts';

function document(title: string, body: string): string {
  return `
    <article class="legal-page container" aria-labelledby="page-title">
      <h1 id="page-title">${title}</h1>
      <p class="legal-date">Last updated <time datetime="2026-11-19">November 19, 2026</time></p>
      ${body}
    </article>`;
}

export const privacy: Page = {
  path: 'privacy',
  title: 'Privacy Policy',
  description: 'How this Enactus McMaster site handles visits and what happens when you contact the team or follow an external link.',
  render() {
    return document('Privacy Policy', `
      <p>This policy covers the Enactus McMaster information website. You can read its pages without signing in or providing your name or email address.</p>
      <section>
        <h2>When you browse</h2>
        <p>The website has no accounts, submissions, payments, analytics or advertising trackers. Its code doesn’t set cookies or save preferences in browser storage. The navigation, photo gallery and competition tabs run in your browser.</p>
        <p>The hosting provider receives the requests needed to serve pages and may record technical details such as IP address, requested page, browser information and time. The provider’s logging and retention settings depend on where the website is hosted.</p>
      </section>
      <section>
        <h2>When you contact or apply to the team</h2>
        <p>Recruitment links and the chapter’s social profiles take you to other services such as Linktree, Instagram, LinkedIn and any application form the chapter links to. Those services handle your activity under their own privacy terms. Information you send through those services can be read by the recipients you send it to.</p>
        <p>Share only the information needed for your inquiry or application. Use a private channel when your message includes personal information, and review any notice provided with the application before submitting it.</p>
      </section>
      <section>
        <h2>Privacy questions and requests</h2>
        <p>For questions or requests about information you sent to the team, contact <a href="${links.instagram}">Enactus McMaster on Instagram</a> or use <a href="${links.linkedin}">the team’s LinkedIn page</a>. Identify the channel where you shared the information and describe your request. Contact the external service directly for information it holds about your account or activity.</p>
      </section>`);
  },
};

export const terms: Page = {
  path: 'terms',
  title: 'Terms of Use',
  description: 'Terms for browsing the Enactus McMaster site, including content, project information and source code rights.',
  render(context) {
    return document('Terms of Use', `
      <p>This site provides information about Enactus McMaster, its past projects and competition results, and ways to contact or join the team.</p>
      <section>
        <h2>Using the site</h2>
        <p>You may browse the pages for information. Use the site lawfully and respect the rights of the people and organizations represented here. Please don’t impersonate the team or imply its endorsement without permission.</p>
      </section>
      <section>
        <h2>Content and source code</h2>
        <p>© 2026 Enactus McMaster. All rights reserved. The source is available for viewing only. The <a href="https://github.com/2q9e/website-uwu/blob/main/LICENSE">repository license</a> prohibits hosting, deployment, copying, modification, distribution and use of the source as a template or reference for other projects without written permission, subject to applicable law and GitHub’s platform terms. Third-party names, marks, fonts and photographs remain subject to their owners’ rights.</p>
      </section>
      <section>
        <h2>Project information and external links</h2>
        <p>Competition results and team roles describe the dates shown. Check the chapter’s recruitment hub for current opportunities. Project descriptions are provided for general information. The CPR Global description is neither CPR instruction nor medical advice. External services are governed by their own terms.</p>
      </section>
      <section>
        <h2>Questions and corrections</h2>
        <p>To report a correction, raise a rights concern, or request written permission, contact the team on <a href="${links.instagram}">Instagram</a> or <a href="${links.linkedin}">LinkedIn</a>. See the <a href="${context.page('privacy')}">Privacy Policy</a> for details about browsing and external links.</p>
      </section>`);
  },
};
