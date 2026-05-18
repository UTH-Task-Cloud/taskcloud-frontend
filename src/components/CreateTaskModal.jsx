"use client";
import { useState } from 'react';
import { X, AlignLeft, Calendar, BarChart2, Tag } from 'lucide-react';
import api from '@/utils/api';

export default function CreateTaskModal({ isOpen, onClose, onTaskCreated }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        priority: 'MEDIUM',
        status: 'TODO',
        dueDate: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            // 1. Clone dữ liệu ra để "chế biến" trước khi gửi
            const payload = { ...formData };
            
            // 2. Kỹ thuật fix lỗi LocalDateTime của Spring Boot
            // Nếu có chọn hạn chót, tự động nối thêm giờ phút giây vào cuối ngày
            if (payload.dueDate) {
                payload.dueDate = `${payload.dueDate}T23:59:59`;
            } else {
                payload.dueDate = null;
            }

            // 3. Gửi payload đã xử lý xuống Backend
            await api.post('/api/tasks', payload);
            
            onTaskCreated(); // Gọi hàm để load lại bảng
            onClose(); // Đóng modal
            // Reset form
            setFormData({ title: '', description: '', priority: 'MEDIUM', status: 'TODO', dueDate: '' });
            
        } catch (error) {
            // In lỗi rõ ràng ra từ Backend (nếu có)
            const errorMsg = error.response?.data?.error || error.response?.data?.message || error.message;
            alert("Lỗi từ Backend: " + errorMsg);
            console.error("Chi tiết dữ liệu lỗi:", error.response?.data);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
            
            <div className="relative bg-white w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden transform transition-all animate-in fade-in zoom-in duration-300">
                <div className="flex items-center justify-between p-4 border-b border-gray-100">
                    <h3 className="text-lg font-bold font-serif text-gray-900">Tạo công việc mới</h3>
                    <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors"><X size={20}/></button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    <input 
                        type="text" 
                        required
                        placeholder="Tiêu đề công việc..."
                        className="w-full text-2xl font-bold placeholder:text-gray-300 border-none focus:ring-0 p-0 text-gray-900"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 text-sm">
                            <BarChart2 size={16} className="text-gray-400" />
                            <span className="text-gray-500 w-24">Độ ưu tiên</span>
                            <select 
                                className="bg-gray-50 border-none rounded-md py-1 px-2 text-xs font-bold focus:ring-1 focus:ring-gray-300"
                                value={formData.priority}
                                onChange={(e) => setFormData({...formData, priority: e.target.value})}
                            >
                                <option value="LOW">THẤP</option>
                                <option value="MEDIUM">TRUNG BÌNH</option>
                                <option value="HIGH">CAO</option>
                                <option value="URGENT">KHẨN CẤP</option>
                            </select>
                        </div>

                        <div className="flex items-center gap-3 text-sm">
                            <Calendar size={16} className="text-gray-400" />
                            <span className="text-gray-500 w-24">Hạn chót</span>
                            <input 
                                type="date"
                                className="bg-gray-50 border-none rounded-md py-1 px-2 text-xs focus:ring-1 focus:ring-gray-300"
                                value={formData.dueDate}
                                onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                            <AlignLeft size={16} />
                            <span>Mô tả chi tiết</span>
                        </div>
                        <textarea 
                            placeholder="Thêm mô tả chi tiết cho công việc này..."
                            className="w-full min-h-[150px] bg-gray-50 border-none rounded-xl p-4 text-sm focus:ring-1 focus:ring-gray-300 resize-none"
                            value={formData.description}
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">Hủy bỏ</button>
                        <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="px-6 py-2 bg-black hover:bg-neutral-800 text-white text-sm font-bold rounded-lg shadow-lg disabled:opacity-50 transition-all transform active:scale-95"
                        >
                            {isSubmitting ? 'Đang tạo...' : 'Tạo công việc'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
