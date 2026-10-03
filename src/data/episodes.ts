export interface Episode {
  slug: string;
  number: number;
  title: string;
  summary: string;
  description: string;
  publishedAt: string;
  durationSeconds: number;
  guestName?: string;
  coverImage?: string;
  audioUrl?: string;
  featured?: boolean;
}

export const episodes: Episode[] = [
  {
    slug: 'the-long-tune',
    number: 20,
    title: 'The Long Tune',
    summary:
      'Luthier Ana Petrov on carving a guitar top until it stops arguing with you.',
    description:
      'Ana Petrov has built fewer than two hundred guitars in twenty-two years, and she can tell you what every one of them sounded like the first time it was strung. We talk about spruce, patience, and why the hardest part of the craft is knowing when to stop scraping. Recorded in her workshop, cello sawing in the background.',
    publishedAt: '2026-09-24',
    durationSeconds: 3480,
    guestName: 'Ana Petrov',
    featured: true,
  },
  {
    slug: 'blueprints-for-living',
    number: 19,
    title: 'Blueprints for Living',
    summary:
      'Architect Tomas Reyes on designing houses that age into their neighborhoods.',
    description:
      'Tomas Reyes believes a building should look better in thirty years than on opening day. We discuss materials that earn their patina, clients who ask for the impossible, and the small domestic details — a window seat, a worn threshold — that turn a plan into a life.',
    publishedAt: '2026-09-10',
    durationSeconds: 3120,
    guestName: 'Tomas Reyes',
  },
  {
    slug: 'fermentation-diaries',
    number: 18,
    title: 'Fermentation Diaries',
    summary:
      'Cheesemaker Delphine Aubry keeps a log of every wheel she has ever made.',
    description:
      "Delphine Aubry's cellar contains two hundred wheels and a ledger with a decade of notes on temperature, rind, and mood. We talk about controlled decay, trusting your nose over a timer, and the year a batch taught her humility.",
    publishedAt: '2026-08-27',
    durationSeconds: 2940,
    guestName: 'Delphine Aubry',
  },
  {
    slug: 'script-and-shadow',
    number: 17,
    title: 'Script & Shadow',
    summary: 'Animator Ravi Menon draws one second a day — on paper, by hand.',
    description:
      "Ravi Menon's feature-short took six years at a pace of one second of animation per working day. We talk about the discipline of slow frames, the tyranny of the undo key, and what hand-drawn motion captures that interpolation never will.",
    publishedAt: '2026-08-13',
    durationSeconds: 3300,
    guestName: 'Ravi Menon',
  },
  {
    slug: 'the-patient-camera',
    number: 16,
    title: 'The Patient Camera',
    summary:
      'Photographer Elin Sørensen waits days for a single harbour frame.',
    description:
      'Elin Sørensen shoots film and very few frames. We discuss waiting as a creative method, the economics of developing mistakes, and the harbour series that took three winters to complete — plus what she does when the light simply refuses.',
    publishedAt: '2026-07-30',
    durationSeconds: 2760,
    guestName: 'Elin Sørensen',
  },
  {
    slug: 'field-recordings',
    number: 15,
    title: 'Field Recordings',
    summary:
      'Sound artist Kofi Asante listens to cities the way others photograph them.',
    description:
      'Kofi Asante carries a recorder the way others carry a camera, collecting ferry horns, market chatter, and rain on corrugated roofs. We talk about listening as authorship, permission, and the tape he will never publish.',
    publishedAt: '2026-07-16',
    durationSeconds: 3180,
    guestName: 'Kofi Asante',
  },
  {
    slug: 'repair-as-a-verb',
    number: 14,
    title: 'Repair as a Verb',
    summary:
      'Consistor Ines Duarte on mending museum chairs without hiding the seams.',
    description:
      'Ines Duarte repairs objects meant to last centuries, and she refuses to make her work invisible. We discuss the ethics of the visible seam, glue that outlives its makers, and the chair that arrived at the museum in eleven pieces.',
    publishedAt: '2026-07-02',
    durationSeconds: 3000,
    guestName: 'Ines Duarte',
  },
  {
    slug: 'the-color-of-silence',
    number: 13,
    title: 'The Color of Silence',
    summary: 'Painter Hugo Marchand explains why he spends weeks on one grey.',
    description:
      'Hugo Marchand mixes paint by daylight and refuses to finish a canvas indoors. We talk about the labour inside a single colour, studio rituals, and the year he stopped painting subjects entirely.',
    publishedAt: '2026-06-18',
    durationSeconds: 2820,
    guestName: 'Hugo Marchand',
  },
  {
    slug: 'grain-direction',
    number: 12,
    title: 'Grain Direction',
    summary: 'Woodworker Salma Haddad reads a board before she cuts it.',
    description:
      'Salma Haddad built her first bench from salvage timber and has trusted the grain ever since. We discuss reading wood like a map, hand tools versus machine speed, and the joint she still practices on scrap before every commission.',
    publishedAt: '2026-06-04',
    durationSeconds: 3060,
    guestName: 'Salma Haddad',
  },
  {
    slug: 'notes-from-a-night-shift',
    number: 11,
    title: 'Notes from a Night Shift',
    summary:
      'Watchmaker Peter Lang adjusts time itself, one movement at a time.',
    description:
      'Peter Lang services mechanical watches older than his grandfather. We talk about magnification, the sound of a healthy movement, and why a digital clock can be accurate without ever being right.',
    publishedAt: '2026-05-21',
    durationSeconds: 2640,
    guestName: 'Peter Lang',
  },
  {
    slug: 'ink-before-pixels',
    number: 10,
    title: 'Ink Before Pixels',
    summary:
      'A solo episode on the typographic habits that survive every medium.',
    description:
      'A shorter, solo instalment: Maya works through the typographic rules she carries from letterpress proofing into everyday screen writing — measure, contrast, and the quiet authority of a well-set page. No guest, just notes.',
    publishedAt: '2026-05-07',
    durationSeconds: 1680,
  },
  {
    slug: 'the-last-bookbinder',
    number: 9,
    title: 'The Last Bookbinder',
    summary:
      'Jonas Weber binds books nobody will open for another hundred years.',
    description:
      'Jonas Weber is the only bookbinder left on his street, and possibly his city. We discuss sewing signatures, archival arrogance, and the commission that had to survive a flood before it reached its shelf.',
    publishedAt: '2026-04-23',
    durationSeconds: 3240,
    guestName: 'Jonas Weber',
  },
  {
    slug: 'bread-again',
    number: 8,
    title: 'Bread, Again',
    summary:
      'Baker Noor Hassan starts every morning at four with the same starter.',
    description:
      "Noor Hassan's starter is twelve years old and has a name. We talk about the maths of fermentation, the cruelty of bakery hours, and why she still scores every loaf by hand even as demand outgrows her ovens.",
    publishedAt: '2026-04-09',
    durationSeconds: 2880,
    guestName: 'Noor Hassan',
  },
  {
    slug: 'slow-code',
    number: 7,
    title: 'Slow Code',
    summary:
      'Engineer Wei Zhang writes software the way others write essays — slowly.',
    description:
      'Wei Zhang spent a decade shipping small, durable systems and refuses to call it minimalism. We talk about reading your own code a year later, the cost of cleverness, and maintenance as the real creative act.',
    publishedAt: '2026-03-26',
    durationSeconds: 3420,
    guestName: 'Wei Zhang',
  },
  {
    slug: 'a-grammar-of-glass',
    number: 6,
    title: 'A Grammar of Glass',
    summary:
      'Glassblower Lucia Ferretti thinks in verbs: gather, blow, turn, anneal.',
    description:
      'Lucia Ferretti shapes molten glass in front of audiences and claims stage fright never left her. We discuss heat as a collaborator, the vocabulary of the furnace, and the vase that survived a workshop fire by chance.',
    publishedAt: '2026-03-12',
    durationSeconds: 3000,
    guestName: 'Lucia Ferretti',
  },
  {
    slug: 'the-loom-keeps-time',
    number: 5,
    title: 'The Loom Keeps Time',
    summary:
      'Weaver Amara Okonkwo sets up a warp that takes nine days to thread.',
    description:
      "Amara Okonkwo's loom occupies most of her living room and all of her attention. We talk about pattern as memory, the arithmetic hidden in textile design, and the commission that changed how she counts.",
    publishedAt: '2026-02-26',
    durationSeconds: 2700,
    guestName: 'Amara Okonkwo',
  },
  {
    slug: 'ten-thousand-rejections',
    number: 4,
    title: 'Ten Thousand Rejections',
    summary: 'Ceramicist Hiro Tanaka keeps every bowl that failed.',
    description:
      "Hiro Tanaka's studio shelves are a museum of collapses, cracks, and glaze disasters. We talk about failure as inventory, the physics of a wobbling pot, and the kiln opening he still approaches like a verdict.",
    publishedAt: '2026-02-12',
    durationSeconds: 3180,
    guestName: 'Hiro Tanaka',
  },
  {
    slug: 'set-in-metal',
    number: 3,
    title: 'Set in Metal',
    summary:
      'Letterpress printer Greta Lund sets a line of type by hand, backwards.',
    description:
      'Greta Lund runs a press older than her grandmother and sets every job by hand. We discuss the reversed logic of metal type, the smell of oil-based ink, and the wedding invitation that took four days for twelve words.',
    publishedAt: '2026-01-29',
    durationSeconds: 2940,
    guestName: 'Greta Lund',
  },
  {
    slug: 'what-the-microphone-hears',
    number: 2,
    title: 'What the Microphone Hears',
    summary: 'Sound engineer Farid Nasser on recording rooms, not just voices.',
    description:
      "Farid Nasser records orchestras and argues the room is the first instrument. We discuss mic placement as composition, the honesty of an unedited breath, and the live take that couldn't be repeated.",
    publishedAt: '2026-01-15',
    durationSeconds: 3300,
    guestName: 'Farid Nasser',
  },
  {
    slug: 'the-weight-of-a-good-knife',
    number: 1,
    title: 'The Weight of a Good Knife',
    summary: 'Bladesmith Ivo Karlsen forges the episode that started the show.',
    description:
      'The first conversation: Ivo Karlsen on balance, steel, and the difference a hundred grams makes in a hand. We talk about apprenticeship, the sharpening habit he never breaks, and why he gives every blade a date before a name.',
    publishedAt: '2026-01-01',
    durationSeconds: 3600,
    guestName: 'Ivo Karlsen',
  },
];

