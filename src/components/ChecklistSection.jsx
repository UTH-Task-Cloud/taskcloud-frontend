"use client";
import { useState } from 'react';
import { CheckSquare, Plus, Trash2 } from 'lucide-react';
import api from '@/utils/api';

export default function ChecklistSection({ task, onUpdate }) {
    const [newItemContent, setNewItemContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const checklist = task.checklist || [];
    const totalItems = checklist.length;
    const completedItems = checklist.filter(item => item.completed).length;
    const progressPercent = totalItems === 0 ? 0 : Math.round((completedItems / totalItems) * 100);

    const handleAddItem = async (e) => {
        e.preventDefault();
        if (!newItemContent.trim()) return;
        setIsLoading(true);
        try {
            await api.post(`/api/tasks/${task.id}/checklist`, { content: newItemContent });
            setNewItemContent('');
            onUpdate();
        } catch (error) {
            console.error("Lỗi thêm việc con:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleToggleItem = async (itemId) => {
        try {
            await api.put(`/api/tasks/${task.id}/checklist/${itemId}`);
            onUpdate();
        } catch (error) {
            console.error("Lỗi cập nhật việc con:", error);
        }
    };

    const handleDeleteItem = async (itemId) => {
        try {
            await api.delete(`/api/tasks/${task.id}/checklist/${itemId}`);
            onUpdate();
        } catch (error) {
            console.error("Lỗi xóa việc con:", error);
        }
    };

    return (
        <div className="mb-10">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-gray-700 font-semibold">
                    <CheckSquare size={20} />
                    <h3>Các việc cần làm (Sub-tasks)</h3>
                </div>
                <span className="text-sm font-medium text-gray-500">{progressPercent}%</span>
            </div>

            <div className="w-full h-2.5 bg-gray-200 rounded-full mb-5 overflow-hidden">
                <div 
                    className={`h-full transition-all duration-500 ease-out rounded-full ${progressPercent === 100 ? 'bg-green-500' : 'bg-blue-500'}`}
                    style={{ width: `${progressPercent}%` }}
                ></div>
            </div>

            <div className="space-y-2 mb-4">
                {checklist.map((item) => (
                    <div key={item.id} className="flex items-start gap-3 group p-2 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-100">
                        <input 
                            type="checkbox" 
                            checked={item.completed}
                            onChange={() => handleToggleItem(item.id)}
                            className="mt-1 w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
                        />
                        <span className={`flex-1 text-sm ${item.completed ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                            {item.content}
                        </span>
                        <button 
                            onClick={() => handleDeleteItem(item.id)}
                            className="opacity-0 group-hover:opacity-100 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-all"
                            title="Xóa việc này"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                ))}
            </div>

            <form onSubmit={handleAddItem} className="flex items-center gap-2">
                <input 
                    type="text" 
                    placeholder="Thêm một việc cần làm..."
                    className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    value={newItemContent}
                    onChange={(e) => setNewItemContent(e.target.value)}
                    disabled={isLoading}
                />
                <button 
                    type="submit" 
                    disabled={!newItemContent.trim() || isLoading}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2.5 rounded-lg transition-colors disabled:opacity-50"
                >
                    <Plus size={18} />
                </button>
            </form>
        </div>
    );
}
