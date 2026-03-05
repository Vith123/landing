"use client";

export default function FloatingTelegram() {
  return (
    <a
      href="https://t.me/chhunchandevit"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#0088cc] text-white rounded-full shadow-lg hover:bg-[#0077b5] hover:scale-110 transition-all duration-300 group pulse-glow"
      aria-label="Chat on Telegram"
    >
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 6.627 5.374 12 12 12 6.626 0 12-5.373 12-12 0-6.628-5.374-12-12-12zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z" />
      </svg>

      {/* Tooltip */}
      <span className="absolute right-16 scale-0 group-hover:scale-100 bg-[#1a1a2e] text-white text-xs font-semibold px-3 py-1.5 rounded-lg border border-[#2d2d44] transition-all duration-200 origin-right whitespace-nowrap shadow-xl">
        Chat with us!
      </span>
    </a>
  );
}
