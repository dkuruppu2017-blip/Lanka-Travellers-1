import React from 'react';
import { Destination } from '../types';

interface DestinationModalProps {
  destination: Destination | null;
  onClose: () => void;
  onViewPackages: (destName: string) => void;
}

export const DestinationModal: React.FC<DestinationModalProps> = ({
  destination,
  onClose,
  onViewPackages
}) => {
  if (!destination) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-3xl max-h-[92vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-[#efe6e4]">
        {/* Header Hero */}
        <div className="relative h-60 sm:h-72 w-full shrink-0">
          <img
            src={destination.image}
            alt={destination.name}
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
            <span className="bg-[#95f8a7] text-[#00210a] text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-2 inline-block">
              {destination.region}
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold leading-tight">
              {destination.name}
            </h3>
            <p className="text-xs sm:text-sm text-[#e9e1df] mt-1 font-medium">
              {destination.tagline}
            </p>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6 flex-1">
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-[#fbf2f0] border border-[#efe6e4]">
            <div>
              <span className="text-[11px] text-[#717974] block uppercase tracking-wider font-semibold">
                Best Travel Season
              </span>
              <span className="text-xs sm:text-sm font-bold text-[#002217]">
                {destination.bestTime}
              </span>
            </div>
            <div>
              <span className="text-[11px] text-[#717974] block uppercase tracking-wider font-semibold">
                Elevation / Altitude
              </span>
              <span className="text-xs sm:text-sm font-bold text-[#002217]">
                {destination.altitude}
              </span>
            </div>
            <div>
              <span className="text-[11px] text-[#717974] block uppercase tracking-wider font-semibold">
                Recommended Stay
              </span>
              <span className="text-xs sm:text-sm font-bold text-[#002217]">
                {destination.recommendedStay}
              </span>
            </div>
          </div>

          <div>
            <h4 className="font-sans text-base font-bold text-[#002217] mb-2">About {destination.name}</h4>
            <p className="text-xs sm:text-sm text-[#414844] leading-relaxed">
              {destination.description}
            </p>
          </div>

          {/* Highlights */}
          <div>
            <h4 className="font-sans text-base font-bold text-[#002217] mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#006d30]">star</span>
              <span>Must-Experience Highlights</span>
            </h4>
            <ul className="space-y-2 pl-4 list-disc text-xs sm:text-sm text-[#414844] marker:text-[#006d30]">
              {destination.highlights.map((h, i) => (
                <li key={i} className="leading-relaxed">{h}</li>
              ))}
            </ul>
          </div>

          {/* Key Attractions Nearby */}
          <div>
            <h4 className="font-sans text-base font-bold text-[#002217] mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#006d30]">explore</span>
              <span>Key Surrounding Attractions</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {destination.keyAttractions.map((attraction, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-xl bg-[#f5ecea] text-xs font-semibold text-[#002217] border border-[#efe6e4]"
                >
                  {attraction}
                </span>
              ))}
            </div>
          </div>

          {/* Action */}
          <div className="pt-4 border-t border-[#efe6e4] flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="text-xs font-semibold text-[#717974] hover:text-[#002217]"
            >
              Close Guide
            </button>
            <button
              type="button"
              onClick={() => {
                onViewPackages(destination.name);
                onClose();
              }}
              className="bg-[#002217] hover:bg-[#0f382a] text-white px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all shadow-md"
            >
              View Tours Covering {destination.name}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
