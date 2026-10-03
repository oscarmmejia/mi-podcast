export interface FaqEntry {
  question: string;
  answer: string;
}

export interface ShowLink {
  label: string;
  url: string;
}

export interface ShowProfile {
  name: string;
  tagline: string;
  premise: string;
  hostName: string;
  hostBio: string;
  links: ShowLink[];
  faq: FaqEntry[];
}

export const show: ShowProfile = {
  name: 'Quiet Frequencies',
  tagline: 'Conversations worth slowing down for.',
  premise:
    "Quiet Frequencies is a slow-paced interview show about craft, creativity, and the people who devote their lives to doing one thing well. Each episode is a single, unhurried conversation — no hot takes, no cross-talk, just the kind of talk you'd have late in the evening with someone who knows their subject inside out.",
  hostName: 'Maya Ellison',
  hostBio:
    "Maya Ellison is a writer and former radio producer who has spent fifteen years interviewing artisans, engineers, and artists. She started Quiet Frequencies to bring long-form conversation back to the internet, one steady episode at a time. When she isn't recording, she teaches narrative nonfiction and restores vintage microphones she has no business buying.",
  links: [
    { label: 'Follow on Apple Podcasts', url: 'https://example.com/apple' },
    { label: 'Follow on Spotify', url: 'https://example.com/spotify' },
    { label: 'RSS (sample)', url: 'https://example.com/rss' },
    { label: 'Email the show', url: 'mailto:hello@quietfrequencies.example' },
  ],
  faq: [
    {
      question: 'How often do new episodes come out?',
      answer:
        'Every other Thursday. We keep a deliberate pace so each conversation has room to breathe — two episodes a month, no filler in between.',
    },
    {
      question: 'Where can I listen?',
      answer:
        'Anywhere you like: Apple Podcasts, Spotify, or the RSS feed linked in the footer. Every episode page here also has a player you can use directly.',
    },
    {
      question: 'Who is the show for?',
      answer:
        "People who like hearing someone think out loud — makers, students, and the incurably curious. You do not need any background in the guest's field to follow along.",
    },
    {
      question: 'Can I suggest a guest?',
      answer:
        "Yes. Email the show with a paragraph on why this person's story deserves an hour of quiet attention. We read everything, though we reply slowly.",
    },
    {
      question: 'Is the transcript available?',
      answer:
        'Full transcripts ship with every episode within a week of release. On this site they appear beneath the player on each episode page.',
    },
    {
      question: 'May I reuse or share episodes?',
      answer:
        "Sharing is encouraged — link freely. For reuse in courses or broadcasts, drop us a line first and we'll sort out the details.",
    },
  ],
};
