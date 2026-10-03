import Link from 'next/link';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <div className={styles.wrap}>
      <p className={styles.code} aria-hidden="true">
        404
      </p>
      <h1>This page tuned out.</h1>
      <p>
        The address you followed doesn&apos;t match any episode or page on the
        site.
      </p>
      <Link href="/episodes" className={styles.link}>
        Browse all episodes
      </Link>
    </div>
  );
}
