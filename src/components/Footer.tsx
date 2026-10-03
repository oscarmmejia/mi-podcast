import Link from 'next/link';
import { show } from '@/data/show';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div>
          <p className={styles.name}>{show.name}</p>
          <p className={styles.tagline}>{show.tagline}</p>
        </div>
        <nav aria-label="Follow the show">
          <ul role="list" className={styles.links}>
            {show.links.map(({ label, url }) => (
              <li key={label}>
                <a href={url} className={styles.link}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <p className={styles.small}>
          <Link href="/about">About the show</Link>
          {' · '}
          <Link href="/faq">FAQ</Link>
        </p>
      </div>
    </footer>
  );
}
