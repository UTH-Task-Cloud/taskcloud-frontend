'use client';

import React from 'react';
import styles from './TaskCard.module.css';

const TaskCard = ({ task, onEdit, onDelete }) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3>{task.title}</h3>
        <span className={`${styles.status} ${styles[task.status]}`}>
          {task.status}
        </span>
      </div>
      <p className={styles.description}>{task.description}</p>
      <div className={styles.footer}>
        <span className={styles.date}>{new Date(task.createdAt).toLocaleDateString()}</span>
        <div className={styles.actions}>
          <button onClick={() => onEdit(task.id)} className={styles.editBtn}>
            Edit
          </button>
          <button onClick={() => onDelete(task.id)} className={styles.deleteBtn}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
