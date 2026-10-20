import React, { useState } from 'react';
import { CurrencyCode } from '../types';
import { CURRENCY_CONFIG } from '../data/travelData';

interface HeaderProps {
  currentCurrency: CurrencyCode;
  onCurrencyChange: (currency: CurrencyCode) => void;
  onOpenAIPlanner: () => void;
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentCurrency,
  onCurrencyChange,
  onOpenAIPlanner,
  activeSection
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'Destinations', href: '#destinations', id: 'destinations' },
    { label: 'Tour Packages', href: '#packages', id: 'packages' },
    { label: 'About Us', href: '#about', id: 'about' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#fff8f6]/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.05)] transition-all">
      {/* Top micro bar */}
      <div className="bg-[#0f382a] text-[#79a28f] py-1 px-4 sm:px-8 text-xs border-b border-[#002217]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4 sm:gap-6">
            <a
              href="tel:+94771234567"
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined text-[14px]">call</span>
              <span className="font-medium">+94 77 123 4567</span>
            </a>
            <a
              href="mailto:info@lankatravellers.com"
              className="hidden sm:inline-flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined text-[14px]">mail</span>
              <span>info@lankatravellers.com</span>
            </a>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 ml-auto">
            <span className="inline-flex items-center gap-1 bg-[#002217] text-[#95f8a7] px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide">
              <span className="material-symbols-outlined text-[12px]">verified</span>
              Free Consultation • 24/7 Support
            </span>

            {/* Currency Selector */}
            <div className="flex items-center gap-1 bg-[#002217]/60 px-2 py-0.5 rounded-md border border-[#79a28f]/20">
              <span className="material-symbols-outlined text-[13px] text-[#95f8a7]">payments</span>
              <select
                aria-label="Currency Selector"
                value={currentCurrency}
                onChange={(e) => onCurrencyChange(e.target.value as CurrencyCode)}
                className="bg-transparent text-white border-none text-[11px] font-semibold focus:outline-none cursor-pointer"
              >
                {Object.keys(CURRENCY_CONFIG).map((code) => (
                  <option key={code} value={code} className="bg-[#002217] text-white">
                    {CURRENCY_CONFIG[code as CurrencyCode].label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="h-20 max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between gap-4">
        {/* Brand logo */}
        <a href="#home" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-[#002217] flex items-center justify-center text-[#95f8a7] shadow-inner group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-2xl">temple_buddhist</span>
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-xl sm:text-2xl font-bold text-[#002217] tracking-tight leading-none group-hover:text-[#006d30] transition-colors">
              Lanka Travellers
            </span>
            <span className="text-[11px] text-[#414844] tracking-widest uppercase font-semibold mt-0.5">
              Ceylon Journeys
            </span>
          </div>
        </a>

        {/* Desktop Nav Pills */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#fbf2f0] px-3 py-1.5 rounded-full border border-[#efe6e4]">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-[#0f382a] text-white shadow-sm'
                    : 'text-[#414844] hover:text-[#002217] hover:bg-[#f5ecea]'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Right action CTAs */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* AI Trip Architect Button with High Thinking badge */}
          <button
            onClick={onOpenAIPlanner}
            type="button"
            className="hidden md:inline-flex items-center gap-1.5 bg-[#c1ecd7] hover:bg-[#a5d0bc] text-[#002217] font-semibold text-xs px-3.5 py-2 rounded-full transition-all duration-200 border border-[#79a28f]/40 shadow-sm hover:shadow"
            title="Design a custom itinerary with Gemini 4 Argon High Thinking"
          >
            <span className="material-symbols-outlined text-sm text-[#006d30]">neurology</span>
            <span>AI Trip Architect</span>
            <span className="bg-[#002217] text-[#95f8a7] text-[9px] px-1.5 py-0.2 rounded-full uppercase tracking-wider font-bold">
              Think High
            </span>
          </button>

          {/* Primary CTA */}
          <a
            href="#contact"
            className="inline-flex items-center justify-center bg-[#4f2700] hover:bg-[#301600] text-white font-semibold text-sm px-5 py-2.5 rounded-full transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
          >
            Plan My Trip
          </a>

          {/* User Profile Avatar */}
          <div className="w-9 h-9 rounded-full bg-[#002217] text-white flex items-center justify-center shadow-sm">
            <span className="material-symbols-outlined text-[18px]">person</span>
          </div>

          {/* Mobile hamburger menu toggle */}
          <button
            type="button"
            aria-label="Toggle Navigation Menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-[#002217] hover:bg-[#f5ecea] transition-colors"
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#fff8f6] border-b border-[#efe6e4] px-5 py-4 space-y-2 shadow-xl animate-in slide-in-from-top-4">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-xl font-semibold text-[#1e1b1a] hover:bg-[#f5ecea] transition-colors"
            >
              {item.label}
            </a>
          ))}
          <div className="pt-2 border-t border-[#efe6e4] flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAIPlanner();
              }}
              className="w-full flex items-center justify-center gap-2 bg-[#c1ecd7] text-[#002217] font-semibold py-2.5 px-4 rounded-xl"
            >
              <span className="material-symbols-outlined text-base text-[#006d30]">neurology</span>
              <span>AI Trip Architect (Gemini 4 Argon)</span>
            </button>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center bg-[#4f2700] text-white font-semibold py-2.5 px-4 rounded-xl"
            >
              Plan My Trip
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
