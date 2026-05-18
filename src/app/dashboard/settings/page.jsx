"use client";
import { User, Bell, Lock, Monitor, Laptop } from 'lucide-react';

export default function SettingsPage() {
    return (
        <div className="h-full flex p-8 bg-gray-50/30 overflow-hidden gap-8">
            {/* Sidebar Cài đặt */}
            <div className="w-64 flex-shrink-0">
                <h2 className="text-2xl font-bold text-gray-900 font-serif mb-6">Cài đặt</h2>
                <nav className="space-y-1">
                    <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium bg-white text-blue-700 shadow-sm border border-gray-200 rounded-lg"><User size={16} /> Hồ sơ cá nhân</button>
                    <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200/50 rounded-lg"><Bell size={16} /> Thông báo</button>
                    <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200/50 rounded-lg"><Lock size={16} /> Bảo mật</button>
                    <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200/50 rounded-lg"><Monitor size={16} /> Giao diện</button>
                </nav>
            </div>

            {/* Nội dung Cài đặt */}
            <div className="flex-1 bg-white rounded-2xl border border-gray-200 shadow-sm p-8 overflow-y-auto">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Hồ sơ cá nhân</h3>
                
                <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-100">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center border-4 border-white shadow-lg overflow-hidden">
                        <User size={40} className="text-gray-400" />
                    </div>
                    <div>
                        <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-bold rounded-lg shadow-sm hover:bg-gray-50">Tải ảnh lên</button>
                        <p className="text-xs text-gray-500 mt-2">Định dạng JPG, PNG. Tối đa 2MB.</p>
                    </div>
                </div>

                <div className="max-w-md space-y-5">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Tên hiển thị</label>
                        <input type="text" defaultValue="Người dùng UTH" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Email liên hệ</label>
                        <input type="email" defaultValue="student@uth.edu.vn" disabled className="w-full bg-gray-100 border border-gray-200 text-gray-400 rounded-lg px-4 py-2 text-sm cursor-not-allowed" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Giới thiệu ngắn</label>
                        <textarea rows={3} placeholder="Viết vài dòng về bạn..." className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none resize-none"></textarea>
                    </div>
                    <button className="mt-4 px-6 py-2 bg-black text-white text-sm font-bold rounded-lg shadow-lg hover:bg-neutral-800 transition-all">Lưu thay đổi</button>
                </div>
            </div>
        </div>
    );
}
