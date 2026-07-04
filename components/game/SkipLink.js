import Link from 'next/link';
import styles from '../../styles/Game.module.css';

export default function SkipLink() {
  return (
    <Link href="/resume" className={styles.skipLink}>
      Go to my website
    </Link>
  );
}
