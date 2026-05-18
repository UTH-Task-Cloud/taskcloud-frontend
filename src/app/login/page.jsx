"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '@/utils/api';
import AuthWrapper from '@/components/AuthWrapper';
import { User, Lock, Loader2 } from 'lucide-react';

export default function LoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMsg('');
        setIsLoading(true);

        try {
            const response = await api.post('/api/auth/login', { username, password });
            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('username', response.data.username);
            setTimeout(() => router.push('/dashboard'), 300);
        } catch (error) {
            setErrorMsg(error.response?.data?.error || error.response?.data || "Sai tài khoản hoặc mật khẩu!");
            setIsLoading(false);
        }
    };

    return (
        <AuthWrapper title="Đăng nhập" subtitle="Chào mừng bạn quay lại TaskManager">
            {errorMsg && (
                <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
                    {errorMsg}
                </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-2 text-black font-semibold">Tên đăng nhập</label>
                    <div className="relative">
                        <User className="absolute left-4 top-3.5 h-5 w-5 text-neutral-400" />
                        <input 
                            type="text" 
                            required
                            className="w-full border border-neutral-300 rounded-lg pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors bg-white text-black placeholder-neutral-400"
                            placeholder="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>
                
                <div className="flex justify-end pt-2">
                    <Link href="/forgot-password" className="text-sm text-neutral-500 hover:text-black hover:underline transition-colors">
                        Quên mật khẩu?
                    </Link>
                </div>

                <button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full bg-black hover:bg-neutral-800 text-white font-medium py-3 rounded-lg text-sm transition-colors mt-6 disabled:opacity-60 flex items-center justify-center gap-2 shadow-sm"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="animate-spin h-4 w-4" />
                            Đang xác thực...
                        </>
                    ) : "Tiếp tục"}
                </button>
            </form>

            <div className="mt-8 text-center text-sm text-neutral-500">
                Chưa có tài khoản?{' '}
                <Link href="/register" className="text-black font-semibold hover:underline transition-colors">
                    Tạo tài khoản
                </Link>
            </div>
        </AuthWrapper>
    );
}