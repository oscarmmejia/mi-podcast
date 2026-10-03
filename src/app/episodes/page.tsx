import type { Metadata } from 'next';
import EpisodeCard from '@/components/EpisodeCard';
import { sortedEpisodes } from '@/data/episodes';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Episodes',
  description:
    'Every episode of Quiet Frequencies — 20 unhurried conversations about craft and creativity, newest first.',
  alternates: { canonical: '/episodes' },
};

export default function EpisodesPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Episodes</h1>
        <p className={styles.count}>
          {sortedEpisodes.length} conversations, newest first
        </p>
      </header>
      <ul role="list" className={styles.list}>
        {sortedEpisodes.map((episode) => (
          <EpisodeCard key={episode.slug} episode={episode} />
        ))}
      </ul>
    </div>
  );
}
