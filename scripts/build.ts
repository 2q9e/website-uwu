// Copyright (c) 2026 Enactus McMaster. All rights reserved. Source available for viewing only. See LICENSE.

import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { stripTypeScriptTypes } from 'node:module';
import { resolve } from 'node:path';
import { renderPage } from '../site/layout.ts';
import { pages } from '../site/pages/index.ts';

const output = new URL('../dist/', import.meta.url);
const source = new URL('../site/', import.meta.url);
const origin = process.env.SITE_URL ? new URL(process.env.SITE_URL) : undefined;

if (origin) {
  if (!['http:', 'https:'].includes(origin.protocol) || origin.username || origin.password || origin.search || origin.hash) {
    throw new Error('SITE_URL must be a public HTTP(S) origin with an optional path.');
  }
  if (!origin.pathname.endsWith('/')) origin.pathname += '/';
}

await rm(output, { recursive: true, force: true });
await cp(new URL('assets/', source), new URL('assets/', output), { recursive: true });

for (const name of ['base', 'home', 'pages']) {
  await cp(new URL(`styles/${name}.css`, source), new URL(`assets/${name}.css`, output));
}

for (const name of ['main', 'interaction']) {
  const content = await readFile(new URL(`src/${name}.ts`, source), 'utf8');
  const result = stripTypeScriptTypes(content, { mode: 'strip' }).replace(
    /from ('|")(\.\/[^'"\n]+)\.ts\1/g, 'from $1$2.js$1',
  );
  await writeFile(new URL(`assets/${name}.js`, output), result);
}

for (const page of pages) {
  const directory = new URL(page.path ? `${page.path}/` : './', output);
  await mkdir(directory, { recursive: true });
  await writeFile(new URL('index.html', directory), renderPage(page, origin));
}

console.log(`Built ${pages.length} pages in ${resolve('dist')}`);
