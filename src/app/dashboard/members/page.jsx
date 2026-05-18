"use client";
import { useState, useEffect } from 'react';
import { UserPlus, Mail, Shield, MoreHorizontal } from 'lucide-react';
import api from '@/utils/api';

export default function MembersPage() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        api.get('/api/users').then(res => setUsers(res.data)).catch(console.error);
    }, []);

    return (
        <div className="h-full flex flex-col p-8 bg-gray-50/30 overflow-auto">
            <div className="mb-8 flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 font-serif tracking-tight">Thành viên nhóm</h2>
                    <p className="text-sm text-gray-500 mt-2">Quản lý những người có quyền truy cập vào Workspace này.</p>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-all flex items-center gap-2">
                    <UserPlus size={18} /> Mời thành viên
                </button>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-100 bg-gray-50/50 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    <div className="col-span-5">Thành viên</div>
                    <div className="col-span-4">Trạng thái</div>
                    <div className="col-span-2">Vai trò</div>
                    <div className="col-span-1 text-right">Tùy chọn</div>
                </div>

                <div className="divide-y divide-gray-100">
                    {users.map((user) => (
                        <div key={user.id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-gray-50 transition-colors">
                            <div className="col-span-5 flex items-center gap-3">
                                <img src={`https://ui-avatars.com/api/?name=${user.username}&background=random&color=fff`} alt="Avatar" className="w-10 h-10 rounded-full" />
                                <div>
                                    <p className="text-sm font-bold text-gray-900">{user.username}</p>
                                    <p className="text-xs text-gray-500 flex items-center gap-1"><Mail size={12}/> user_{user.id}@uth.edu.vn</p>
                                </div>
                            </div>
                            <div className="col-span-4">
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> Đang hoạt động
                                </span>
                            </div>
                            <div className="col-span-2 flex items-center gap-1.5 text-sm text-gray-600">
                                {user.id === 1 ? <Shield size={14} className="text-purple-500" /> : <UserPlus size={14} className="text-gray-400" />}
                                {user.id === 1 ? 'Quản trị viên' : 'Thành viên'}
                            </div>
                            <div className="col-span-1 text-right">
                                <button className="p-1.5 text-gray-400 hover:text-gray-900 hover:bg-gray-200 rounded-lg"><MoreHorizontal size={18} /></button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
