import React, { useState } from 'react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 5000);
    }
  };

  return (
    <footer className="w-full bg-[#fbf2f0] border-t border-[#efe6e4] mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Column 1: Brand & Bio */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#002217] flex items-center justify-center text-[#95f8a7]">
                <span className="material-symbols-outlined text-2xl">temple_buddhist</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold text-[#002217] tracking-tight leading-none">
                  Lanka Travellers
                </span>
                <span className="text-[11px] text-[#414844] tracking-widest uppercase font-semibold mt-0.5">
                  Ceylon Journeys
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#414844] leading-relaxed">
              Curating bespoke, luxury, and cultural expeditions across the pearl of the Indian Ocean. Experience authentic Ceylon with seasoned local chauffeurs and nature naturalists.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-[#f5ecea] hover:bg-[#002217] text-[#1e1b1a] hover:text-white flex items-center justify-center transition-colors shadow-xs"
              >
                <span className="material-symbols-outlined text-sm">public</span>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-[#f5ecea] hover:bg-[#002217] text-[#1e1b1a] hover:text-white flex items-center justify-center transition-colors shadow-xs"
              >
                <span className="material-symbols-outlined text-sm">photo_camera</span>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 rounded-full bg-[#f5ecea] hover:bg-[#002217] text-[#1e1b1a] hover:text-white flex items-center justify-center transition-colors shadow-xs"
              >
                <span className="material-symbols-outlined text-sm">smart_display</span>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <h4 className="font-sans text-sm font-bold text-[#002217] uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-2 text-xs sm:text-sm text-[#414844]">
              <li>
                <a href="#home" className="hover:text-[#002217] transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#destinations" className="hover:text-[#002217] transition-colors">
                  Destinations
                </a>
              </li>
              <li>
                <a href="#packages" className="hover:text-[#002217] transition-colors">
                  Tour Packages
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#002217] transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#002217] transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Colombo Office */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <h4 className="font-sans text-sm font-bold text-[#002217] uppercase tracking-wider">
              Colombo Office
            </h4>
            <div className="flex flex-col gap-2.5 text-xs sm:text-sm text-[#414844]">
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-base text-[#002217] mt-0.5 shrink-0">
                  location_on
                </span>
                <span>45 Galle Road, Colombo 03, Sri Lanka</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base text-[#002217] shrink-0">
                  call
                </span>
                <a href="tel:+94771234567" className="hover:text-[#002217] transition-colors">
                  +94 77 123 4567
                </a>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base text-[#002217] shrink-0">
                  mail
                </span>
                <a href="mailto:info@lankatravellers.com" className="hover:text-[#002217] transition-colors">
                  info@lankatravellers.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-[#006d30] font-semibold">
                <span className="material-symbols-outlined text-base shrink-0">
                  support_agent
                </span>
                <span>24/7 Concierge Support</span>
              </div>
            </div>
          </div>

          {/* Column 4: Newsletter */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <h4 className="font-sans text-sm font-bold text-[#002217] uppercase tracking-wider">
              Travel Newsletter
            </h4>
            <p className="text-xs text-[#414844] leading-relaxed">
              Get curated itineraries, seasonal wildlife updates, and exclusive safari packages in your inbox.
            </p>

            <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
              <div className="flex items-center bg-white rounded-full p-1 border border-[#efe6e4] shadow-xs">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full bg-transparent px-3 py-1.5 text-xs text-[#1e1b1a] placeholder:text-[#717974] focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="bg-[#002217] text-white p-2 rounded-full hover:bg-[#0f382a] transition-colors flex items-center justify-center shrink-0 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">send</span>
                </button>
              </div>

              {subscribed ? (
                <span className="text-[11px] text-[#006d30] font-bold">
                  ✓ Ayubowan! You are now subscribed to Ceylon Journeys.
                </span>
              ) : (
                <span className="text-[11px] text-[#717974]">
                  We respect your privacy. Unsubscribe anytime.
                </span>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[#efe6e4] text-xs text-[#717974] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Lanka Travellers. All Rights Reserved. Explore Sri Lanka | Travel Smart | Travel Safe</p>
          <div className="flex items-center gap-4 text-xs">
            <button
              type="button"
              onClick={() => alert('Lanka Travellers Privacy Policy: We safeguard all personal data and never share contact details.')}
              className="hover:text-[#002217] transition-colors"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={() => alert('Lanka Travellers Terms of Service: All expeditions follow Sri Lanka Tourism Development Authority (SLTDA) guidelines.')}
              className="hover:text-[#002217] transition-colors"
            >
              Terms of Service
            </button>
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('destinations');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-[#002217] transition-colors"
            >
              Sitemap
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
