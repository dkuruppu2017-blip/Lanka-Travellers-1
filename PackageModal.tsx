import React from 'react';
import { CurrencyCode, TourPackage } from '../types';
import { formatPrice } from '../data/travelData';

interface PackageModalProps {
  pkg: TourPackage | null;
  onClose: () => void;
  onBook: (pkg: TourPackage) => void;
  currentCurrency: CurrencyCode;
}

export const PackageModal: React.FC<PackageModalProps> = ({
  pkg,
  onClose,
  onBook,
  currentCurrency
}) => {
  if (!pkg) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-3xl max-h-[92vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-[#efe6e4]">
        {/* Header Hero */}
        <div className="relative h-60 sm:h-72 w-full shrink-0">
          <img
            src={pkg.image}
            alt={pkg.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#002217] via-[#002217]/50 to-transparent" />

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>

          {/* Title and Badge */}
          <div className="absolute bottom-5 left-5 right-5 text-white">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="bg-[#95f8a7] text-[#00210a] text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                {pkg.duration}
              </span>
              <span className="bg-white/20 backdrop-blur-md text-white text-[11px] px-2.5 py-0.5 rounded-full">
                {pkg.categoryLabel}
              </span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold leading-tight">
              {pkg.name}
            </h3>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6 flex-1">
          {/* Overview & Pricing Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#fbf2f0] border border-[#efe6e4]">
            <div>
              <span className="text-xs text-[#717974] block">Package Rate</span>
              <span className="font-sans text-xl sm:text-2xl font-bold text-[#002217]">
                {formatPrice(pkg.priceLKR, currentCurrency)}
              </span>
              <span className="text-[11px] text-[#717974] ml-1">/ per guest all-inclusive</span>
            </div>
            <button
              type="button"
              onClick={() => {
                onBook(pkg);
                onClose();
              }}
              className="bg-[#4f2700] hover:bg-[#301600] text-white px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all shadow-md self-start sm:self-auto cursor-pointer"
            >
              Book This Package
            </button>
          </div>

          <div>
            <h4 className="font-sans text-base font-bold text-[#002217] mb-2">Expedition Summary</h4>
            <p className="text-xs sm:text-sm text-[#414844] leading-relaxed">
              {pkg.description}
            </p>
          </div>

          {/* Day-by-Day Itinerary */}
          <div>
            <h4 className="font-sans text-base font-bold text-[#002217] mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#006d30]">calendar_month</span>
              <span>Day-by-Day Journey Itinerary</span>
            </h4>
            <div className="space-y-4">
              {pkg.detailedItinerary.map((day) => (
                <div
                  key={day.dayNumber}
                  className="p-4 rounded-2xl bg-[#fbf2f0] border border-[#efe6e4] space-y-2"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#002217] text-[#95f8a7] text-xs font-bold flex items-center justify-center shrink-0">
                      {day.dayNumber}
                    </span>
                    <h5 className="font-serif text-sm sm:text-base font-bold text-[#002217]">
                      {day.title}
                    </h5>
                  </div>
                  <p className="text-xs text-[#414844] leading-relaxed pl-8">
                    {day.description}
                  </p>
                  <div className="pl-8 pt-1 flex flex-wrap items-center gap-2 text-[11px] text-[#717974]">
                    <span className="font-medium text-[#006d30]">Meals: {day.mealsIncluded}</span>
                    <span>•</span>
                    <span>Stay: {day.stayLocation}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Inclusions & Exclusions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-[#c1ecd7]/30 border border-[#79a28f]/30">
              <span className="text-xs font-bold text-[#002217] block mb-2 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#006d30] text-base">check_circle</span>
                <span>Included in Package</span>
              </span>
              <ul className="text-xs text-[#414844] space-y-1.5 pl-4 list-disc marker:text-[#006d30]">
                {pkg.inclusions.map((inc, i) => (
                  <li key={i}>{inc}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-[#ffdad6]/30 border border-[#ba1a1a]/20">
              <span className="text-xs font-bold text-[#002217] block mb-2 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#ba1a1a] text-base">cancel</span>
                <span>Exclusions</span>
              </span>
              <ul className="text-xs text-[#414844] space-y-1.5 pl-4 list-disc marker:text-[#ba1a1a]">
                {pkg.exclusions.map((exc, i) => (
                  <li key={i}>{exc}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
