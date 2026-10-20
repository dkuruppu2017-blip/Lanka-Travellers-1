import React, { useState } from 'react';
import { GeneratedItinerary } from '../types';

interface AIPlannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyItineraryToForm: (itinerary: GeneratedItinerary) => void;
}

export const AIPlannerModal: React.FC<AIPlannerModalProps> = ({
  isOpen,
  onClose,
  onApplyItineraryToForm
}) => {
  const [destinations, setDestinations] = useState<string[]>(['Sigiriya', 'Kandy', 'Ella']);
  const [duration, setDuration] = useState('7 Days / 6 Nights');
  const [travelers, setTravelers] = useState('2 adults (Couple)');
  const [budgetTier, setBudgetTier] = useState('Boutique & Heritage');
  const [interests, setInterests] = useState<string[]>(['Culture', 'Nature & Tea', 'Photography']);
  const [travelStyle, setTravelStyle] = useState('Balanced & Scenic');
  const [travelDate, setTravelDate] = useState('Upcoming Winter / Spring');
  const [specialNotes, setSpecialNotes] = useState('');

  const [loading, setLoading] = useState(false);
  const [thinkingStep, setThinkingStep] = useState(0);
  const [generatedResult, setGeneratedResult] = useState<GeneratedItinerary | null>(null);
  const [sourceInfo, setSourceInfo] = useState<string>('');

  if (!isOpen) return null;

  const destinationOptions = [
    'Sigiriya',
    'Kandy',
    'Ella',
    'Mirissa',
    'Nuwara Eliya',
    'Galle Fort',
    'Yala Safari',
    'Anuradhapura',
    'Trincomalee'
  ];

  const interestOptions = [
    'Culture & Temples',
    'Nature & Tea',
    'Wildlife & Safari',
    'Photography',
    'Beaches & Surfing',
    'Ayurveda & Spa',
    'Food & Culinary',
    'Scenic Railways'
  ];

  const toggleDestination = (dest: string) => {
    setDestinations((prev) =>
      prev.includes(dest) ? prev.filter((d) => d !== dest) : [...prev, dest]
    );
  };

  const toggleInterest = (interest: string) => {
    setInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setGeneratedResult(null);

    // Thinking simulation steps for visual feedback
    const stepsInterval = setInterval(() => {
      setThinkingStep((prev) => (prev + 1) % 4);
    }, 1800);

    try {
      const res = await fetch('/api/plan-itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destinations,
          duration,
          travelers,
          budgetTier,
          interests,
          travelStyle,
          travelDate,
          specialNotes
        })
      });

      const data = await res.json();
      if (data.itinerary) {
        setGeneratedResult(data.itinerary);
        setSourceInfo(data.source === 'gemini-4-argon' ? 'Gemini 4 Argon (High Thinking)' : 'Ceylon Expedition Archives');
      }
    } catch (err) {
      console.error('Error requesting AI itinerary:', err);
    } finally {
      clearInterval(stepsInterval);
      setLoading(false);
    }
  };

  const thinkingStepsText = [
    'Gemini 4 Argon is reasoning: Calculating mountain transit times and hill-climb curves...',
    'Analyzing seasonal monsoonal micro-climates across Central & Southern provinces...',
    'Balancing cultural heritage sites with scenic photography lighting windows...',
    'Synthesizing day-by-day luxury stops and curated Ceylon naturalist recommendations...'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-[#efe6e4]">
        {/* Header */}
        <div className="bg-[#002217] text-white p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#0f382a] flex items-center justify-center text-[#95f8a7] border border-[#95f8a7]/30">
              <span className="material-symbols-outlined text-2xl">neurology</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-xl sm:text-2xl font-bold">
                  Bespoke Ceylon Trip Architect
                </h3>
                <span className="bg-[#95f8a7] text-[#00210a] text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                  Gemini 4 Argon
                </span>
              </div>
              <p className="text-xs text-[#a5d0bc]">
                Powered by High Thinking mode for complex multi-destination routing &amp; logistics
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6 flex-1">
          {!generatedResult && !loading ? (
            <form onSubmit={handleGenerate} className="space-y-6">
              {/* Destinations */}
              <div>
                <label className="text-xs uppercase tracking-wider font-bold text-[#002217] block mb-2">
                  1. Select Target Destinations in Sri Lanka
                </label>
                <div className="flex flex-wrap gap-2">
                  {destinationOptions.map((dest) => {
                    const isSelected = destinations.includes(dest);
                    return (
                      <button
                        key={dest}
                        type="button"
                        onClick={() => toggleDestination(dest)}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-[#002217] text-[#95f8a7] border border-[#95f8a7]/40 shadow-xs'
                            : 'bg-[#f5ecea] text-[#414844] hover:bg-[#efe6e4]'
                        }`}
                      >
                        {isSelected ? '✓ ' : '+ '}
                        {dest}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Trip Settings */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#002217]">Duration</label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="bg-[#fbf2f0] text-[#1e1b1a] px-3.5 py-2.5 rounded-xl text-xs sm:text-sm border border-[#efe6e4] focus:ring-2 focus:ring-[#002217]"
                  >
                    <option value="3 Days / 2 Nights">3 Days / 2 Nights (Short Break)</option>
                    <option value="5 Days / 4 Nights">5 Days / 4 Nights (Highlights)</option>
                    <option value="7 Days / 6 Nights">7 Days / 6 Nights (Classic Circuit)</option>
                    <option value="10 Days / 9 Nights">10 Days / 9 Nights (Comprehensive)</option>
                    <option value="14 Days / 13 Nights">14 Days / 13 Nights (Grand Ceylon Grand Tour)</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#002217]">Travelers Profile</label>
                  <select
                    value={travelers}
                    onChange={(e) => setTravelers(e.target.value)}
                    className="bg-[#fbf2f0] text-[#1e1b1a] px-3.5 py-2.5 rounded-xl text-xs sm:text-sm border border-[#efe6e4] focus:ring-2 focus:ring-[#002217]"
                  >
                    <option value="2 adults (Couple / Honeymoon)">Couple / Romantic Honeymoon</option>
                    <option value="Family with young children (2 adults, 2 kids)">Family with Children</option>
                    <option value="Small friend group (4 adults)">Small Group of Friends</option>
                    <option value="Solo Adventurer">Solo Adventurer</option>
                    <option value="Seniors / Leisure Travelers">Senior Travelers (Gentle Pace)</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#002217]">Accommodation Tier</label>
                  <select
                    value={budgetTier}
                    onChange={(e) => setBudgetTier(e.target.value)}
                    className="bg-[#fbf2f0] text-[#1e1b1a] px-3.5 py-2.5 rounded-xl text-xs sm:text-sm border border-[#efe6e4] focus:ring-2 focus:ring-[#002217]"
                  >
                    <option value="Boutique & Heritage 4-Star">Boutique &amp; Heritage (Recommended)</option>
                    <option value="Ultra-Luxury 5-Star Villas & Tea Bungalows">Ultra-Luxury &amp; Tea Bungalows</option>
                    <option value="Comfortable Eco-Lodges & Guest Houses">Comfort &amp; Scenic Eco-Lodges</option>
                  </select>
                </div>
              </div>

              {/* Interests */}
              <div>
                <label className="text-xs uppercase tracking-wider font-bold text-[#002217] block mb-2">
                  2. Traveler Passions &amp; Focus
                </label>
                <div className="flex flex-wrap gap-2">
                  {interestOptions.map((interest) => {
                    const isSelected = interests.includes(interest);
                    return (
                      <button
                        key={interest}
                        type="button"
                        onClick={() => toggleInterest(interest)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-[#006d30] text-white shadow-xs'
                            : 'bg-[#f5ecea] text-[#414844] hover:bg-[#efe6e4]'
                        }`}
                      >
                        {isSelected ? '✓ ' : '+ '}
                        {interest}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Special Requests */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#002217]">
                  Special Requests or Constraints (Optional)
                </label>
                <input
                  type="text"
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  placeholder="e.g. Vegetarian dining, preferred train window seats, need gentle hikes without steep staircases..."
                  className="bg-[#fbf2f0] text-[#1e1b1a] px-4 py-3 rounded-xl text-xs sm:text-sm border border-[#efe6e4] focus:ring-2 focus:ring-[#002217]"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#002217] hover:bg-[#0f382a] text-white font-semibold py-4 px-6 rounded-2xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-xl text-[#95f8a7]">auto_awesome</span>
                  <span>Synthesize Custom Itinerary with High Thinking</span>
                </button>
              </div>
            </form>
          ) : null}

          {/* Loading State with High Thinking indicator */}
          {loading && (
            <div className="py-16 text-center space-y-5">
              <div className="relative inline-flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-[#c1ecd7] border-t-[#006d30] rounded-full animate-spin" />
                <span className="material-symbols-outlined text-2xl text-[#002217] absolute">
                  psychology
                </span>
              </div>
              <div className="max-w-md mx-auto space-y-2">
                <h4 className="font-serif text-lg font-bold text-[#002217]">
                  Gemini 4 Argon High Thinking in Progress
                </h4>
                <p className="text-xs text-[#006d30] font-medium animate-pulse">
                  {thinkingStepsText[thinkingStep]}
                </p>
                <div className="w-48 h-1 bg-[#efe6e4] rounded-full mx-auto overflow-hidden">
                  <div className="w-1/2 h-full bg-[#006d30] rounded-full animate-indeterminate" />
                </div>
              </div>
            </div>
          )}

          {/* Generated Result Display */}
          {generatedResult && !loading && (
            <div className="space-y-6 animate-in fade-in">
              {/* Header Box */}
              <div className="bg-[#fbf2f0] p-5 sm:p-6 rounded-3xl border border-[#efe6e4] space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="bg-[#c1ecd7] text-[#002217] text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                    {generatedResult.duration}
                  </span>
                  <span className="text-xs text-[#717974] flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm text-[#006d30]">verified</span>
                    Curated via {sourceInfo}
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#002217]">
                  {generatedResult.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#414844] leading-relaxed">
                  {generatedResult.overview}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-[#efe6e4]">
                  <div>
                    <span className="text-[11px] text-[#717974] block font-semibold uppercase tracking-wider">
                      Best Travel Season
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-[#002217]">
                      {generatedResult.bestSeason}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] text-[#717974] block font-semibold uppercase tracking-wider">
                      Estimated Cost Guide
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-[#4f2700]">
                      {generatedResult.estimatedCost?.lkr || 'LKR 165,000'} ({generatedResult.estimatedCost?.usd || '$550 USD'})
                    </span>
                  </div>
                </div>
              </div>

              {/* Day-by-Day Itinerary */}
              <div className="space-y-4">
                <h4 className="font-sans text-base font-bold text-[#002217] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#006d30]">route</span>
                  <span>Day-by-Day Detailed Schedule</span>
                </h4>

                <div className="space-y-3">
                  {generatedResult.days?.map((day) => (
                    <div
                      key={day.day}
                      className="p-4 sm:p-5 rounded-2xl bg-white border border-[#efe6e4] shadow-xs hover:border-[#79a28f] transition-all space-y-2.5"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="w-7 h-7 rounded-full bg-[#002217] text-[#95f8a7] text-xs font-bold flex items-center justify-center shrink-0">
                            {day.day}
                          </span>
                          <span className="font-serif text-base font-bold text-[#002217]">
                            {day.title}
                          </span>
                        </div>
                        <span className="text-[11px] font-semibold text-[#006d30] bg-[#c1ecd7]/50 px-2.5 py-0.5 rounded-full">
                          {day.location}
                        </span>
                      </div>

                      {day.driveTime && (
                        <div className="flex items-center gap-1.5 text-xs text-[#717974]">
                          <span className="material-symbols-outlined text-[14px]">directions_car</span>
                          <span>Transit: {day.driveTime}</span>
                        </div>
                      )}

                      {day.highlights && day.highlights.length > 0 && (
                        <ul className="text-xs text-[#414844] space-y-1 pl-4 list-disc marker:text-[#006d30]">
                          {day.highlights.map((h, i) => (
                            <li key={i}>{h}</li>
                          ))}
                        </ul>
                      )}

                      {day.expertTip && (
                        <div className="p-2.5 rounded-xl bg-[#fbf2f0] text-[11px] text-[#4f2700] border-l-2 border-[#4f2700] flex items-start gap-1.5">
                          <span className="material-symbols-outlined text-sm shrink-0">tips_and_updates</span>
                          <span><strong>Expedition Tip:</strong> {day.expertTip}</span>
                        </div>
                      )}

                      {day.stay && (
                        <div className="text-[11px] text-[#717974]">
                          <strong>Lodging Style:</strong> {day.stay}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Inclusions & Advice */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-[#f5ecea] border border-[#efe6e4]">
                  <span className="text-xs font-bold text-[#002217] block mb-2">
                    Key Expedition Inclusions
                  </span>
                  <ul className="text-xs text-[#414844] space-y-1.5 pl-4 list-disc marker:text-[#006d30]">
                    {generatedResult.inclusions?.map((inc, i) => (
                      <li key={i}>{inc}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-[#f5ecea] border border-[#efe6e4]">
                  <span className="text-xs font-bold text-[#002217] block mb-2">
                    Weather &amp; Packing Insight
                  </span>
                  <p className="text-xs text-[#414844] leading-relaxed mb-2">
                    {generatedResult.weatherNotes}
                  </p>
                  <p className="text-[11px] text-[#717974]">
                    {generatedResult.travelerAdvice}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#efe6e4]">
                <button
                  type="button"
                  onClick={() => setGeneratedResult(null)}
                  className="px-4 py-2.5 rounded-full text-xs font-semibold text-[#414844] hover:bg-[#f5ecea] transition-colors"
                >
                  ← Reconfigure Preferences
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onApplyItineraryToForm(generatedResult);
                    onClose();
                  }}
                  className="bg-[#4f2700] hover:bg-[#301600] text-white px-6 py-3 rounded-full text-xs sm:text-sm font-semibold transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">book_online</span>
                  <span>Book This AI Plan (Autofill Inquiry)</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
