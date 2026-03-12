import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Layout from './components/layout';
import Nav from './components/Nav';

export default function About() {
  return (
    <Layout>
      <Head>
        <title>About · Vivaan Wadhwa</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />

      <div className={styles.container}>

        <section className={styles.section} style={{ paddingTop: '3rem' }}>
          <h2 className={styles.sectionTitle}>About Me</h2>

          <div className={styles.aboutGrid}>
            <div className={styles.aboutText}>
              <p>
                I&apos;m Vivaan, a 4th year Computer Science &amp; Statistics student at the University of British Columbia,
                currently working as a Firmware Developer at Astera Labs in Vancouver.
              </p>
              <p>
                I started in data engineering but found my passion in the space where software meets hardware —
                writing firmware, bringing up embedded boards, and building the low-level systems that make
                modern infrastructure work.
              </p>
              <p>
                Outside of work I enjoy playing Video Games(Currently on my Minecraft Hardcore Grind),
                flying my drone(DJI Mini 4k), exploring cafés, and making food!
              </p>
              <p>
                I&apos;m always open to interesting conversations, collaborations, or just connecting with people
                who are building cool things.
              </p>
            </div>

          </div>
        </section>

        <footer className={styles.footer}>
          <p>Vivaan Wadhwa &nbsp;·&nbsp; <a href="mailto:wadhwa.vivaan@outlook.com">wadhwa.vivaan@outlook.com</a></p>
        </footer>

      </div>
    </Layout>
  );
}
