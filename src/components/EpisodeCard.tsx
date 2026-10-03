import Link from 'next/link';
import type { Episode } from '@/data/episodes';
import { formatDate, formatDuration } from '@/lib/format';
import styles from './EpisodeCard.module.css';

interface EpisodeCardProps {
  episode: Episode;
}

export default function EpisodeCard({ episode }: EpisodeCardProps) {
  return (
    <li className={styles.item}>
      <Link href={`/episodes/${episode.slug}`} className={styles.card}>
        {episode.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element -- static export: images are pre-sized assets
          <img
            src={episode.coverImage}
            alt=""
            width={96}
            height={96}
            loading="lazy"
            className={styles.cover}
          />
        ) : (
          <div className={styles.coverFallback} aria-hidden="true">
            <span className={styles.coverNumber}>{episode.number}</span>
          </div>
        )}
        <div className={styles.body}>
          <p className={styles.meta}>
            <span className={styles.number}>No. {episode.number}</span>
            <span aria-hidden="true"> · </span>
            <time dateTime={episode.publishedAt}>
              {formatDate(episode.publishedAt)}
            </time>
            <span aria-hidden="true"> · </span>
            <span>{formatDuration(episode.durationSeconds)}</span>
          </p>
          <h3 className={styles.title}>{episode.title}</h3>
          <p className={styles.summary}>{episode.summary}</p>
          {episode.guestName ? (
            <p className={styles.guest}>with {episode.guestName}</p>
          ) : null}
        </div>
      </Link>
    </li>
  );
}
