import Link from 'next/link';
import styles from './Header.module.css';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/episodes', label: 'Episodes' },
  { href: '/about', label: 'About' },
  { href: '/faq', label: 'FAQ' },
];

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.brand}>
        Quiet Frequencies
      </Link>
      <nav className={styles.nav} aria-label="Primary">
        <ul role="list" className={styles.navList}>
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} className={styles.navLink}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
