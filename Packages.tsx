import React, { useState } from 'react';
import { CurrencyCode, TourPackage } from '../types';
import { TOUR_PACKAGES, formatPrice } from '../data/travelData';

interface PackagesProps {
  currentCurrency: CurrencyCode;
  onBookPackage: (pkg: TourPackage) => void;
  onViewPackageDetails: (pkg: TourPackage) => void;
  filterDestination?: string;
  onClearDestinationFilter?: () => void;
}

export const Packages: React.FC<PackagesProps> = ({
  currentCurrency,
  onBookPackage,
  onViewPackageDetails,
  filterDestination,
  onClearDestinationFilter
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filterButtons = [
    { id: 'all', label: 'All Expeditions' },
    { id: 'cultural', label: 'Cultural & Heritage' },
    { id: 'hill', label: 'Hill Country' },
    { id: 'coastal', label: 'Coastal Adventure' },
  ];

  const filteredPackages = TOUR_PACKAGES.filter((pkg) => {
    // Category match
    const categoryMatch = selectedCategory === 'all' || pkg.category === selectedCategory;

    // Destination match if filtered from search or destinations section
    if (!filterDestination || filterDestination === 'all') {
      return categoryMatch;
    }
    const destLower = filterDestination.toLowerCase();
    const pkgText = `${pkg.name} ${pkg.location} ${pkg.description}`.toLowerCase();
    return categoryMatch && pkgText.includes(destLower);
  });

  return (
    <section id="packages" className="w-full py-16 bg-[#fbf2f0] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header & Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#006d30] font-bold">
              Curated Ceylon Expeditions
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#002217] font-bold tracking-tight mt-1">
              Our Travel Packages
            </h2>
            <p className="text-sm sm:text-base text-[#414844] mt-2 max-w-xl leading-relaxed">
              Choose from hand-crafted all-inclusive itineraries complete with private air-conditioned transport, certified naturalists, and luxury boutique lodging.
            </p>
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap items-center gap-2">
            {filterButtons.map((btn) => {
              const active = selectedCategory === btn.id;
              return (
                <button
                  key={btn.id}
                  type="button"
                  onClick={() => setSelectedCategory(btn.id)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    active
                      ? 'bg-[#002217] text-white shadow-sm'
                      : 'bg-[#f5ecea] text-[#414844] hover:text-[#002217] hover:bg-[#efe6e4]'
                  }`}
                >
                  {btn.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Filter info banner if active */}
        {filterDestination && filterDestination !== 'all' && (
          <div className="mb-6 p-3 bg-[#c1ecd7]/30 border border-[#79a28f]/40 rounded-xl flex items-center justify-between text-xs sm:text-sm text-[#002217]">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-base text-[#006d30]">filter_alt</span>
              <span>
                Showing filtered expeditions for: <strong className="font-bold">{filterDestination}</strong>
              </span>
            </div>
            {onClearDestinationFilter && (
              <button
                type="button"
                onClick={onClearDestinationFilter}
                className="font-semibold text-[#006d30] hover:underline"
              >
                Clear Filter
              </button>
            )}
          </div>
        )}

        {/* Packages Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#efe6e4] group"
            >
              {/* Card Image with badges */}
              <div
                className="relative h-56 overflow-hidden cursor-pointer"
                onClick={() => onViewPackageDetails(pkg)}
              >
                <img
                  src={pkg.image}
                  alt={pkg.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />

                {/* Duration Badge */}
                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-[#002217] flex items-center gap-1 shadow-sm">
                  <span className="material-symbols-outlined text-[14px] text-[#4f2700]">schedule</span>
                  <span>{pkg.duration}</span>
                </div>

                {/* Region Tag */}
                <div className="absolute bottom-3 left-3 bg-[#002217]/85 backdrop-blur-md text-white text-[11px] font-medium px-2.5 py-0.5 rounded-full">
                  {pkg.location}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  {/* Category & Rating */}
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="text-[11px] uppercase tracking-wider text-[#006d30] font-bold">
                      {pkg.categoryLabel}
                    </span>
                    <div className="flex items-center text-[#4f2700] text-xs font-bold gap-0.5">
                      <span className="material-symbols-outlined text-[14px] text-amber-500 fill-current">
                        star
                      </span>
                      <span>
                        {pkg.rating.toFixed(1)} ({pkg.reviewsCount})
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    onClick={() => onViewPackageDetails(pkg)}
                    className="font-serif text-xl font-bold text-[#002217] mb-2 hover:text-[#006d30] cursor-pointer transition-colors leading-snug"
                  >
                    {pkg.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#414844] mb-4 leading-relaxed line-clamp-3">
                    {pkg.description}
                  </p>

                  {/* Included Experiences Chips */}
                  <div className="mb-4">
                    <span className="text-[11px] font-bold text-[#002217] block mb-1.5 uppercase tracking-wider">
                      Included Experiences:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {pkg.includedExperiences.map((exp, i) => (
                        <span
                          key={i}
                          className="bg-[#f5ecea] px-2 py-0.5 rounded text-[11px] font-medium text-[#414844]"
                        >
                          {exp}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Price and CTA */}
                <div className="pt-4 border-t border-[#efe6e4] flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-[#717974] block">Price per guest</span>
                    <span className="font-sans text-lg font-bold text-[#002217]">
                      {formatPrice(pkg.priceLKR, currentCurrency)}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => onViewPackageDetails(pkg)}
                      className="p-2 text-[#414844] hover:text-[#002217] hover:bg-[#f5ecea] rounded-full transition-colors text-xs font-medium"
                      title="View day-by-day itinerary"
                    >
                      <span className="material-symbols-outlined text-base">visibility</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onBookPackage(pkg)}
                      className="bg-[#4f2700] hover:bg-[#301600] text-white px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-1 shadow-sm hover:shadow active:scale-95 cursor-pointer"
                    >
                      <span>Book Now</span>
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* If no package matches filter */}
        {filteredPackages.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-[#efe6e4] p-8">
            <span className="material-symbols-outlined text-4xl text-[#717974] mb-2">search_off</span>
            <h3 className="font-serif text-xl font-bold text-[#002217] mb-1">No matching tours found</h3>
            <p className="text-sm text-[#414844] mb-4">
              Try adjusting your filter or let our AI architect design a custom itinerary for you.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                if (onClearDestinationFilter) onClearDestinationFilter();
              }}
              className="bg-[#002217] text-white px-5 py-2.5 rounded-full text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
