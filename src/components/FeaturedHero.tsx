import Link from 'next/link';
import type { Episode } from '@/data/episodes';
import { show } from '@/data/show';
import { formatDate, formatDuration } from '@/lib/format';
import EpisodePlayer from './EpisodePlayer';
import styles from './FeaturedHero.module.css';

export default function FeaturedHero({ episode }: { episode: Episode }) {
  return (
    <section className={styles.hero} aria-labelledby="show-title">
      <div className={styles.inner}>
        <div className={styles.brand}>
          <h1 id="show-title" className={styles.title}>
            {show.name}
          </h1>
          <p className={styles.tagline}>{show.tagline}</p>
        </div>

        <article className={styles.featured} aria-label="Featured episode">
          <p className={styles.eyebrow}>
            Featured episode · No. {episode.number}
          </p>
          <h2 className={styles.episodeTitle}>
            <Link
              href={`/episodes/${episode.slug}`}
              className={styles.titleLink}
            >
              {episode.title}
            </Link>
          </h2>
          <p className={styles.summary}>{episode.summary}</p>
          <p className={styles.meta}>
            <time dateTime={episode.publishedAt}>
              {formatDate(episode.publishedAt)}
            </time>
            <span aria-hidden="true"> · </span>
            <span>{formatDuration(episode.durationSeconds)}</span>
            {episode.guestName ? (
              <>
                <span aria-hidden="true"> · </span>
                <span>with {episode.guestName}</span>
              </>
            ) : null}
          </p>
          <div className={styles.actions}>
            <Link
              href={`/episodes/${episode.slug}`}
              className={styles.cta}
              aria-describedby="featured-hint"
            >
              Listen to episode
            </Link>
            <span id="featured-hint" className={styles.hint}>
              Full notes &amp; player on the episode page
            </span>
          </div>
          <div className={styles.playerSlot}>
            <EpisodePlayer audioUrl={episode.audioUrl} title={episode.title} />
          </div>
        </article>
      </div>
    </section>
  );
}
