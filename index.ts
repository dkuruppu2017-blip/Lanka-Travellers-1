export type CurrencyCode = 'LKR' | 'USD' | 'EUR' | 'GBP';

export interface CurrencyRate {
  code: CurrencyCode;
  symbol: string;
  rateToLKR: number; // 1 unit in LKR
}

export interface Destination {
  id: string;
  name: string;
  region: string;
  tagline: string;
  image: string;
  description: string;
  tags: string[];
  highlights: string[];
  bestTime: string;
  altitude: string;
  recommendedStay: string;
  keyAttractions: string[];
}

export interface PackageDay {
  dayNumber: number;
  title: string;
  description: string;
  highlights: string[];
  mealsIncluded: string;
  stayLocation: string;
}

export interface TourPackage {
  id: string;
  name: string;
  slug: string;
  category: 'cultural' | 'hill' | 'coastal' | 'wildlife';
  categoryLabel: string;
  subCategory: string;
  duration: string;
  durationDays: number;
  durationNights: number;
  location: string;
  image: string;
  rating: number;
  reviewsCount: number;
  priceLKR: number;
  description: string;
  includedExperiences: string[];
  detailedItinerary: PackageDay[];
  inclusions: string[];
  exclusions: string[];
}

export interface ItineraryDay {
  day: number;
  title: string;
  location: string;
  driveTime: string;
  highlights: string[];
  stay: string;
  expertTip: string;
}

export interface GeneratedItinerary {
  title: string;
  overview: string;
  duration: string;
  bestSeason: string;
  estimatedCost: {
    lkr: string;
    usd: string;
  };
  days: ItineraryDay[];
  inclusions: string[];
  weatherNotes: string;
  travelerAdvice: string;
}

export interface InquiryFormData {
  name: string;
  email: string;
  phone: string;
  packageName: string;
  travelers: number;
  travelDate: string;
  message: string;
}
