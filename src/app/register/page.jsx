"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '@/utils/api';
import AuthWrapper from '@/components/AuthWrapper';
import { User, Mail, Lock, Loader2 } from 'lucide-react';

export default function RegisterPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        setErrorMsg('');
        setSuccessMsg('');
        setIsLoading(true);

        try {
            await api.post('/api/auth/register', formData);
            setSuccessMsg('');
            setTimeout(() => router.push('/login'), 2000);
        } catch (error) {
            setErrorMsg(error.response?.data?.error || error.response?.data || "Có lỗi xảy ra!");
            setIsLoading(false);
        }
    };

    return (
        <AuthWrapper title="Tạo tài khoản" subtitle="Bắt đầu quản lý công việc của bạn">
            {errorMsg && (
                <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
                    {errorMsg}
                </div>
            )}
            {successMsg && (
                <div className="mb-6 p-3 bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg">
                    Đăng ký thành công! Chuyển hướng...
                </div>
            )}

            <form onSubmit={handleRegister} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-2 text-black font-semibold">Tên đăng nhập</label>
                    <div className="relative">
                        <User className="absolute left-4 top-3.5 h-5 w-5 text-neutral-400" />
                        <input 
                            type="text" 
                            required
                            className="w-full border border-neutral-300 rounded-lg pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors bg-white text-black placeholder-neutral-400"
                            placeholder="username"
                            value={formData.username}
                            onChange={(e) => setFormData({...formData, username: e.target.value})}
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2 text-black font-semibold">Email</label>
                    <div className="relative">
                        <Mail className="absolute left-4 top-3.5 h-5 w-5 text-neutral-400" />
                        <input 
                            type="email" 
                            required
                            className="w-full border border-neutral-300 rounded-lg pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors bg-white text-black placeholder-neutral-400"
                            placeholder="email@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2 text-black font-semibold">Mật khẩu</label>
                    <div className="relative">
                        <Lock className="absolute left-4 top-3.5 h-5 w-5 text-neutral-400" />
                        <input 
                            type="password" 
                            required
                            className="w-full border border-neutral-300 rounded-lg pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors bg-white text-black placeholder-neutral-400"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                        />
                    </div>
                </div>

                <button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full bg-black hover:bg-neutral-800 text-white font-medium py-3 rounded-lg text-sm transition-colors mt-6 disabled:opacity-60 flex items-center justify-center gap-2 shadow-sm"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="animate-spin h-4 w-4" />
                            Đang tạo...
                        </>
                    ) : "Đăng ký"}
                </button>
            </form>

            <div className="mt-8 text-center text-sm text-neutral-500">
                Đã có tài khoản?{' '}
                <Link href="/login" className="text-black font-semibold hover:underline transition-colors">
                    Đăng nhập
                </Link>
            </div>
        </AuthWrapper>
    );
}