// Copyright (c) 2026 Enactus McMaster. All rights reserved. Source available for viewing only. See LICENSE.

export const siteName = 'Enactus McMaster';
export const description = 'Meet Enactus McMaster, a student entrepreneurship team at McMaster University in Hamilton. Explore projects, competition results, and ways to join.';

export const links = {
  instagram: 'https://www.instagram.com/mcmasterenactus/',
  linkedin: 'https://www.linkedin.com/company/enactus-mcmaster/',
  recruitment: 'https://linktr.ee/enactusmcmaster',
  enactus: 'https://enactus.ca/',
} as const;

export const navigation = [
  { path: '', label: 'Home' },
  { path: 'about', label: 'About Us' },
  { path: 'projects', label: 'Our Projects' },
  { path: 'team', label: 'Our Team' },
  { path: 'get-involved', label: 'Get Involved' },
] as const;

export interface PageContext {
  page: (path?: string) => string;
  asset: (name: string) => string;
}

export interface Page {
  path: string;
  title: string;
  description: string;
  render: (context: PageContext) => string;
}

export function escapeHtml(text: string): string {
  const entities: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  return text.replace(/[&<>"']/g, character => entities[character]);
}
