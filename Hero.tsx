import React, { useState } from 'react';

interface HeroProps {
  onSearch: (destination: string, duration: string, budget: string) => void;
  onOpenAIPlanner: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onSearch, onOpenAIPlanner }) => {
  const [destination, setDestination] = useState('all');
  const [duration, setDuration] = useState('any');
  const [budget, setBudget] = useState('all');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(destination, duration, budget);
    const element = document.getElementById('packages');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative w-full -mt-20 overflow-hidden bg-[#0f382a] text-white">
      {/* Visual Background with local asset */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/aistudio/Image_7_0d91d9ad.jpeg"
          alt="Sigiriya Rock Fortress at sunrise"
          className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#002217] via-[#0f382a]/80 to-[#002217]/60 mix-blend-multiply" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-[#002217]/40 to-[#002217]" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 pt-36 pb-24 md:pt-44 md:pb-28 flex flex-col justify-between">
        <div className="max-w-3xl">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#95f8a7]/20 backdrop-blur-md text-[#95f8a7] text-xs uppercase tracking-wider font-semibold mb-4 border border-[#95f8a7]/30">
            <span className="material-symbols-outlined text-[16px]">travel_explore</span>
            <span>Bespoke Journeys Across Ceylon</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white font-bold leading-tight tracking-tight mb-5 drop-shadow-sm">
            Welcome to Lanka Travellers
          </h1>

          <div className="space-y-3 text-base sm:text-lg text-[#e9e1df] max-w-2xl leading-relaxed">
            <p>
              Discover the beauty of Sri Lanka with Lanka Travellers. We offer exciting travel experiences designed to help you explore the island's rich culture, stunning landscapes, beautiful beaches, ancient heritage sites, and breathtaking hill country destinations.
            </p>
            <p className="text-sm sm:text-base text-[#e9e1df]/90">
              Whether you are looking for adventure, relaxation, cultural exploration, or family vacations, our experienced team is ready to create unforgettable travel memories for you.
            </p>
          </div>

          {/* Action buttons */}
          <div className="mt-7 flex flex-wrap items-center gap-3 sm:gap-4">
            <a
              href="#packages"
              className="inline-flex items-center gap-2 bg-[#006d30] text-white px-6 py-3.5 rounded-full font-semibold hover:bg-[#95f8a7] hover:text-[#00210a] transition-all duration-300 shadow-lg hover:shadow-xl group"
            >
              <span>Explore Travel Packages</span>
              <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </a>

            <button
              type="button"
              onClick={onOpenAIPlanner}
              className="inline-flex items-center gap-2 bg-[#c1ecd7]/90 hover:bg-[#c1ecd7] backdrop-blur-md text-[#002217] px-6 py-3.5 rounded-full font-semibold transition-all duration-300 shadow-md hover:shadow-lg border border-[#79a28f]/50"
            >
              <span className="material-symbols-outlined text-lg text-[#006d30]">psychology</span>
              <span>AI Trip Architect</span>
            </button>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-6 py-3.5 rounded-full font-semibold transition-colors border border-white/20"
            >
              <span className="material-symbols-outlined text-lg">mail</span>
              <span>Get in Touch</span>
            </a>
          </div>

          {/* Quick Stats Grid */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-white/15">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#95f8a7] text-2xl sm:text-3xl">
                sentiment_satisfied
              </span>
              <div className="flex flex-col">
                <span className="font-bold text-lg text-white">10,000+</span>
                <span className="text-xs text-[#e9e1df]">Happy Explorers</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#95f8a7] text-2xl sm:text-3xl">
                design_services
              </span>
              <div className="flex flex-col">
                <span className="font-bold text-lg text-white">100%</span>
                <span className="text-xs text-[#e9e1df]">Tailored Itineraries</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#95f8a7] text-2xl sm:text-3xl">
                badge
              </span>
              <div className="flex flex-col">
                <span className="font-bold text-lg text-white">Licensed</span>
                <span className="text-xs text-[#e9e1df]">Tour Guides</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#95f8a7] text-2xl sm:text-3xl">
                support_agent
              </span>
              <div className="flex flex-col">
                <span className="font-bold text-lg text-white">24/7</span>
                <span className="text-xs text-[#e9e1df]">Island Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Search Dock */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-8 -mb-10 sm:-mb-12">
        <div className="bg-white rounded-2xl shadow-2xl p-4 md:p-6 border border-[#efe6e4]">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-center">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="hero-dest" className="text-xs uppercase tracking-wider text-[#414844] font-bold flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-[#002217]">location_on</span>
                Destination
              </label>
              <select
                id="hero-dest"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="bg-[#fbf2f0] text-[#1e1b1a] px-3.5 py-2.5 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-[#002217] border border-[#efe6e4]"
              >
                <option value="all">All Sri Lanka</option>
                <option value="sigiriya">Sigiriya</option>
                <option value="ella">Ella</option>
                <option value="kandy">Kandy</option>
                <option value="mirissa">Mirissa</option>
                <option value="nuwara-eliya">Nuwara Eliya</option>
                <option value="galle">Galle</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="hero-duration" className="text-xs uppercase tracking-wider text-[#414844] font-bold flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-[#002217]">schedule</span>
                Duration
              </label>
              <select
                id="hero-duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="bg-[#fbf2f0] text-[#1e1b1a] px-3.5 py-2.5 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-[#002217] border border-[#efe6e4]"
              >
                <option value="any">Any Duration</option>
                <option value="1-2">1 - 2 Days</option>
                <option value="3-4">3 - 4 Days</option>
                <option value="5+">5+ Days</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="hero-budget" className="text-xs uppercase tracking-wider text-[#414844] font-bold flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-[#002217]">payments</span>
                Budget Tier
              </label>
              <select
                id="hero-budget"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="bg-[#fbf2f0] text-[#1e1b1a] px-3.5 py-2.5 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-[#002217] border border-[#efe6e4]"
              >
                <option value="all">Flexible</option>
                <option value="standard">Under LKR 45,000</option>
                <option value="premium">LKR 45,000 - 60,000</option>
                <option value="luxury">Luxury Custom Tier</option>
              </select>
            </div>

            <div className="pt-2 sm:pt-6">
              <button
                type="submit"
                className="w-full bg-[#002217] hover:bg-[#0f382a] text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg active:scale-95"
              >
                <span className="material-symbols-outlined text-lg">search</span>
                <span>Explore Tours</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
