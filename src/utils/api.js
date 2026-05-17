import axios from 'axios';

// Tạo một instance của axios trỏ thẳng đến Backend
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL, 
    headers: {
        'Content-Type': 'application/json',
    },
});

// Trạm kiểm soát: Trước khi Frontend gửi request đi, tự động nhét Token vào
api.interceptors.request.use(
    (config) => {
        // Chỉ chạy trên trình duyệt (client-side)
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('accessToken');
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
