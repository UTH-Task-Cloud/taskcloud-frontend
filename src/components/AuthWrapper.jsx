"use client";
import { useEffect, useState } from 'react';
import { BookOpen, Plus } from 'lucide-react';

export default function AuthWrapper({ children, title, subtitle }) {
    const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
    const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
    const [trailPos, setTrailPos] = useState({ x: -100, y: -100 });
    const [isHovered, setIsHovered] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!isVisible) setIsVisible(true);
            const x = (e.clientX - window.innerWidth / 2) / 35;
            const y = (e.clientY - window.innerHeight / 2) / 35;
            setMouseOffset({ x, y });
            setCursorPos({ x: e.clientX, y: e.clientY });
        };

        let animationFrameId;
        const updateTrail = () => {
            setTrailPos((prev) => {
                const dx = cursorPos.x - prev.x;
                const dy = cursorPos.y - prev.y;
                return {
                    x: prev.x + dx * 0.15,
                    y: prev.y + dy * 0.15,
                };
            });
            animationFrameId = requestAnimationFrame(updateTrail);
        };
        animationFrameId = requestAnimationFrame(updateTrail);
        const handleMouseOver = (e) => {
            const target = e.target;
            const isInteractive = 
                target.tagName === 'BUTTON' || 
                target.tagName === 'A' || 
                target.tagName === 'INPUT' || 
                target.closest('button') || 
                target.closest('a') || 
                target.closest('.cursor-pointer');
            setIsHovered(!!isInteractive);
        };

        const handleMouseLeave = () => setIsVisible(false);

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, [cursorPos, isVisible]);

    return (

        <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF9F6] relative font-sans overflow-hidden px-4 selection:bg-gray-200 hide-system-cursor">
            
            {/* ==========================================================================
               CON TRỎ CHUỘT CUSTOM (CHỈ HIỂN THỊ TRÊN MÀN HÌNH ĐỂ BÀN LG TRỞ LÊN)
               ========================================================================== */}
            {isVisible && (
                <>
                    <div 
                        style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }}
                        className="hidden lg:block fixed w-1.5 h-1.5 bg-black rounded-full pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2"
                    ></div>

                    <div 
                        style={{ left: `${trailPos.x}px`, top: `${trailPos.y}px` }}
                        className={`hidden lg:block fixed border border-black rounded-full pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out ${
                            isHovered ? 'w-10 h-10 bg-black/5 scale-110 border-dashed border-black' : 'w-6 h-6'
                        }`}
                    ></div>
                </>
            )}
            <div className="absolute inset-0 notion-sharp-animated-bg opacity-90 pointer-events-none"></div>
            <div 
                style={{ transform: `translate(${mouseOffset.x * -0.6}px, ${mouseOffset.y * -0.6}px)` }}
                className="absolute top-[8%] left-[5%] w-40 h-40 border-2 border-dashed border-gray-300 rounded-full pointer-events-none transition-transform duration-300 ease-out"
            ></div>
            
            <div 
                style={{ transform: `translate(${mouseOffset.x * 0.8}px, ${mouseOffset.y * 0.8}px)` }}
                className="absolute bottom-[8%] right-[8%] w-48 h-48 border border-gray-300 rounded-[2rem] notion-rotate-slow pointer-events-none transition-transform duration-300 ease-out"
            ></div>
            
            <div 
                style={{ transform: `translate(${mouseOffset.x * -0.4}px, ${mouseOffset.y * 0.5}px)` }}
                className="absolute bottom-[18%] left-[10%] w-20 h-20 border-2 border-gray-300/80 rounded-xl pointer-events-none transition-transform duration-300 ease-out"
            ></div>
            
            <div 
                style={{ transform: `translate(${mouseOffset.x * 1.2}px, ${mouseOffset.y * 1.2}px)` }}
                className="absolute top-[15%] right-[12%] w-24 h-24 border border-gray-300 rounded-lg p-2 pointer-events-none flex flex-wrap gap-2 opacity-60 transition-transform duration-300 ease-out"
            >
                <div className="w-5 h-5 border border-gray-300/60 rounded"></div>
                <div className="w-5 h-5 border border-gray-300/60 rounded"></div>
                <div className="w-5 h-5 border border-gray-300/60 rounded"></div>
                <div className="w-5 h-5 border border-gray-300/60 rounded"></div>
            </div>
            <div style={{ transform: `translate(${mouseOffset.x * -1.5}px, ${mouseOffset.y * -1.5}px)` }} className="absolute top-[35%] left-[25%] text-gray-400/80 pointer-events-none transition-transform duration-300 ease-out"><Plus size={20} strokeWidth={3} /></div>
            <div style={{ transform: `translate(${mouseOffset.x * 1.5}px, ${mouseOffset.y * -1}px)` }} className="absolute bottom-[40%] right-[28%] text-gray-400/80 pointer-events-none transition-transform duration-300 ease-out"><Plus size={28} strokeWidth={2} /></div>
            <div style={{ transform: `translate(${mouseOffset.x * -0.8}px, ${mouseOffset.y * 1.2}px)` }} className="absolute top-[50%] left-[8%] text-gray-400/60 pointer-events-none transition-transform duration-300 ease-out"><Plus size={24} strokeWidth={2} /></div>
            <div className="relative z-10 w-full max-w-[400px] bg-white border border-[#E1DFDD] rounded-2xl shadow-[0_20px_50px_rgba(55,53,47,0.08)] p-8 sm:p-10 transform transition-all duration-500 hover:shadow-[0_24px_60px_rgba(55,53,47,0.12)]">
                <div className="mb-8 flex flex-col items-center text-center">
                    <div className="mb-5 w-12 h-12 rounded-xl bg-[#F7F6F3] border border-[#E1DFDD] flex items-center justify-center text-[#37352F] shadow-sm transform hover:rotate-12 transition-transform duration-300 cursor-pointer">
                        <BookOpen strokeWidth={1.5} size={24} />
                    </div>
                    <h1 className="text-2xl font-bold text-[#37352F] tracking-tight mb-2">
                        {title}
                    </h1>
                    <p className="text-[#787774] text-sm font-medium">
                        {subtitle}
                    </p>
                </div>
                {children}

            </div>
        </div>
    );
}