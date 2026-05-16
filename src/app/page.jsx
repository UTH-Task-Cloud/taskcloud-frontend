'use client';

import React, { useEffect } from 'react';
import { useTask } from '@/hooks/useTask';
import TaskCard from '@/components/TaskCard';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import Button from '@/components/Button';
import styles from './page.module.css';

export default function Dashboard() {
  const { tasks, loading, error, fetchTasks, deleteTask } = useTask();
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleEdit = (taskId) => {
    // Hướng dẫn: Điều hướng đến trang edit task
    console.log('Edit task:', taskId);
  };

  const handleDelete = async (taskId) => {
    if (confirm('Bạn có chắc chắn muốn xóa task này?')) {
      await deleteTask(taskId);
    }
  };

  return (
    <div className={styles.container}>
      <Navbar title="Task Manager" />
      <div className={styles.main}>
        <Sidebar isOpen={sidebarOpen} />
        <div className={styles.content}>
          <div className={styles.header}>
            <h1>Dashboard</h1>
            <Button variant="primary">New Task</Button>
          </div>

          {loading && <p>Đang tải...</p>}
          {error && <p className={styles.error}>Lỗi: {error}</p>}

          <div className={styles.taskGrid}>
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
