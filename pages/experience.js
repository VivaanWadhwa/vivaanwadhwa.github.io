import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Layout from './components/layout';
import Nav from './components/Nav';

export default function Experience() {
  return (
    <Layout>
      <Head>
        <title>Experience · Vivaan Wadhwa</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />

      <div className={styles.container}>

        <section className={styles.section} style={{ paddingTop: '3rem' }}>
          <h2 className={styles.sectionTitle}>Experience</h2>
          <div className={styles.timeline}>

            <div className={styles.timelineItem}>
              <div className={styles.timelineMeta}>
                <span className={styles.timelineDate}>Sept 2025 – Present</span>
              </div>
              <div className={styles.timelineContent}>
                <h3 className={styles.jobTitle}>Firmware Developer</h3>
                <h4 className={styles.jobCompany}>Astera Labs · Vancouver, BC</h4>
                <ul className={styles.jobList}>
                  <li>Developed and maintained the Cosmos unified SDK in C/C++ supporting Aries Retimer, Scorpio Fabric Switch, and Taurus Ethernet Adapter, reducing code duplication by ~35%.</li>
                  <li>Implemented UALINK SAI APIs during pre-silicon development using Google Mock (GMock) to simulate hardware behavior and enable early software validation.</li>
                  <li>Contributed to AST2700 BMC board bring-up, building and debugging Yocto-based OpenBMC images and validating console, I2C, and GPIO services.</li>
                  <li>Migrated legacy regression infrastructure to Pytest, creating 20+ automated test cases and integrating with Jenkins CI pipelines.</li>
                </ul>
              </div>
            </div>

            <div className={styles.timelineItem}>
              <div className={styles.timelineMeta}>
                <span className={styles.timelineDate}>Jan 2025 – Aug 2025</span>
              </div>
              <div className={styles.timelineContent}>
                <h3 className={styles.jobTitle}>Embedded System Validation Engineer</h3>
                <h4 className={styles.jobCompany}>Avigilon – Motorola Solutions · Vancouver, BC</h4>
                <ul className={styles.jobList}>
                  <li>Developed system-level tests using Python and Pytest, increasing firmware validation coverage across multiple IP camera platforms by 20%.</li>
                  <li>Built automated tests using SNMP, Linux tc, and shell scripting to simulate real-world network failures, uncovering critical streaming issues.</li>
                  <li>Engineered a metrics dashboard using MariaDB and Grafana to monitor 10,000+ test cases, accelerating regression identification.</li>
                  <li>Built a Python-based network switch emulator reducing manual test effort by 60%.</li>
                  <li>Integrated Mistral 7B Instruct into the test framework to autonomously evaluate stream health and improve log triage speed.</li>
                </ul>
              </div>
            </div>

            <div className={styles.timelineItem}>
              <div className={styles.timelineMeta}>
                <span className={styles.timelineDate}>Apr 2024 – Dec 2024</span>
              </div>
              <div className={styles.timelineContent}>
                <h3 className={styles.jobTitle}>Data Engineer</h3>
                <h4 className={styles.jobCompany}>UBC Campus &amp; Community Planning · Vancouver, BC</h4>
                <ul className={styles.jobList}>
                  <li>Developed an application automating 70% of work processes using Electron, Python, Pandas, and PyQt5.</li>
                  <li>Built ETL pipelines with Python for efficient data flow and real-time processing.</li>
                  <li>Designed interactive Tableau dashboards tracking KPIs, improving decision-making speed by 25%.</li>
                </ul>
              </div>
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
