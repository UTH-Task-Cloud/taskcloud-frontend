"use client";
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Logo from '@/components/Logo';
import { KanbanSquare, Users, Settings, LogOut, Bell, Search, Menu } from 'lucide-react';

export default function DashboardLayout({ children }) {
    const router = useRouter();
    const pathname = usePathname();
    const [username, setUsername] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        const user = localStorage.getItem('username');
        if (!token) {
            router.push('/login');
        } else {
            setUsername(user);
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('username');
        router.push('/login');
    };

    return (
        <div className="flex h-screen bg-[#FFFFFF] text-[#37352F] font-sans overflow-hidden">
            
            {/* SIDEBAR */}
            <aside className={`${isSidebarOpen ? 'w-64' : 'w-0 -translate-x-full'} transition-all duration-300 ease-in-out bg-[#F7F6F3] border-r border-[#E1DFDD] flex flex-col h-full flex-shrink-0 relative group`}>
                {/* Workspace Profile */}
                <div className="p-4 flex items-center gap-3 hover:bg-[#E1DFDD]/50 cursor-pointer transition-colors m-2 rounded-lg">
                    <Logo />
                    <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-semibold truncate">Workspace của {username}</p>
                        <p className="text-xs text-[#787774] truncate">Gói Sinh viên UTH</p>
                    </div>
                </div>

                {/* Navigation Menu */}
                <nav className="flex-1 px-3 space-y-1 mt-6">
                    <Link href="/dashboard" className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${pathname === '/dashboard' ? 'bg-[#E1DFDD]/70 text-[#37352F]' : 'text-[#787774] hover:bg-[#E1DFDD]/40 hover:text-[#37352F]'}`}>
                        <KanbanSquare size={18} className={pathname === '/dashboard' ? "text-[#37352F]" : ""} />
                        Bảng công việc
                    </Link>
                    <Link href="/dashboard/members" className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${pathname === '/dashboard/members' ? 'bg-[#E1DFDD]/70 text-[#37352F]' : 'text-[#787774] hover:bg-[#E1DFDD]/40 hover:text-[#37352F]'}`}>
                        <Users size={18} className={pathname === '/dashboard/members' ? "text-[#37352F]" : ""} />
                        Thành viên nhóm
                    </Link>
                    <Link href="/dashboard/settings" className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${pathname === '/dashboard/settings' ? 'bg-[#E1DFDD]/70 text-[#37352F]' : 'text-[#787774] hover:bg-[#E1DFDD]/40 hover:text-[#37352F]'}`}>
                        <Settings size={18} className={pathname === '/dashboard/settings' ? "text-[#37352F]" : ""} />
                        Cài đặt
                    </Link>
                </nav>

                {/* Logout Button */}
                <div className="p-4 border-t border-[#E1DFDD]/50">
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-[#787774] hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors">
                        <LogOut size={18} />
                        Đăng xuất
                    </button>
                </div>
            </aside>

            {/* MAIN CONTENT AREA */}
            <main className="flex-1 flex flex-col h-full overflow-hidden relative">
                
                {/* Header Topbar */}
                <header className="h-14 border-b border-[#E1DFDD] bg-white flex items-center justify-between px-4 flex-shrink-0 z-10">
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="p-1 hover:bg-[#F7F6F3] rounded text-[#787774] transition-colors"
                        >
                            <Menu size={20} />
                        </button>
                        <h1 className="font-semibold text-sm">Quản lý Đồ án Đám mây</h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center gap-2 bg-[#F7F6F3] px-3 py-1.5 rounded-md border border-[#E1DFDD] focus-within:border-gray-400 focus-within:shadow-sm transition-all">
                            <Search size={16} className="text-[#787774]" />
                            <input 
                                type="text" 
                                placeholder="Tìm kiếm công việc..." 
                                className="bg-transparent border-none outline-none focus:ring-0 shadow-none text-sm w-48 placeholder:text-[#787774]"
                            />
                        </div>
                        <button className="p-1.5 hover:bg-[#F7F6F3] rounded text-[#787774] transition-colors relative">
                            <Bell size={20} />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                        </button>
                    </div>
                </header>

                {/* Content Area */}
                <div className="flex-1 overflow-auto bg-white">
                    {children}
                </div>
            </main>
        </div>
    );
}
