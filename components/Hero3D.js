'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function Hero3D() {
  const heroRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Only enable 3D tilt on desktop
    if (window.innerWidth < 768) return;

    // 3D mouse tilt effect
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 50;
      const rotateY = (centerX - x) / 50;

      const content = container.querySelector('.hero-content');
      if (content) {
        content.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      }
    };

    const handleMouseLeave = () => {
      const content = container.querySelector('.hero-content');
      if (content) {
        content.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
      }
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[80vh] md:min-h-[90vh] flex items-center overflow-hidden py-16 md:py-0"
      style={{ perspective: '1000px' }}
    >
      {/* Cyber Grid Background */}
      <div className="absolute inset-0 cyber-grid opacity-10 md:opacity-20"></div>
      
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-[#0f0f1a] to-cyan-900/30"></div>
      
      {/* Floating Particles - Reduced on mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-500 rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `particleFloat ${8 + Math.random() * 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
        {[...Array(15)].map((_, i) => (
          <div
            key={`cyan-${i}`}
            className="absolute w-1.5 h-1.5 bg-cyan-400 rounded-full opacity-50"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `particleFloat ${10 + Math.random() * 8}s linear infinite reverse`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Floating 3D Gaming Icons - Hidden on mobile, shown on tablet+ */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden lg:block">
        {/* Controller Icon */}
        <div className="absolute top-[15%] left-[8%] floating-slow">
          <div className="w-16 h-16 xl:w-20 xl:h-20 bg-gradient-to-br from-purple-600/30 to-pink-600/30 rounded-2xl backdrop-blur-sm border border-purple-500/30 flex items-center justify-center transform rotate-12 shadow-lg shadow-purple-500/20">
            <svg className="w-8 h-8 xl:w-10 xl:h-10 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7.97 16L5 19C4 20 2 20 1 19C0 18 0 16 1 15L4 12V8C4 6.89 4.89 6 6 6H8V4C8 2.89 8.89 2 10 2H14C15.11 2 16 2.89 16 4V6H18C19.11 6 20 6.89 20 8V12L23 15C24 16 24 18 23 19C22 20 20 20 19 19L16.03 16H7.97ZM10 8V4C10 3.45 10.45 3 11 3H13C13.55 3 14 3.45 14 4V8H10ZM8 14H10V12H12V10H10V8H8V10H6V12H8V14ZM16 10.5V12.5H18V10.5H16ZM16 14.5V16.5H18V14.5H16Z"/>
            </svg>
          </div>
        </div>

        {/* Keyboard Icon */}
        <div className="absolute top-[25%] right-[10%] floating">
          <div className="w-20 h-14 xl:w-24 xl:h-16 bg-gradient-to-br from-cyan-600/30 to-blue-600/30 rounded-xl backdrop-blur-sm border border-cyan-500/30 flex items-center justify-center transform -rotate-6 shadow-lg shadow-cyan-500/20">
            <svg className="w-10 h-6 xl:w-12 xl:h-8 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 10H5V8H19V10ZM19 6H5V4H19V6ZM19 14H5V12H19V14ZM21 0H3C1.89 0 1 0.89 1 2V18C1 19.11 1.89 20 3 20H21C22.11 20 23 19.11 23 18V2C23 0.89 22.11 0 21 0ZM21 18H3V2H21V18Z"/>
            </svg>
          </div>
        </div>

        {/* Mouse Icon */}
        <div className="absolute bottom-[30%] left-[5%] floating">
          <div className="w-12 h-16 xl:w-14 xl:h-20 bg-gradient-to-br from-pink-600/30 to-rose-600/30 rounded-2xl backdrop-blur-sm border border-pink-500/30 flex items-center justify-center transform rotate-[-15deg] shadow-lg shadow-pink-500/20">
            <svg className="w-6 h-10 xl:w-8 xl:h-12 text-pink-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13 1.07V9H21C20.9 5.04 17.58 1.68 13.07 1.07M4 15V9C4 4.03 8.03 0 13 0C17.97 0 22 4.03 22 9V15C22 19.97 17.97 24 13 24C8.03 24 4 19.97 4 15ZM13 22C16.87 22 20 18.87 20 15V11H6V15C6 18.87 9.13 22 13 22ZM11 1.07C6.42 1.68 3.1 5.04 3 9H11V1.07Z"/>
            </svg>
          </div>
        </div>

        {/* Headset Icon */}
        <div className="absolute bottom-[20%] right-[8%] floating-slow">
          <div className="w-14 h-14 xl:w-18 xl:h-18 bg-gradient-to-br from-orange-600/30 to-amber-600/30 rounded-2xl backdrop-blur-sm border border-orange-500/30 flex items-center justify-center p-3 xl:p-4 transform rotate-6 shadow-lg shadow-orange-500/20">
            <svg className="w-8 h-8 xl:w-10 xl:h-10 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 1C7.03 1 3 5.03 3 10V17C3 18.66 4.34 20 6 20H9V12H5V10C5 6.13 8.13 3 12 3S19 6.13 19 10V12H15V20H18C19.66 20 21 18.66 21 17V10C21 5.03 16.97 1 12 1Z"/>
            </svg>
          </div>
        </div>

        {/* RGB Strip */}
        <div className="absolute top-[60%] left-[15%] floating">
          <div className="w-6 h-32 rounded-full overflow-hidden opacity-50 transform rotate-45">
            <div className="w-full h-full bg-gradient-to-b from-red-500 via-green-500 to-blue-500 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Glow Orbs - Smaller on mobile */}
      <div className="absolute top-1/4 -left-10 md:-left-20 w-48 h-48 md:w-96 md:h-96 bg-purple-600 rounded-full blur-[100px] md:blur-[150px] opacity-20 md:opacity-30 animate-pulse"></div>
      <div className="absolute bottom-1/4 -right-10 md:-right-20 w-48 h-48 md:w-96 md:h-96 bg-cyan-500 rounded-full blur-[100px] md:blur-[150px] opacity-15 md:opacity-25 animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-pink-500 rounded-full blur-[150px] md:blur-[200px] opacity-10 animate-pulse hidden md:block" style={{ animationDelay: '2s' }}></div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div 
          ref={heroRef}
          className="hero-content max-w-3xl transition-transform duration-300 ease-out"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Badge */}
          <div 
            className="inline-flex items-center bg-gradient-to-r from-purple-600/30 to-cyan-600/30 backdrop-blur-xl border border-purple-500/40 rounded-full px-4 py-1.5 sm:px-5 sm:py-2 mb-4 sm:mb-6 transform hover:scale-105 transition-all duration-300 group"
          >
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2 sm:mr-3 animate-pulse shadow-lg shadow-green-400/50"></span>
            <span className="text-xs sm:text-sm text-gray-200 font-medium">New Arrivals 2026</span>
            <svg className="w-3 h-3 sm:w-4 sm:h-4 ml-1.5 sm:ml-2 text-purple-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>

          {/* Title with 3D depth */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black mb-4 sm:mb-6 leading-tight">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-gray-300 drop-shadow-2xl">
              Level Up Your
            </span>
            <span className="block mt-1 sm:mt-2 relative">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 animate-gradient-x">
                Gaming Experience
              </span>
              {/* Glow effect behind text - hidden on mobile */}
              <span className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 blur-xl opacity-50 hidden md:block">
                Gaming Experience
              </span>
            </span>
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 md:mb-10 max-w-xl leading-relaxed">
            Discover premium gaming accessories designed for competitive players. 
            From RGB keyboards to pro-grade headsets, gear up for victory.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link 
              href="/#products" 
              className="group relative px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/40 text-center"
            >
              <span className="relative z-10 flex items-center justify-center space-x-2">
                <span>Shop Now</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
              {/* Shine effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              </div>
            </Link>

            <Link 
              href="/#categories" 
              className="group px-6 py-3 sm:px-8 sm:py-4 bg-white/5 backdrop-blur-xl border border-white/20 rounded-xl font-bold text-white hover:bg-white/10 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
            >
              <span>Browse Categories</span>
              <svg className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-8 sm:mt-10 md:mt-14 grid grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {[
              { value: '500+', label: 'Products' },
              { value: '50K+', label: 'Gamers' },
              { value: '4.9', label: 'Rating', icon: '⭐' },
            ].map((stat, i) => (
              <div 
                key={i} 
                className="text-center group cursor-default"
              >
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 group-hover:scale-110 transition-transform">
                  {stat.value} {stat.icon}
                </div>
                <div className="text-xs sm:text-sm text-gray-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator - Hidden on mobile */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex-col items-center animate-bounce hidden sm:flex">
        <span className="text-gray-400 text-xs md:text-sm mb-2">Scroll to explore</span>
        <div className="w-5 h-8 md:w-6 md:h-10 border-2 border-gray-500 rounded-full flex justify-center pt-1.5 md:pt-2">
          <div className="w-1 h-2 md:w-1.5 md:h-3 bg-purple-500 rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
