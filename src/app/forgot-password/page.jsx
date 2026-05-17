"use client";
import { useState } from 'react';
import Link from 'next/link';
import api from '@/utils/api';
import AuthWrapper from '@/components/AuthWrapper';
import { Mail, Loader2, ArrowLeft } from 'lucide-react';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleReset = async (e) => {
        e.preventDefault();
        setErrorMsg('');
        setMessage('');
        setIsLoading(true);

        try {
            await api.post('/api/auth/forgot-password', { email });
            setMessage('✅ Yêu cầu thành công! Vui lòng kiểm tra Console Backend để lấy mã khôi phục.');
        } catch (error) {
            setErrorMsg(error.response?.data?.error || error.response?.data || "Email không tồn tại.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthWrapper title="Quên mật khẩu?" subtitle="Nhập email và chúng tôi sẽ gửi mã khôi phục.">
            
            <div className="absolute top-6 left-6">
                <Link href="/login" className="inline-flex items-center text-xs text-neutral-500 hover:text-black transition-colors bg-[#F7F6F3] hover:bg-[#E1DFDD] w-8 h-8 rounded-md border border-[#E1DFDD] justify-center" title="Quay lại đăng nhập">
                    <ArrowLeft className="h-4 w-4" />
                </Link>
            </div>

            <div className="pt-4">
                {errorMsg && (
                    <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg flex items-start gap-2">
                        <span className="mt-0.5">⚠️</span> <span>{errorMsg}</span>
                    </div>
                )}
                {message && (
                    <div className="mb-6 p-3 bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg">
                        {message}
                    </div>
                )}

                <form onSubmit={handleReset} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2 text-black font-semibold">Email của bạn</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-3.5 h-5 w-5 text-neutral-400" />
                            <input 
                                type="email" 
                                required
                                className="w-full border border-neutral-300 rounded-lg pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors bg-white text-black placeholder-neutral-400"
                                placeholder="email@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                                Đang gửi...
                            </>
                        ) : "Gửi mã khôi phục"}
                    </button>
                </form>
            </div>
        </AuthWrapper>
    );
}