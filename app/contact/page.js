"use client";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-20 min-h-[60vh]">
      <div className="max-w-2xl mx-auto game-card p-8">
        <h1 className="text-3xl font-bold text-white mb-6">Contact Us</h1>
        <p className="text-gray-400 mb-8">
          Have questions? We're here to help! Reach out to us on Telegram for
          the fastest response.
        </p>

        <div className="space-y-6">
          <a
            href="https://t.me/chhunchandevit"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 bg-[#1a1a2e] rounded-xl border border-purple-500/20 hover:border-purple-500/50 transition"
          >
            <div className="w-12 h-12 bg-[#0088cc]/20 rounded-lg flex items-center justify-center text-[#0088cc]">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 6.627 5.374 12 12 12 6.626 0 12-5.373 12-12 0-6.628-5.374-12-12-12zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z" />
              </svg>
            </div>
            <div>
              <p className="text-white font-semibold">Telegram Support</p>
              <p className="text-gray-400 text-sm">@chhunchandevit</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
