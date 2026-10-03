import styles from './FaqItem.module.css';

interface FaqItemProps {
  question: string;
  answer: string;
}

export default function FaqItem({ question, answer }: FaqItemProps) {
  return (
    <details className={styles.item} open>
      <summary className={styles.question}>{question}</summary>
      <p className={styles.answer}>{answer}</p>
    </details>
  );
}
