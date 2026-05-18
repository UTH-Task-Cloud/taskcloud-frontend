export default function Logo({ className = "", size = "normal" }) {
    const dimensions = size === "large" ? "w-12 h-12 text-2xl" : "w-8 h-8 text-lg";

    return (
        <div className={`rounded-xl bg-[#F7F6F3] border border-[#E1DFDD] flex items-center justify-center text-[#37352F] shadow-sm transform hover:rotate-12 transition-transform duration-300 cursor-pointer ${dimensions} ${className}`}>
            <span className="font-serif font-bold leading-none mt-0.5">U</span>
        </div>
    );
}
