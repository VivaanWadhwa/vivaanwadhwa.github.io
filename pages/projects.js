import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Layout from './components/layout';
import Nav from './components/Nav';

export default function Projects() {
  return (
    <Layout>
      <Head>
        <title>Projects · Vivaan Wadhwa</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />

      <div className={styles.container}>

        <section className={styles.section} style={{ paddingTop: '3rem' }}>
          <h2 className={styles.sectionTitle}>Projects</h2>
          <div className={styles.projectsGrid}>

            <div className={styles.projectCard}>
              <h3 className={styles.projectTitle}><a href="https://github.com/aryanballani/MoodFlow" target="_blank" rel="noopener noreferrer">MoodFlow</a></h3>
              <div className={styles.tags}>
                {['React', 'Express.js', 'MongoDB', 'Hugging Face', 'Google Maps API'].map(t => (
                  <span key={t} className={styles.tag}>{t}</span>
                ))}
              </div>
              <ul className={styles.jobList}>
                <li>Integrated Mistral LLM via Hugging Face API to generate personalized activity suggestions based on mood and user history.</li>
                <li>Connected WeatherAPI and Google Maps API for real-time, location-aware recommendations.</li>
                <li>Designed end-to-end flows using Express.js and MongoDB for persistent user context tracking.</li>
              </ul>
            </div>

            <div className={styles.projectCard}>
              <h3 className={styles.projectTitle}><a href="https://github.com/aryanballani/WasteNet-Mobile-App" target="_blank" rel="noopener noreferrer">Waste Net</a></h3>
              <div className={styles.tags}>
                {['React Native', 'Flask', 'AWS Bedrock', 'MongoDB'].map(t => (
                  <span key={t} className={styles.tag}>{t}</span>
                ))}
              </div>
              <ul className={styles.jobList}>
                <li>Built a cross-platform mobile app to help users reduce food waste through smart inventory tracking and suggestions.</li>
                <li>Leveraged AWS Bedrock to generate adaptive recipes using RAG, caching similar entries to reduce latency.</li>
                <li>Integrated MongoDB for structured ingredient storage with scalable backend services.</li>
              </ul>
            </div>

            <div className={styles.projectCard}>
              <h3 className={styles.projectTitle}>Coding! Teach Yourself</h3>
              <p className={styles.projectDate}>Apr 2024 – Aug 2024</p>
              <div className={styles.tags}>
                {['JavaScript', 'Express', 'Vite React', 'Mocha', 'Chai', 'Node.js', 'SQL', 'Ollama', 'Docker'].map(t => (
                  <span key={t} className={styles.tag}>{t}</span>
                ))}
              </div>
              <ul className={styles.jobList}>
                <li>Integrated Docker to containerize the application, enabling consistent deployment across environments and reducing setup time by 50%.</li>
                <li>Created over 10 API endpoints using Express, resulting in a 25% increase in data retrieval efficiency.</li>
                <li>Optimized SQL queries, reducing query execution time by 40% and minimizing server load.</li>
                <li>Utilized Mocha and Chai to implement a comprehensive testing suite, reducing post-deployment bugs.</li>
                <li>Developed reusable React components with hooks for improved modularity and scalability.</li>
              </ul>
            </div>

            <div className={styles.projectCard}>
              <h3 className={styles.projectTitle}><a href="https://github.com/jungyeul/ling242-dep2phrase" target="_blank" rel="noopener noreferrer">Dep2Phrase</a></h3>
              <p className={styles.projectDate}>Apr 2024 – Present</p>
              <div className={styles.tags}>
                {['Python', 'NLP', 'RoBERTa', 'MLP Classifiers'].map(t => (
                  <span key={t} className={styles.tag}>{t}</span>
                ))}
              </div>
              <ul className={styles.jobList}>
                <li>Implemented advanced chunking techniques on constituency and dependency structures, enhancing evaluation of syntactic correlations.</li>
                <li>Developed an algorithm for extracting generalized merging rules with Precision of 88% and Recall of 89%.</li>
                <li>Reverse-engineered binarization rules for constituency trees for more accurate syntactic parsing.</li>
                <li>Collaborated with a professor to align research objectives with practical NLP outcomes.</li>
              </ul>
            </div>

            <div className={styles.projectCard}>
              <h3 className={styles.projectTitle}><a href="https://github.com/VivaanWadhwa/Face_Recognition_py" target="_blank" rel="noopener noreferrer">Face Recognition</a></h3>
              <p className={styles.projectDate}>Jan 2022 – Apr 2022</p>
              <div className={styles.tags}>
                {['Python', 'dlib', 'OpenCV', 'face_recognition'].map(t => (
                  <span key={t} className={styles.tag}>{t}</span>
                ))}
              </div>
              <ul className={styles.jobList}>
                <li>Developed a Python-based face recognition system capable of identifying and maintaining a registry of recognized faces.</li>
                <li>Engineered and trained a CNN for facial recognition, achieving 75% deployment accuracy.</li>
              </ul>
            </div>

            <div className={styles.projectCard}>
              <h3 className={styles.projectTitle}><a href="https://github.com/kashish1928/Plant_Disease_Detector" target="_blank" rel="noopener noreferrer">Plant Whisperer</a></h3>
              <p className={styles.projectDate}>Jan 2024 – Apr 2024</p>
              <div className={styles.tags}>
                {['Python', 'Taipy', 'MongoDB', 'OpenAI'].map(t => (
                  <span key={t} className={styles.tag}>{t}</span>
                ))}
              </div>
              <ul className={styles.jobList}>
                <li>Implemented backend infrastructure for seamless MongoDB communication and efficient OpenAI API interaction, boosting response time by 30%.</li>
                <li>Optimized MongoDB queries, cutting data retrieval time by 20%.</li>
                <li>Integrated OpenAI API for advanced AI features, enhancing platform functionality.</li>
              </ul>
            </div>

            <div className={styles.projectCard}>
              <h3 className={styles.projectTitle}><a href="https://github.com/VivaanWadhwa/Card-Game" target="_blank" rel="noopener noreferrer">Turn-Based Card Game</a></h3>
              <p className={styles.projectDate}>Mar 2024 – Apr 2024</p>
              <div className={styles.tags}>
                {['Java', 'Swing', 'JUnit', 'JSON', 'Git'].map(t => (
                  <span key={t} className={styles.tag}>{t}</span>
                ))}
              </div>
              <ul className={styles.jobList}>
                <li>Engineered a fully functional GUI using Java Swing for a playable card game.</li>
                <li>Leveraged JSON for robust data handling and storage.</li>
                <li>Integrated a comprehensive JUnit testing suite and an Event Log feature tracking all gameplay changes.</li>
              </ul>
            </div>

            <div className={styles.projectCard}>
              <h3 className={styles.projectTitle}><a href="https://github.com/VivaanWadhwa/Airbnb-Price-Predictor" target="_blank" rel="noopener noreferrer">Airbnb Price Prediction</a></h3>
              <p className={styles.projectDate}>Jan 2024 – Feb 2024</p>
              <div className={styles.tags}>
                {['Python', 'Pandas', 'NumPy', 'scikit-learn', 'LightGBM', 'SHAP', 'Tableau'].map(t => (
                  <span key={t} className={styles.tag}>{t}</span>
                ))}
              </div>
              <ul className={styles.jobList}>
                <li>Leveraged a Kaggle Airbnb dataset of 20,000+ observations for predictive modeling.</li>
                <li>Built an interactive Tableau dashboard for EDA using scatterplots and correlation heatmaps.</li>
                <li>Deployed a LightGBM model with hyperparameter tuning; used SHAP values to interpret feature importance.</li>
              </ul>
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
