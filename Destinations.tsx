import React from 'react';
import { Destination } from '../types';
import { DESTINATIONS } from '../data/travelData';

interface DestinationsProps {
  onSelectDestination: (destination: Destination) => void;
  onFilterByDestination: (destinationName: string) => void;
}

export const Destinations: React.FC<DestinationsProps> = ({
  onSelectDestination,
  onFilterByDestination
}) => {
  return (
    <section id="destinations" className="w-full pt-28 pb-16 bg-[#fff8f6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-widest text-[#006d30] font-bold">
              Unveil The Island
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#002217] font-bold tracking-tight mt-1">
              Featured Destinations
            </h2>
            <p className="text-sm sm:text-base text-[#414844] mt-2 leading-relaxed">
              From majestic mist-shrouded citadel rocks and sprawling hill tea terraces to golden sun-drenched coastlines, explore Sri Lanka's extraordinary geographical tapestry.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#002217] bg-[#fbf2f0] px-3.5 py-2 rounded-full border border-[#efe6e4] self-start md:self-auto">
            <span className="material-symbols-outlined text-[#006d30] text-base">explore</span>
            <span>4 Iconic Provinces</span>
          </div>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {DESTINATIONS.map((dest) => (
            <article
              key={dest.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col border border-[#efe6e4]"
            >
              {/* Card Image */}
              <div className="relative h-60 overflow-hidden cursor-pointer" onClick={() => onSelectDestination(dest)}>
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <span className="absolute top-3 left-3 bg-[#002217]/85 backdrop-blur-md text-white text-[11px] font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                  {dest.region}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectDestination(dest);
                  }}
                  className="absolute bottom-3 right-3 bg-white/90 hover:bg-white text-[#002217] p-1.5 rounded-full shadow transition-all opacity-0 group-hover:opacity-100"
                  title="View travel guide"
                >
                  <span className="material-symbols-outlined text-base">info</span>
                </button>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3
                    onClick={() => onSelectDestination(dest)}
                    className="font-serif text-2xl font-bold text-[#002217] mb-1.5 hover:text-[#006d30] cursor-pointer transition-colors"
                  >
                    {dest.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#414844] mb-4 leading-relaxed line-clamp-3">
                    {dest.description}
                  </p>
                </div>

                <div>
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {dest.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-0.5 rounded-full bg-[#f5ecea] text-[11px] font-medium text-[#414844]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-2 border-t border-[#efe6e4]">
                    <button
                      type="button"
                      onClick={() => onFilterByDestination(dest.name)}
                      className="inline-flex items-center text-xs font-bold text-[#002217] group-hover:text-[#006d30] transition-colors gap-1"
                    >
                      <span>View {dest.name} Packages</span>
                      <span className="material-symbols-outlined text-[15px] group-hover:translate-x-0.5 transition-transform">
                        chevron_right
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onSelectDestination(dest)}
                      className="text-xs text-[#717974] hover:text-[#002217] underline underline-offset-2"
                    >
                      Guide
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
