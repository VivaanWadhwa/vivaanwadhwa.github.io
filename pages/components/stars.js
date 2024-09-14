// components/stars.js
import { useEffect } from 'react';
import styles from '../../styles/Stars.module.css';

const generateStars = () => {
  const container = document.querySelector(`.${styles.starsContainer}`);
  const numberOfStars = 100; // Adjust the number of stars as needed

  for (let i = 0; i < numberOfStars; i++) {
    const star = document.createElement('div');
    star.className = styles.star;

    // Random size
    const size = Math.random() * 3 + 1; // Size between 1px and 4px
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;

    // Random initial position
    star.style.top = `${Math.random() * 100}vh`;
    star.style.left = `${Math.random() * 100}vw`;

    // Add to container
    container.appendChild(star);

    // Random animation
    const duration = Math.random() * 5 + 5; // Duration between 5s and 10s
    const keyframes = `
      @keyframes move${i} {
        from {
          transform: translate(0, 0);
        }
        to {
          transform: translate(${Math.random() * 100}vw, ${Math.random() * 100}vh);
        }
      }
    `;

    const styleSheet = document.styleSheets[0];
    styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

    star.style.animation = `move${i} ${duration}s linear infinite`;
  }
};

const Stars = () => {
  useEffect(() => {
    generateStars();
  }, []);

  return <div className={styles.starsContainer} />;
};

export default Stars;
