import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Layout from './components/layout';
import Nav from './components/Nav';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Vivaan Wadhwa</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />

      <div className={styles.container}>

        <section className={styles.hero}>
          <p className={styles.heroGreeting}>Hi, I&apos;m</p>
          <h1 className={styles.heroName}>Vivaan Wadhwa</h1>
          <h2 className={styles.heroTitle}>Firmware Developer &amp; CS Student</h2>
          <p className={styles.heroSub}>
            4th year Computer Science &amp; Statistics at UBC · Building embedded systems, firmware, and full-stack applications.
          </p>
          <div className={styles.heroLinks}>
            <a href="mailto:wadhwa.vivaan@outlook.com" className={styles.heroIconBtn} aria-label="Contact Me">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
            </a>
            <a href="https://github.com/VivaanWadhwa" target="_blank" rel="noopener noreferrer" className={styles.heroIconBtn} aria-label="GitHub">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
            </a>
            <a href="https://linkedin.com/in/vivaanwadhwa" target="_blank" rel="noopener noreferrer" className={styles.heroIconBtn} aria-label="LinkedIn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </section>

        <section id="skills" className={styles.section}>
          <h2 className={styles.sectionTitle}>Skills</h2>
          <div className={styles.skillsGrid}>
            <div className={styles.skillGroup}>
              <h3 className={styles.skillGroupTitle}>Languages</h3>
              <div className={styles.tags}>
                {['C', 'C++', 'Python', 'Bash'].map(s => (
                  <span key={s} className={styles.tag}>{s}</span>
                ))}
              </div>
            </div>
            <div className={styles.skillGroup}>
              <h3 className={styles.skillGroupTitle}>Testing &amp; Automation</h3>
              <div className={styles.tags}>
                {['Pytest', 'Google Test', 'GMock', 'Jenkins CI/CD'].map(s => (
                  <span key={s} className={styles.tag}>{s}</span>
                ))}
              </div>
            </div>
            <div className={styles.skillGroup}>
              <h3 className={styles.skillGroupTitle}>Systems</h3>
              <div className={styles.tags}>
                {['Linux', 'Ubuntu', 'RHEL', 'Yocto / OpenBMC', 'I2C', 'GPIO'].map(s => (
                  <span key={s} className={styles.tag}>{s}</span>
                ))}
              </div>
            </div>
          </div>
        </section>


        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Education</h2>
          <div className={styles.educationCard}>
            <h3 className={styles.eduSchool}>University of British Columbia</h3>
            <p className={styles.eduDegree}>BSc, Computer Science &amp; Statistics · Vancouver, BC</p>
            <p className={styles.eduDate}>September 2021 – May 2027</p>
            <p className={styles.eduCourses}>
              Algorithms &amp; Data Structures · Applied Machine Learning · Computer Hardware &amp; Operating Systems · Software Engineering
            </p>
          </div>
        </section>

        <footer className={styles.footer}>
          <p>Vivaan Wadhwa &nbsp;·&nbsp; <a href="mailto:wadhwa.vivaan@outlook.com">wadhwa.vivaan@outlook.com</a></p>
        </footer>

      </div>
    </Layout>
  );
}
