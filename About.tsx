import React from 'react';
import { WHY_CHOOSE_US, SERVICES_OFFERED } from '../data/travelData';

export const About: React.FC = () => {
  return (
    <section id="about" className="w-full py-16 bg-[#fff8f6] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Main About Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          {/* Left Column: Narrative & Mission/Vision */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <span className="text-xs uppercase tracking-widest text-[#006d30] font-bold">
              Authentic Sri Lankan Hospitality
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#002217] font-bold tracking-tight">
              About Lanka Travellers
            </h2>
            <p className="text-base sm:text-lg text-[#1e1b1a] leading-relaxed">
              Lanka Travellers is a leading travel agency committed to providing high-quality travel experiences across Sri Lanka. Our goal is to showcase the country's rich culture, natural beauty, and hospitality to travelers from around the world.
            </p>

            {/* Vision & Mission Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
              <div className="bg-[#fbf2f0] p-5 rounded-2xl border border-[#efe6e4]">
                <div className="w-10 h-10 rounded-full bg-[#002217] flex items-center justify-center text-white mb-3 shadow-sm">
                  <span className="material-symbols-outlined text-xl">visibility</span>
                </div>
                <h3 className="font-sans text-base font-bold text-[#002217] mb-1">Our Vision</h3>
                <p className="text-xs sm:text-sm text-[#414844] leading-relaxed">
                  To become Sri Lanka's most trusted and respected travel service provider by delivering exceptional travel experiences.
                </p>
              </div>

              <div className="bg-[#fbf2f0] p-5 rounded-2xl border border-[#efe6e4]">
                <div className="w-10 h-10 rounded-full bg-[#006d30] flex items-center justify-center text-white mb-3 shadow-sm">
                  <span className="material-symbols-outlined text-xl">flag</span>
                </div>
                <h3 className="font-sans text-base font-bold text-[#002217] mb-1">Our Mission</h3>
                <p className="text-xs sm:text-sm text-[#414844] leading-relaxed">
                  To provide safe, affordable, and memorable travel opportunities while promoting sustainable tourism throughout Sri Lanka.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Mosaic */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <img
                src="/assets/aistudio/Image_7_0d91d9ad.jpeg"
                alt="Sigiriya fortress cultural heritage"
                className="rounded-2xl shadow-md h-56 w-full object-cover border border-[#efe6e4]"
              />
              <div className="bg-[#002217] text-white p-5 rounded-2xl flex flex-col justify-center shadow-lg">
                <span className="font-serif text-3xl sm:text-4xl font-bold leading-tight text-[#95f8a7]">
                  4.9/5
                </span>
                <span className="text-xs text-[#e9e1df] mt-1 leading-snug">
                  Certified Guest Satisfaction Across 1,400+ Independent Reviews
                </span>
              </div>
            </div>

            <div className="space-y-4 pt-6 sm:pt-8">
              <div className="bg-[#f5ecea] p-5 rounded-2xl flex flex-col justify-center border border-[#efe6e4]">
                <span className="material-symbols-outlined text-[#006d30] text-3xl mb-1">eco</span>
                <span className="font-sans text-base font-bold text-[#002217]">100% Eco-Conscious</span>
                <span className="text-xs text-[#414844] mt-1 leading-relaxed">
                  Carbon-offset tours supporting local conservation sanctuaries and wildlife habitats.
                </span>
              </div>
              <img
                src="/assets/aistudio/Image_6_07fe27eb.jpeg"
                alt="Sri Lankan tea plantation railway"
                className="rounded-2xl shadow-md h-56 w-full object-cover border border-[#efe6e4]"
              />
            </div>
          </div>
        </div>

        {/* Why Choose Lanka Travellers */}
        <div className="mt-16">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs uppercase tracking-widest text-[#006d30] font-bold">
              Uncompromising Quality
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#002217] mt-1">
              Why Choose Lanka Travellers?
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {WHY_CHOOSE_US.map((item, index) => (
              <div
                key={index}
                className="p-5 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow flex items-start gap-4 border border-[#efe6e4]"
              >
                <div className="w-12 h-12 rounded-xl bg-[#c1ecd7] flex items-center justify-center text-[#002217] shrink-0">
                  <span className="material-symbols-outlined text-2xl text-[#006d30]">{item.icon}</span>
                </div>
                <div>
                  <h4 className="font-sans text-base font-bold text-[#002217] mb-1">{item.title}</h4>
                  <p className="text-xs sm:text-sm text-[#414844] leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Services We Offer Bar */}
        <div className="mt-16 p-6 sm:p-8 rounded-3xl bg-[#efe6e4] border border-[#e1d8d6]">
          <h3 className="font-sans text-lg sm:text-xl font-bold text-[#002217] text-center mb-6">
            Services We Offer
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {SERVICES_OFFERED.map((svc, i) => (
              <div
                key={i}
                className="bg-white p-4 rounded-2xl flex flex-col items-center text-center shadow-xs hover:shadow-md transition-all hover:-translate-y-0.5 border border-[#efe6e4]"
              >
                <span className="material-symbols-outlined text-[#002217] text-2xl sm:text-3xl mb-1.5">
                  {svc.icon}
                </span>
                <span className="text-xs font-semibold text-[#1e1b1a]">{svc.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
