import type { Metadata } from 'next';
import { show } from '@/data/show';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'About',
  description: show.premise.slice(0, 155),
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>About the show</h1>
        <p className={styles.premise}>{show.premise}</p>
      </header>

      <section className={styles.host} aria-labelledby="host-heading">
        <h2 id="host-heading" className={styles.hostTitle}>
          Your host
        </h2>
        <p className={styles.hostName}>{show.hostName}</p>
        <p className={styles.hostBio}>{show.hostBio}</p>
      </section>

      <section className={styles.follow} aria-labelledby="follow-heading">
        <h2 id="follow-heading" className={styles.followTitle}>
          Follow &amp; share
        </h2>
        <ul role="list" className={styles.linkList}>
          {show.links.map(({ label, url }) => (
            <li key={label}>
              <a href={url} className={styles.link}>
                {label}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
