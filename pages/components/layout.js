// components/Layout.js
import { useState, useEffect, useRef } from 'react';
import styles from '../../styles/Layout.module.css';
import Stars from './stars.js'; // Import the Stars component

const Layout = ({ children }) => {

  return (
    <div
      className={styles.background}
    >
      <Stars /> {/* Include the Stars component */}
      {children}
    </div>
  );
};

export default Layout;
