<!-- Copyright (c) 2026 Enactus McMaster. All rights reserved. Source available for viewing only. See LICENSE. -->

# Enactus McMaster website

A static TypeScript website for the McMaster University student team. The
homepage follows the supplied design, and the chapter, projects, team,
recruitment, privacy and terms pages are available at their own addresses.

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
