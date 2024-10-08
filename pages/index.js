import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Layout from './components/layout';

export default function Home() {
  return (
    <Layout>
    <div className={styles.container}>
      <Head>
        <title>Vivaan Wadhwa</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.title}>
          Coming Soon
        </h1>
        <p className={styles.description}>
          Hello! I am Vivaan Wadhwa and I am a Full Stack Developer. <br></br>
          I am currently learning NextJS and working on this website. <br></br>
          Stay tuned! <br></br>
        </p>

        <div className={styles.buttons}>
        <button className={styles.button}>
          <a
            href="mailto:wadhwa.vivaan@outlook.com"
            rel="noopener noreferrer"
          >
            Contact Me
          </a>
        </button>
        <button className={styles.button}>
          <a
            href="https://docs.google.com/document/d/1_DbUIvTxeV5M0zyUaWcx3xpH45KqBjeqZry3_2pFU9M/edit?usp=sharing"
            rel="noopener noreferrer"
          >
            Resume
          </a>
        </button>
        </div>
                
      </main>

      <footer className={styles.footer}>
        <a href="https://linkedin.com/in/vivaanwadhwa" rel="noopener noreferrer">
          Created by Vivaan Wadhwa{' '}
          <img src="/star.svg" alt="Star" className={styles.logo} />
        </a>
    </footer>


      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family:
            Menlo,
            Monaco,
            Lucida Console,
            Liberation Mono,
            DejaVu Sans Mono,
            Bitstream Vera Sans Mono,
            Courier New,
            monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family:
            -apple-system,
            BlinkMacSystemFont,
            Segoe UI,
            Roboto,
            Oxygen,
            Ubuntu,
            Cantarell,
            Fira Sans,
            Droid Sans,
            Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
    </Layout>
  );
}
