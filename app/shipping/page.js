"use client";

export default function ShippingPage() {
  return (
    <div className="container mx-auto px-4 py-20 min-h-[60vh]">
      <div className="max-w-3xl mx-auto game-card p-8">
        <h1 className="text-3xl font-bold text-white mb-6">
          Shipping Information
        </h1>
        <div className="prose prose-invert">
          <p className="text-gray-300">
            We offer fast and reliable shipping across Cambodia.
          </p>
          <ul className="text-gray-400 space-y-2 mt-4">
            <li>Phnom Penh: 1-2 business days</li>
            <li>Provinces: 2-3 business days</li>
            <li>Tracking Number: Provided via Telegram after purchase</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
