import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import EpisodePlayer from '@/components/EpisodePlayer';
import { episodes, getEpisodeBySlug } from '@/data/episodes';
import { show } from '@/data/show';
import { formatDate, formatDuration } from '@/lib/format';
import styles from './page.module.css';

interface EpisodePageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = 'force-static';

export function generateStaticParams() {
  return episodes.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: EpisodePageProps): Promise<Metadata> {
  const { slug } = await params;
  const episode = getEpisodeBySlug(slug);
  if (!episode) return { title: 'Episode not found' };
  return {
    title: episode.title,
    description: episode.summary,
    alternates: { canonical: `/episodes/${episode.slug}` },
  };
}

export default async function EpisodePage({ params }: EpisodePageProps) {
  const { slug } = await params;
  const episode = getEpisodeBySlug(slug);
  if (!episode) notFound();

  return (
    <article className={styles.page}>
      <p className={styles.breadcrumb}>
        <Link href="/episodes" className={styles.back}>
          ← All episodes
        </Link>
      </p>

      <header className={styles.header}>
        <p className={styles.meta}>
          <span className={styles.number}>No. {episode.number}</span>
          <span aria-hidden="true"> · </span>
          <time dateTime={episode.publishedAt}>
            {formatDate(episode.publishedAt)}
          </time>
          <span aria-hidden="true"> · </span>
          <span>{formatDuration(episode.durationSeconds)}</span>
        </p>
        <h1 className={styles.title}>{episode.title}</h1>
        {episode.guestName ? (
          <p className={styles.guest}>with {episode.guestName}</p>
        ) : null}
        <p className={styles.summary}>{episode.summary}</p>
      </header>

      <div className={styles.coverRow}>
        {episode.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element -- static export: images are pre-sized assets
          <img
            src={episode.coverImage}
            alt=""
            width={320}
            height={320}
            className={styles.cover}
          />
        ) : (
          <div className={styles.coverFallback} aria-hidden="true">
            <span className={styles.coverNumber}>{episode.number}</span>
            <span className={styles.coverShow}>{show.name}</span>
          </div>
        )}
        <div className={styles.playerBox}>
          <EpisodePlayer audioUrl={episode.audioUrl} title={episode.title} />
        </div>
      </div>

      <div className={styles.notes}>
        <h2 className={styles.notesTitle}>Show notes</h2>
        <p className={styles.description}>{episode.description}</p>
      </div>

      <nav className={styles.footerNav} aria-label="Episode navigation">
        <Link href="/episodes" className={styles.footerLink}>
          Browse all {episodes.length} episodes
        </Link>
        <Link href="/faq" className={styles.footerLink}>
          Listening FAQ
        </Link>
      </nav>
    </article>
  );
}
