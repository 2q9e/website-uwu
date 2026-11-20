<!-- Copyright (c) 2026 Enactus McMaster. All rights reserved. Source available for viewing only. See LICENSE. -->

# Enactus McMaster Website

This static site introduces Enactus McMaster and gives visitors dedicated pages for the chapter, projects, team, recruitment, and policies. The TypeScript source separates page composition and shared content from styles, assets, and browser interactions.

## Source layout

- `site/pages/` defines each page.
- `site/content.ts` holds the regional results and shared photos.
- `site/layout.ts` renders the navigation, footer and page metadata.
- `site/src/` contains browser interactions.
- `site/styles/` and `site/assets/` contain styling, images and fonts.
- `docs/SOURCES.md` and `docs/MEDIA.md` record evidence and media provenance.
  The build does not copy these documents into the website.

## Maintainer preview

Authorized maintainers can install dependencies with `pnpm install --frozen-lockfile`
and run `pnpm build` on Node.js 24 or later. Serve `dist/` locally over HTTP to
preview. Set `SITE_URL` to the approved public base URL before a production
build to generate canonical links and same-site social card URLs.

The policy pages describe the current static implementation. Review hosting
logs, recruitment procedures, media permissions and the contact channel
before a public launch or whenever those details change.

## License

The source is available for viewing only under [LICENSE](LICENSE).
Hosting, deploying, copying, modifying or reusing it requires prior written
permission, subject to applicable law and GitHub's platform terms.
Third-party materials retain their own terms.
