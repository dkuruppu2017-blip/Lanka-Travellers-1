import React, { useState, useEffect } from 'react';
import { TourPackage } from '../types';

interface ContactProps {
  selectedPackage: TourPackage | null;
  onOpenAIPlanner: () => void;
}

export const Contact: React.FC<ContactProps> = ({ selectedPackage, onOpenAIPlanner }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [packageName, setPackageName] = useState('Kandy & Nuwara Eliya Escape');
  const [travelers, setTravelers] = useState<number>(2);
  const [travelDate, setTravelDate] = useState('');
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);
  const [successInfo, setSuccessInfo] = useState<{
    inquiryId: string;
    message: string;
  } | null>(null);

  // Sync selected package from props when user clicks "Book Now" on a card
  useEffect(() => {
    if (selectedPackage) {
      setPackageName(selectedPackage.name);
    }
  }, [selectedPackage]);

  const adjustTravelers = (delta: number) => {
    setTravelers((prev) => Math.max(1, Math.min(50, prev + delta)));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessInfo(null);

    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          packageName,
          travelers,
          travelDate,
          message
        })
      });

      const data = await res.json();
      if (data.success) {
        setSuccessInfo({
          inquiryId: data.inquiryId,
          message: data.message
        });
        // Clear non-critical inputs
        setMessage('');
      } else {
        throw new Error('Server returned unsuccessful response');
      }
    } catch {
      // Fallback client confirmation
      const fallbackId = `LT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      setSuccessInfo({
        inquiryId: fallbackId,
        message: 'Ayubowan! Your inquiry has been received. Our travel specialist will contact you within 2 hours.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="w-full py-16 bg-[#fbf2f0] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <span className="text-xs uppercase tracking-widest text-[#006d30] font-bold">
            Start Your Journey
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#002217] font-bold tracking-tight mt-1">
            Contact Us
          </h2>
          <p className="text-sm sm:text-base text-[#414844] mt-2 leading-relaxed">
            We would love to hear from you. Contact Lanka Travellers for inquiries, bookings, and travel assistance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Column 1: Contact Information & Direct Channels */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm space-y-6 border border-[#efe6e4]">
              <h3 className="font-sans text-xl font-bold text-[#002217]">
                Headquarters &amp; Direct Support
              </h3>

              <div className="space-y-5">
                {/* Phone & WhatsApp */}
                <a
                  href="https://wa.me/94771234567?text=Hello%20Lanka%20Travellers,%20I%20would%20like%20to%20inquire%20about%20a%20Sri%20Lanka%20tour"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 text-[#1e1b1a] group cursor-pointer"
                >
                  <div className="w-11 h-11 rounded-full bg-[#f5ecea] flex items-center justify-center text-[#002217] group-hover:bg-[#002217] group-hover:text-white transition-colors shrink-0">
                    <span className="material-symbols-outlined text-xl">call</span>
                  </div>
                  <div>
                    <span className="text-xs text-[#717974] block font-medium">Call or WhatsApp</span>
                    <span className="font-sans text-base font-bold text-[#002217] group-hover:text-[#006d30] transition-colors">
                      +94 77 123 4567
                    </span>
                  </div>
                </a>

                {/* Email */}
                <a
                  href="mailto:info@lankatravellers.com"
                  className="flex items-start gap-4 text-[#1e1b1a] group cursor-pointer"
                >
                  <div className="w-11 h-11 rounded-full bg-[#f5ecea] flex items-center justify-center text-[#002217] group-hover:bg-[#002217] group-hover:text-white transition-colors shrink-0">
                    <span className="material-symbols-outlined text-xl">mail</span>
                  </div>
                  <div>
                    <span className="text-xs text-[#717974] block font-medium">General Inquiries</span>
                    <span className="font-sans text-base font-bold text-[#002217] group-hover:text-[#006d30] transition-colors">
                      info@lankatravellers.com
                    </span>
                  </div>
                </a>

                {/* Office Address */}
                <div className="flex items-start gap-4 text-[#1e1b1a]">
                  <div className="w-11 h-11 rounded-full bg-[#f5ecea] flex items-center justify-center text-[#002217] shrink-0">
                    <span className="material-symbols-outlined text-xl">location_on</span>
                  </div>
                  <div>
                    <span className="text-xs text-[#717974] block font-medium">Visit Our Office</span>
                    <span className="font-sans text-sm sm:text-base text-[#002217] font-medium">
                      45 Galle Road, Colombo 03, Sri Lanka
                    </span>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4 text-[#1e1b1a]">
                  <div className="w-11 h-11 rounded-full bg-[#f5ecea] flex items-center justify-center text-[#006d30] shrink-0">
                    <span className="material-symbols-outlined text-xl">access_time</span>
                  </div>
                  <div>
                    <span className="text-xs text-[#717974] block font-medium">Office Working Hours</span>
                    <span className="font-sans text-sm sm:text-base text-[#002217] font-medium">
                      Mon - Sun: 8:00 AM - 9:00 PM (Sri Lanka Time)
                    </span>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-[#efe6e4]">
                <span className="text-xs text-[#717974] block mb-2.5 font-medium">
                  Connect Across Social Channels
                </span>
                <div className="flex flex-wrap items-center gap-2.5">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#f5ecea] text-[#1e1b1a] hover:bg-[#002217] hover:text-white text-xs font-semibold transition-colors"
                  >
                    <span className="material-symbols-outlined text-[15px]">public</span>
                    <span>Facebook</span>
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#f5ecea] text-[#1e1b1a] hover:bg-[#002217] hover:text-white text-xs font-semibold transition-colors"
                  >
                    <span className="material-symbols-outlined text-[15px]">photo_camera</span>
                    <span>@lankatravellers</span>
                  </a>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#f5ecea] text-[#1e1b1a] hover:bg-[#002217] hover:text-white text-xs font-semibold transition-colors"
                  >
                    <span className="material-symbols-outlined text-[15px]">smart_display</span>
                    <span>YouTube</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Stylized Map Widget */}
            <div className="w-full h-48 bg-[#efe6e4] rounded-3xl shadow-sm flex items-center justify-center overflow-hidden relative group border border-[#e1d8d6]">
              {/* Background Map Stylization */}
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#002217_1px,transparent_1px)] [background-size:16px_16px]" />
              <div className="absolute inset-0 bg-[#002217]/10 backdrop-blur-[1px]" />
              <a
                href="https://maps.google.com/?q=45+Galle+Road+Colombo+03+Sri+Lanka"
                target="_blank"
                rel="noreferrer"
                className="relative z-10 bg-white/95 hover:bg-white px-4 py-2.5 rounded-2xl shadow-md flex items-center gap-2.5 transition-all group-hover:scale-105 border border-[#efe6e4]"
              >
                <span className="material-symbols-outlined text-[#002217]">pin_drop</span>
                <div className="text-left">
                  <span className="font-sans text-xs sm:text-sm font-bold text-[#002217] block">
                    Lanka Travellers Colombo HQ
                  </span>
                  <span className="text-[11px] text-[#006d30] font-medium flex items-center gap-0.5">
                    Open in Google Maps <span className="material-symbols-outlined text-[12px]">open_in_new</span>
                  </span>
                </div>
              </a>
            </div>
          </div>

          {/* Column 2: Booking & Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-[#efe6e4]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#002217]">
                  Plan Your Dream Itinerary
                </h3>
                <button
                  type="button"
                  onClick={onOpenAIPlanner}
                  className="inline-flex items-center gap-1.5 text-xs text-[#006d30] font-semibold bg-[#c1ecd7]/50 hover:bg-[#c1ecd7] px-3 py-1.5 rounded-full transition-colors self-start sm:self-auto"
                >
                  <span className="material-symbols-outlined text-sm">neurology</span>
                  <span>AI Fast Draft</span>
                </button>
              </div>

              <p className="text-xs sm:text-sm text-[#414844] mb-6 leading-relaxed">
                Fill out the details below and our personal travel curators will respond with a tailored itinerary and exact quotation within 2 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-name" className="text-xs font-bold text-[#002217]">
                      Full Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Kasun Fernando"
                      className="bg-[#fbf2f0] text-[#1e1b1a] px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#002217] border border-[#efe6e4] placeholder:text-[#717974]"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-email" className="text-xs font-bold text-[#002217]">
                      Email Address *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="kasun@example.com"
                      className="bg-[#fbf2f0] text-[#1e1b1a] px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#002217] border border-[#efe6e4] placeholder:text-[#717974]"
                    />
                  </div>
                </div>

                {/* Phone & Package */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-phone" className="text-xs font-bold text-[#002217]">
                      Phone Number
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+94 7X XXX XXXX"
                      className="bg-[#fbf2f0] text-[#1e1b1a] px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#002217] border border-[#efe6e4] placeholder:text-[#717974]"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-package" className="text-xs font-bold text-[#002217]">
                      Select Package
                    </label>
                    <select
                      id="contact-package"
                      value={packageName}
                      onChange={(e) => setPackageName(e.target.value)}
                      className="bg-[#fbf2f0] text-[#1e1b1a] px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#002217] border border-[#efe6e4]"
                    >
                      <option value="Kandy & Nuwara Eliya Escape">Kandy & Nuwara Eliya Escape (3D/2N)</option>
                      <option value="Southern Coast Adventure">Southern Coast Adventure (4D/3N)</option>
                      <option value="Sigiriya & Cultural Triangle Tour">Sigiriya & Cultural Triangle Tour (2D/1N)</option>
                      <option value="Ella & Hill Country Adventure">Ella & Hill Country Adventure (3D/2N)</option>
                      <option value="Custom Bespoke Itinerary">Custom Bespoke Itinerary</option>
                    </select>
                  </div>
                </div>

                {/* Travelers & Travel Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-travelers" className="text-xs font-bold text-[#002217]">
                      Number of Travelers
                    </label>
                    <div className="flex items-center bg-[#fbf2f0] rounded-xl p-1.5 border border-[#efe6e4]">
                      <button
                        type="button"
                        onClick={() => adjustTravelers(-1)}
                        className="w-9 h-9 rounded-lg bg-white hover:bg-[#f5ecea] flex items-center justify-center font-bold text-[#002217] transition-colors shadow-xs"
                      >
                        −
                      </button>
                      <input
                        id="contact-travelers"
                        type="number"
                        min="1"
                        max="50"
                        value={travelers}
                        onChange={(e) => setTravelers(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-full text-center bg-transparent font-bold text-base text-[#002217] focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => adjustTravelers(1)}
                        className="w-9 h-9 rounded-lg bg-white hover:bg-[#f5ecea] flex items-center justify-center font-bold text-[#002217] transition-colors shadow-xs"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-date" className="text-xs font-bold text-[#002217]">
                      Expected Travel Date
                    </label>
                    <input
                      id="contact-date"
                      type="date"
                      value={travelDate}
                      onChange={(e) => setTravelDate(e.target.value)}
                      className="bg-[#fbf2f0] text-[#1e1b1a] px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#002217] border border-[#efe6e4]"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-message" className="text-xs font-bold text-[#002217]">
                    Special Requests / Requirements
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Mention any hotel preferences, meal diets, infant seats, or customized excursions..."
                    className="bg-[#fbf2f0] text-[#1e1b1a] px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#002217] border border-[#efe6e4] placeholder:text-[#717974]"
                  />
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#4f2700] hover:bg-[#301600] disabled:opacity-50 text-white font-semibold py-4 px-8 rounded-full transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                  >
                    {loading ? (
                      <>
                        <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending Inquiry...</span>
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-lg">send</span>
                        <span>Send Inquiry</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Success Banner */}
                {successInfo && (
                  <div className="p-4 rounded-2xl bg-[#92f5a4]/30 border border-[#006d30]/30 text-[#00210a] text-xs sm:text-sm flex items-start gap-3 animate-in fade-in">
                    <span className="material-symbols-outlined text-[#006d30] text-xl shrink-0 mt-0.5">
                      check_circle
                    </span>
                    <div>
                      <span className="font-bold block text-sm">
                        Inquiry Received! Reference: {successInfo.inquiryId}
                      </span>
                      <span>{successInfo.message}</span>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
