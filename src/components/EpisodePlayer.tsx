import styles from './EpisodePlayer.module.css';

interface EpisodePlayerProps {
  audioUrl?: string;
  title: string;
}

export default function EpisodePlayer({ audioUrl, title }: EpisodePlayerProps) {
  if (!audioUrl) {
    return (
      <p className={styles.unavailable} role="status">
        Preview unavailable for this episode — full audio coming with the
        catalog release.
      </p>
    );
  }

  return (
    <div className={styles.player}>
      <audio controls preload="none" src={audioUrl}>
        Your browser does not support the audio element.{' '}
        <a href={audioUrl}>Download the episode</a>.
      </audio>
      <span className="visually-hidden">Audio player for {title}</span>
    </div>
  );
}
