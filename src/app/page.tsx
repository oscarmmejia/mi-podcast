import type { Metadata } from 'next';
import Link from 'next/link';
import FeaturedHero from '@/components/FeaturedHero';
import { getFeaturedEpisode, sortedEpisodes } from '@/data/episodes';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Quiet Frequencies — Conversations worth slowing down for',
  description:
    "A slow-paced interview show about craft, creativity, and the people who do one thing well. Start with this week's featured episode.",
  alternates: { canonical: '/' },
};

export default function HomePage() {
  const featured = getFeaturedEpisode();
  const latest = sortedEpisodes.slice(0, 3);

  return (
    <>
      <FeaturedHero episode={featured} />

      <section className={styles.strip} aria-labelledby="latest-heading">
        <div className={styles.stripInner}>
          <div>
            <h2 id="latest-heading" className={styles.stripTitle}>
              Latest episodes
            </h2>
            <ul role="list" className={styles.latestList}>
              {latest.map((episode) => (
                <li key={episode.slug} className={styles.latestItem}>
                  <Link
                    href={`/episodes/${episode.slug}`}
                    className={styles.latestLink}
                  >
                    <span className={styles.latestNumber}>
                      {episode.number}
                    </span>
                    <span className={styles.latestTitle}>{episode.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <Link href="/episodes" className={styles.browse}>
            Browse all 20 episodes →
          </Link>
        </div>
      </section>
    </>
  );
}
