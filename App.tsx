/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CurrencyCode, Destination, GeneratedItinerary, TourPackage } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Destinations } from './components/Destinations';
import { Packages } from './components/Packages';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AIPlannerModal } from './components/AIPlannerModal';
import { PackageModal } from './components/PackageModal';
import { DestinationModal } from './components/DestinationModal';
import { TOUR_PACKAGES } from './data/travelData';

export default function App() {
  const [currentCurrency, setCurrentCurrency] = useState<CurrencyCode>('LKR');
  const [activeSection, setActiveSection] = useState('home');

  // Modals state
  const [isAIPlannerOpen, setIsAIPlannerOpen] = useState(false);
  const [selectedPackageForModal, setSelectedPackageForModal] = useState<TourPackage | null>(null);
  const [selectedDestinationForModal, setSelectedDestinationForModal] = useState<Destination | null>(null);

  // Booking selection for contact form
  const [bookingPackage, setBookingPackage] = useState<TourPackage | null>(null);

  // Filter state passed from Hero Search or Destinations to Packages
  const [filterDestination, setFilterDestination] = useState<string>('all');

  // Track active scroll section for header nav
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'destinations', 'packages', 'about', 'contact'];
      const scrollY = window.scrollY;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop - 120;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handler: Hero search dock
  const handleHeroSearch = (destination: string, _duration: string, _budget: string) => {
    setFilterDestination(destination);
  };

  // Handler: "Book Now" clicked on package card
  const handleBookPackage = (pkg: TourPackage) => {
    setBookingPackage(pkg);
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handler: Destination card click "View Packages"
  const handleFilterByDestination = (destName: string) => {
    setFilterDestination(destName);
    const packagesSection = document.getElementById('packages');
    if (packagesSection) {
      packagesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handler: Apply AI Generated Itinerary to booking form
  const handleApplyAIItineraryToForm = (itinerary: GeneratedItinerary) => {
    // Find closest package or set custom
    const match = TOUR_PACKAGES.find((p) =>
      itinerary.title.toLowerCase().includes(p.name.toLowerCase())
    ) || TOUR_PACKAGES[0];

    setBookingPackage(match);
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#fff8f6] text-[#1e1b1a] flex flex-col font-sans selection:bg-[#c1ecd7] selection:text-[#002217]">
      {/* Header */}
      <Header
        currentCurrency={currentCurrency}
        onCurrencyChange={setCurrentCurrency}
        onOpenAIPlanner={() => setIsAIPlannerOpen(true)}
        activeSection={activeSection}
      />

      {/* Main Content Area */}
      <main className="w-full pt-20 bg-[#fff8f6]">
        {/* 1. Hero Section */}
        <Hero
          onSearch={handleHeroSearch}
          onOpenAIPlanner={() => setIsAIPlannerOpen(true)}
        />

        {/* 2. Featured Destinations */}
        <Destinations
          onSelectDestination={setSelectedDestinationForModal}
          onFilterByDestination={handleFilterByDestination}
        />

        {/* 3. Our Travel Packages */}
        <Packages
          currentCurrency={currentCurrency}
          onBookPackage={handleBookPackage}
          onViewPackageDetails={setSelectedPackageForModal}
          filterDestination={filterDestination}
          onClearDestinationFilter={() => setFilterDestination('all')}
        />

        {/* 4. About Us & Quality Standards */}
        <About />

        {/* 5. Contact & Booking Form */}
        <Contact
          selectedPackage={bookingPackage}
          onOpenAIPlanner={() => setIsAIPlannerOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <AIPlannerModal
        isOpen={isAIPlannerOpen}
        onClose={() => setIsAIPlannerOpen(false)}
        onApplyItineraryToForm={handleApplyAIItineraryToForm}
      />

      <PackageModal
        pkg={selectedPackageForModal}
        onClose={() => setSelectedPackageForModal(null)}
        onBook={handleBookPackage}
        currentCurrency={currentCurrency}
      />

      <DestinationModal
        destination={selectedDestinationForModal}
        onClose={() => setSelectedDestinationForModal(null)}
        onViewPackages={handleFilterByDestination}
      />
    </div>
  );
}
