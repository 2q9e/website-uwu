// Copyright (c) 2026 Enactus McMaster. All rights reserved. Source available for viewing only. See LICENSE.

export const results = [
  { year: 2026, challenge: 'TD Entrepreneurship Challenge', project: 'CPR Global', league: 'C', place: 'Runner-up', award: 1000 },
  { year: 2026, challenge: 'Canadian Tire Environmental Sustainability Impact Challenge', project: 'Trayce', league: 'B', place: 'Second runner-up', award: 500 },
  { year: 2025, challenge: 'Innovation and Impact Challenge', project: 'QuoBloc Technologies', league: 'A', place: 'Runner-up', award: 1000 },
  { year: 2025, challenge: 'Canadian Tire Environmental Sustainability Challenge', project: 'CPR Global', league: 'A', place: 'Runner-up', award: 1000 },
  { year: 2025, challenge: 'Desjardins Youth Empowerment Challenge', project: 'CPR', league: 'B', place: 'Runner-up', award: 1000 },
] as const;

export const funding = new Intl.NumberFormat('en-CA', {
  style: 'currency', currency: 'CAD', maximumFractionDigits: 0,
}).format(results.reduce((total, result) => total + result.award, 0));

export const photos = {
  regionals: {
    file: 'regionals.webp', hdFile: 'regionals-hd.webp', hdWidth: 2400, width: 1600, height: 1066,
    alt: 'Enactus McMaster students at the 2025 regional competition, holding their award.',
    caption: 'Together at regionals, 2025', label: 'Regionals, 2025',
  },
  nationals: {
    file: 'nationals.webp', hdFile: 'nationals-hd.webp', hdWidth: 2400, width: 1600, height: 1066,
    alt: 'Enactus McMaster students at the 2025 National Exposition in Calgary.',
    caption: 'Together at nationals, 2025', label: 'Nationals, 2025',
  },
  campus: {
    file: 'campus.webp', hdFile: 'campus-hd.webp', hdWidth: 1800, width: 1600, height: 900,
    alt: 'University Hall framed by trees on McMaster University’s campus.',
    caption: 'University Hall, McMaster University',
  },
} as const;
