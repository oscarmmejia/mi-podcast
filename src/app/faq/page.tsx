import type { Metadata } from 'next';
import FaqItem from '@/components/FaqItem';
import { show } from '@/data/show';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    'Answers about the Quiet Frequencies podcast: schedule, where to listen, transcripts, and how to suggest a guest.',
  alternates: { canonical: '/faq' },
};

export default function FaqPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Frequently asked questions</h1>
        <p className={styles.intro}>
          Everything listeners usually ask — answers are right here, no clicking
          around.
        </p>
      </header>
      <div className={styles.list}>
        {show.faq.map(({ question, answer }) => (
          <FaqItem key={question} question={question} answer={answer} />
        ))}
      </div>
    </div>
  );
}
