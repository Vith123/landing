"use client";

export default function FAQPage() {
  const faqs = [
    {
      q: "How do I buy?",
      a: "Click the 'Buy Now' button on any product to chat with us on Telegram.",
    },
    {
      q: "Do you ship internationally?",
      a: "Currently we ship within Cambodia. Please contact us for other regions.",
    },
    {
      q: "What payment methods do you accept?",
      a: "We accept ABA, Wing, and other local payment methods.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-20 min-h-[60vh]">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">
          Frequently Asked Questions
        </h1>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="game-card p-6">
              <h3 className="text-purple-400 font-bold mb-2">{faq.q}</h3>
              <p className="text-gray-300">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
