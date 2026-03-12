import Link from 'next/link';
import styles from '../../styles/Home.module.css';

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <Link href="/">
        <img src="/badge_vivaan_wadhwa.jpg" alt="Vivaan Wadhwa" className={styles.navName} />
      </Link>
      <div className={styles.navLinks}>
        <Link href="/about">About</Link>
        <Link href="/experience">Experience</Link>
        <Link href="/projects">Projects</Link>
        <a href="mailto:wadhwa.vivaan@outlook.com">Contact</a>
      </div>
    </nav>
  );
}