export const sortedEpisodes: Episode[] = [...episodes].sort((a, b) =>
  b.publishedAt.localeCompare(a.publishedAt),
);

export function getFeaturedEpisode(): Episode {
  const flagged = episodes.find((e) => e.featured);
  if (flagged) return flagged;
  return sortedEpisodes[0];
}

export function getEpisodeBySlug(slug: string): Episode | undefined {
  return episodes.find((e) => e.slug === slug);
}

function validateEpisodes(list: Episode[]): void {
  const errors: string[] = [];

  if (list.length !== 20) {
    errors.push(`expected exactly 20 episodes, found ${list.length}`);
  }

  const slugs = new Set<string>();
  const numbers = new Set<number>();
  let featuredCount = 0;

  for (const e of list) {
    const id = `#${e.number} (${e.slug})`;
    if (!e.slug) errors.push(`${id}: empty slug`);
    if (slugs.has(e.slug)) errors.push(`${id}: duplicate slug`);
    slugs.add(e.slug);
    if (numbers.has(e.number)) errors.push(`${id}: duplicate number`);
    numbers.add(e.number);
    if (!e.title.trim()) errors.push(`${id}: empty title`);
    if (!e.summary.trim()) errors.push(`${id}: empty summary`);
    if (!e.description.trim()) errors.push(`${id}: empty description`);
    if (
      !/^\d{4}-\d{2}-\d{2}$/.test(e.publishedAt) ||
      Number.isNaN(Date.parse(e.publishedAt))
    ) {
      errors.push(`${id}: invalid publishedAt "${e.publishedAt}"`);
    }
    if (!(e.durationSeconds > 0)) {
      errors.push(`${id}: durationSeconds must be > 0`);
    }
    if (e.coverImage && !e.coverImage.startsWith('/images/')) {
      errors.push(`${id}: coverImage must live under /images/`);
    }
    if (e.audioUrl && !e.audioUrl.startsWith('/audio/')) {
      errors.push(`${id}: audioUrl must live under /audio/`);
    }
    if (e.featured) featuredCount += 1;
  }

  if (featuredCount > 1) {
    errors.push(`expected at most 1 featured episode, found ${featuredCount}`);
  }

  if (errors.length > 0) {
    throw new Error(
      `Episode data validation failed:\n- ${errors.join('\n- ')}`,
    );
  }
}

validateEpisodes(episodes);
