// Các API endpoints cho Tasks
import apiClient from './apiClient';

export const taskService = {
  // Lấy danh sách tất cả tasks
  getTasks: async () => {
    try {
      const response = await apiClient.get('/api/tasks');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Lấy task theo ID
  getTaskById: async (id) => {
    try {
      const response = await apiClient.get(`/api/tasks/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Tạo task mới
  createTask: async (taskData) => {
    try {
      const response = await apiClient.post('/api/tasks', taskData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Cập nhật task
  updateTask: async (id, taskData) => {
    try {
      const response = await apiClient.put(`/api/tasks/${id}`, taskData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Xóa task
  deleteTask: async (id) => {
    try {
      await apiClient.delete(`/api/tasks/${id}`);
    } catch (error) {
      throw error;
    }
  },
};

// Các API endpoints cho Authentication
export const authService = {
  // Đăng nhập
  login: async (credentials) => {
    try {
      const response = await apiClient.post('/api/auth/login', credentials);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Đăng xuất
  logout: () => {
    localStorage.removeItem('token');
  },

  // Đăng ký
  register: async (userData) => {
    try {
      const response = await apiClient.post('/api/auth/register', userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
