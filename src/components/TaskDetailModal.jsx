"use client";
import { useState, useEffect } from 'react';
import { X, Clock, Tag, AlignLeft, CheckSquare, Activity, CalendarDays, Share2, Check } from 'lucide-react';
import api from '@/utils/api';
import ChecklistSection from './ChecklistSection';
import CommentSection from './CommentSection';

export default function TaskDetailModal({ isOpen, onClose, task, onTaskUpdated }) {
    const [users, setUsers] = useState([]);
    const [editData, setEditData] = useState({});
    const [isCopied, setIsCopied] = useState(false);

    useEffect(() => {
        if (isOpen) {
            api.get('/api/users').then(res => setUsers(res.data)).catch(console.error);
            setEditData({
                title: task.title,
                description: task.description || '',
                status: task.status,
                priority: task.priority,
                assigneeUsername: task.assigneeUsername || '',
                startDate: task.startDate ? task.startDate.split('T')[0] : '',
                dueDate: task.dueDate ? task.dueDate.split('T')[0] : ''
            });
        }
    }, [isOpen, task]);

    if (!isOpen || !task) return null;

    const handleShare = async () => {
        const taskLink = `${window.location.origin}/dashboard?taskId=${task.id}`;
        try {
            await navigator.clipboard.writeText(taskLink);
            setIsCopied(true);
            setTimeout(() => {
                setIsCopied(false);
            }, 2000);
        } catch (err) {
            alert("Lỗi không thể copy link!");
        }
    };

    const handleSaveField = async (field, value) => {
        try {
            let finalValue = value;
            if (field === 'startDate' && value) finalValue = `${value}T00:00:00`;
            if (field === 'dueDate' && value) finalValue = `${value}T23:59:59`;
            if (field === 'assigneeUsername' && value === '') finalValue = null;

            await api.put(`/api/tasks/${task.id}`, { [field]: finalValue });
            onTaskUpdated();
        } catch (error) {
            alert("Lỗi lưu dữ liệu: " + (error.response?.data?.error || error.message));
            setEditData(prev => ({...prev, [field]: task[field]}));
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
            
            <div className="relative bg-white w-full max-w-5xl h-[85vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                    <span className="text-sm font-semibold text-gray-500 tracking-wider">TSK-{task.id}</span>
                    
                    <div className="flex items-center gap-2">
                        <button 
                            onClick={handleShare}
                            className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-300 ${
                                isCopied 
                                ? 'bg-green-100 text-green-700' 
                                : 'text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            {isCopied ? <Check size={16} /> : <Share2 size={16} />}
                            {isCopied ? 'Đã chép link' : 'Chia sẻ'}
                        </button>
                        
                        <button onClick={onClose} className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-200 rounded-md transition-colors"><X size={20}/></button>
                    </div>
                </div>

                <div className="flex-1 flex overflow-hidden">
                    {/* CỘT TRÁI: Nội dung chính */}
                    <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
                        
                        {/* Tiêu đề (Sửa trực tiếp) */}
                        <input 
                            type="text"
                            value={editData.title}
                            onChange={(e) => setEditData({...editData, title: e.target.value})}
                            onBlur={(e) => handleSaveField('title', e.target.value)}
                            className="w-full text-3xl font-bold text-gray-900 mb-6 font-serif border-transparent hover:border-gray-300 focus:border-blue-500 rounded-lg p-2 -ml-2 focus:ring-0 transition-colors"
                            placeholder="Nhập tiêu đề..."
                        />
                        
                        {/* Mô tả (Sửa trực tiếp) */}
                        <div className="mb-10">
                            <div className="flex items-center gap-2 mb-3 text-gray-700 font-semibold">
                                <AlignLeft size={20} /> <h3>Mô tả chi tiết</h3>
                            </div>
                            <textarea
                                value={editData.description}
                                onChange={(e) => setEditData({...editData, description: e.target.value})}
                                onBlur={(e) => handleSaveField('description', e.target.value)}
                                placeholder="Thêm mô tả chi tiết cho công việc này..."
                                className="w-full bg-gray-50/50 p-4 rounded-xl min-h-[120px] text-gray-700 text-sm border border-gray-200 hover:border-gray-300 focus:bg-white focus:border-blue-500 focus:ring-0 resize-y transition-colors"
                            />
                        </div>

                        <ChecklistSection task={task} onUpdate={onTaskUpdated} />
                        <CommentSection task={task} onUpdate={onTaskUpdated} />
                    </div>

                    {/* CỘT PHẢI: Metadata Tương tác được */}
                    <div className="w-80 bg-gray-50/50 border-l border-gray-100 p-6 overflow-y-auto">
                        
                        {/* Trạng thái (Tự động đổi màu) */}
                        <div className="mb-6">
                            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2 block">Trạng thái</label>
                            <select 
                                className={`w-full border-none rounded-lg py-2.5 px-3 text-sm font-bold shadow-sm focus:ring-2 focus:ring-gray-300 outline-none transition-colors appearance-none cursor-pointer
                                    ${editData.status === 'TODO' ? 'bg-[#E3E2E0]/50 text-[#37352F]' : 
                                      editData.status === 'IN_PROGRESS' ? 'bg-[#D3E5EF] text-[#183347]' : 
                                      editData.status === 'REVIEW' ? 'bg-[#FADEC9] text-[#49290E]' : 
                                      'bg-[#DBEDDB] text-[#1C3829]'}`}
                                value={editData.status}
                                onChange={(e) => {
                                    setEditData({...editData, status: e.target.value});
                                    handleSaveField('status', e.target.value);
                                }}
                            >
                                <option value="TODO">Cần làm</option>
                                <option value="IN_PROGRESS">Đang tiến hành</option>
                                <option value="REVIEW">Đang đánh giá</option>
                                <option value="DONE">Hoàn thành</option>
                            </select>
                        </div>

                        <div className="space-y-6">
                            {/* Người nhận việc */}
                            <div>
                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">Người thực hiện</label>
                                <select 
                                    className="w-full bg-white border border-gray-200 rounded-lg py-2 px-3 text-sm font-semibold text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-500"
                                    value={editData.assigneeUsername}
                                    onChange={(e) => {
                                        setEditData({...editData, assigneeUsername: e.target.value});
                                        handleSaveField('assigneeUsername', e.target.value);
                                    }}
                                >
                                    <option value="">Chưa giao cho ai</option>
                                    {users.map(u => (
                                        <option key={u.id} value={u.username}>{u.username}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Độ ưu tiên (Tự động đổi màu) */}
                            <div>
                                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2 block">Độ ưu tiên</label>
                                <select 
                                    className={`w-full border-none rounded-lg py-2.5 px-3 text-sm font-bold shadow-sm focus:ring-2 focus:ring-gray-300 outline-none transition-colors appearance-none cursor-pointer
                                        ${editData.priority === 'LOW' ? 'bg-[#E3E2E0]/50 text-[#37352F]' : 
                                          editData.priority === 'MEDIUM' ? 'bg-[#FDECC8] text-[#402C1B]' : 
                                          editData.priority === 'HIGH' ? 'bg-[#FADEC9] text-[#49290E]' : 
                                          'bg-[#FFE2DD] text-[#5C1A14]'}`}
                                    value={editData.priority}
                                    onChange={(e) => {
                                        setEditData({...editData, priority: e.target.value});
                                        handleSaveField('priority', e.target.value);
                                    }}
                                >
                                    <option value="LOW">Thấp</option>
                                    <option value="MEDIUM">Trung bình</option>
                                    <option value="HIGH">Cao</option>
                                    <option value="URGENT">Khẩn cấp</option>
                                </select>
                            </div>

                            {/* THỜI GIAN BẮT ĐẦU VÀ KẾT THÚC */}
                            <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                                <div className="mb-3">
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-1"><CalendarDays size={12}/> Bắt đầu</label>
                                    <input 
                                        type="date"
                                        className="w-full text-sm border-none bg-gray-50 p-1.5 rounded focus:ring-0"
                                        value={editData.startDate}
                                        onChange={(e) => {
                                            setEditData({...editData, startDate: e.target.value});
                                            handleSaveField('startDate', e.target.value);
                                        }}
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-1"><Clock size={12}/> Hạn chót (Due)</label>
                                    <input 
                                        type="date"
                                        className="w-full text-sm border-none bg-gray-50 p-1.5 rounded focus:ring-0 text-red-600 font-medium"
                                        value={editData.dueDate}
                                        onChange={(e) => {
                                            setEditData({...editData, dueDate: e.target.value});
                                            handleSaveField('dueDate', e.target.value);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Lịch sử hoạt động */}
                        <div className="mt-8 border-t border-gray-200 pt-6">
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2"><Activity size={14}/> Hoạt động</label>
                            <div className="space-y-3">
                                {task.activityLogs?.slice().reverse().slice(0, 5).map(log => (
                                    <div key={log.id} className="text-xs text-gray-500">
                                        <span className="font-semibold text-gray-700">{log.userUsername}</span> {log.actionDescription}
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
