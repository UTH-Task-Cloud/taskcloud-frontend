'use client';

import React from 'react';
import styles from './Sidebar.module.css';

const Sidebar = ({ isOpen = true }) => {
  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
      <div className={styles.content}>
        {/* Thêm sidebar content theo nhu cầu */}
      </div>
    </aside>
  );
};

export default Sidebar;
