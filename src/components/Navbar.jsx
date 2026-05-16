'use client';

import React from 'react';
import styles from './Navbar.module.css';

const Navbar = ({ title = 'Task Manager' }) => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.logo}>{title}</div>
        <div className={styles.menu}>
          {/* Thêm menu items theo nhu cầu */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
