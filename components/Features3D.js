'use client';

import { useEffect, useRef, useState } from 'react';

const features = [
  {
    title: 'Free Shipping',
    description: 'On orders over $50',
    icon: (
      <svg className="w-7 h-7 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
      </svg>
    ),
    gradient: 'from-purple-500 to-indigo-600',
    bgGlow: 'bg-purple-500/20',
  },
  {
    title: 'Secure Payment',
    description: '100% secure checkout',
    icon: (
      <svg className="w-7 h-7 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    gradient: 'from-cyan-500 to-blue-600',
    bgGlow: 'bg-cyan-500/20',
  },
  {
    title: 'Easy Returns',
    description: '30-day return policy',
    icon: (
      <svg className="w-7 h-7 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    gradient: 'from-pink-500 to-rose-500',
    bgGlow: 'bg-pink-500/20',
  },
  {
    title: '24/7 Support',
    description: 'Dedicated support team',
    icon: (
      <svg className="w-7 h-7 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    gradient: 'from-green-500 to-emerald-500',
    bgGlow: 'bg-green-500/20',
  },
];

export default function Features3D() {
  const [visibleCards, setVisibleCards] = useState([]);
  const cardsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.dataset.index);
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleCards((prev) => [...new Set([...prev, index])]);
            }, index * 150);
          }
        });
      },
      { threshold: 0.2 }
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-16 bg-gradient-to-b from-[#0a0a14] via-[#0f0f1a] to-[#0a0a14] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Why Choose <span className="gradient-text">BayV</span>?
          </h2>
          <p className="text-gray-400">Experience premium service with every purchase</p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              data-index={index}
              className={`
                relative p-5 md:p-6 rounded-2xl border border-white/10 
                bg-gradient-to-br from-[#1a1a2e]/80 to-[#0f0f1a]/80
                backdrop-blur-sm
                transition-all duration-700 ease-out
                hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20
                group cursor-pointer
                ${visibleCards.includes(index) 
                  ? 'opacity-100 translate-y-0 rotate-0' 
                  : 'opacity-0 translate-y-10 rotate-3'
                }
              `}
              style={{
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Glow effect on hover */}
              <div className={`absolute inset-0 ${feature.bgGlow} rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500`}></div>
              
              {/* Icon */}
              <div 
                className={`
                  w-14 h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-br ${feature.gradient} 
                  flex items-center justify-center mb-4
                  shadow-lg transform transition-transform duration-500
                  group-hover:scale-110 group-hover:-translate-y-1
                `}
              >
                {feature.icon}
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-white font-semibold text-base md:text-lg mb-1 group-hover:text-purple-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm">
                  {feature.description}
                </p>
              </div>

              {/* Bottom accent line */}
              <div className={`
                absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r ${feature.gradient}
                transition-all duration-500 rounded-full
                w-0 group-hover:w-1/2
              `}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
