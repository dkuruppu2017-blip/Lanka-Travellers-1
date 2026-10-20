import { CurrencyCode, Destination, TourPackage } from '../types';

export const CURRENCY_CONFIG: Record<CurrencyCode, { symbol: string; label: string; rateToLKR: number }> = {
  LKR: { symbol: 'Rs', label: 'LKR (Rs)', rateToLKR: 1 },
  USD: { symbol: '$', label: 'USD ($)', rateToLKR: 300 },
  EUR: { symbol: '€', label: 'EUR (€)', rateToLKR: 325 },
  GBP: { symbol: '£', label: 'GBP (£)', rateToLKR: 385 },
};

export function formatPrice(priceLKR: number, currency: CurrencyCode): string {
  const config = CURRENCY_CONFIG[currency];
  if (currency === 'LKR') {
    return `LKR ${priceLKR.toLocaleString()}`;
  }
  const converted = Math.round(priceLKR / config.rateToLKR);
  return `${config.symbol}${converted.toLocaleString()} ${currency}`;
}

export const DESTINATIONS: Destination[] = [
  {
    id: 'sigiriya',
    name: 'Sigiriya',
    region: 'Cultural Triangle',
    tagline: 'Ancient Rock Citadel & UNESCO Wonder',
    image: '/assets/aistudio/Image_7_0d91d9ad.jpeg',
    description: "Sigiriya Rock Fortress is one of Sri Lanka's most iconic attractions. Visitors can climb the ancient rock fortress and enjoy spectacular views.",
    tags: ['UNESCO Heritage', 'Ancient Frescoes', 'Water Gardens', 'Lion Gate'],
    highlights: [
      'Scale 1,200 historic stairs past massive lion paws to the summit palace of King Kashyapa',
      'View 1,500-year-old preserved celestial maiden frescoes painted on the sheer cliff face',
      'Explore sophisticated ancient water gardens, moats, and gravity-fed hydraulic fountains',
      'Panoramic 360-degree vistas across the central Sri Lankan jungle canopy'
    ],
    bestTime: 'December to April & July to September',
    altitude: '349 meters above sea level',
    recommendedStay: '2 Days / 1 Night',
    keyAttractions: ['Pidurangala Rock', 'Dambulla Golden Cave Temple', 'Minneriya Wild Elephant Safari', 'Hiriwadunna Eco-Village']
  },
  {
    id: 'ella',
    name: 'Ella',
    region: 'Highland Haven',
    tagline: 'Misty Mountains & Colonial Tea Railways',
    image: '/assets/aistudio/Image_6_07fe27eb.jpeg',
    description: "Ella is famous for its scenic mountain views, tea plantations, Nine Arches Bridge, and peaceful nature trails.",
    tags: ['Nine Arches Bridge', "Little Adam's Peak", 'Ravana Falls', 'Hill Train'],
    highlights: [
      'Photograph the iconic blue train traversing the 1921 stone Nine Arches Bridge in the mist',
      'Hike Little Adam\'s Peak at sunrise for breathtaking 360-degree views over Ella Gap',
      'Swim in the natural cascade pools beneath the legendary 25-meter Ravana Falls',
      'Sample freshly plucked Ceylon high-grown black and white tea at century-old tea estates'
    ],
    bestTime: 'January to May (driest hill country climate)',
    altitude: '1,041 meters above sea level',
    recommendedStay: '3 Days / 2 Nights',
    keyAttractions: ['Ella Rock Trek', 'Demodara Railway Spiral', 'Diyaluma Waterfall', 'Flying Ravana Mega Zipline']
  },
  {
    id: 'kandy',
    name: 'Kandy',
    region: 'Royal Capital',
    tagline: 'Sacred Relics, Botanical Splendor & Tea Hills',
    image: '/assets/aistudio/Image_3_270fcba3.jpeg',
    description: "Kandy is the cultural capital of Sri Lanka and home to the Temple of the Sacred Tooth Relic.",
    tags: ['Tooth Temple', 'Botanical Gardens', 'Kandy Lake', 'Ceylon Tea'],
    highlights: [
      'Partake in the daily morning and evening Pooja ceremonies at the Temple of the Sacred Tooth Relic',
      'Stroll through Peradeniya Royal Botanic Gardens home to 4,000+ plant species and giant palm avenues',
      'Sunset walking circuit along the serene waters of central Kandy Lake',
      'Experience a lively Kandyan cultural dance and fire-walking performance'
    ],
    bestTime: 'December to April & July to August (Esala Perahera festival)',
    altitude: '500 meters above sea level',
    recommendedStay: '2 Days / 2 Nights',
    keyAttractions: ['Royal Botanical Gardens Peradeniya', 'Bahirawakanda Giant Buddha', 'Ceylon Tea Museum Hantana', 'Udawatta Kele Forest Sanctuary']
  },
  {
    id: 'mirissa',
    name: 'Mirissa',
    region: 'Southern Shore',
    tagline: 'Golden Sands, Whale Safaris & Sunset Surf',
    image: '/assets/aistudio/Image_4_aeed9163.jpeg',
    description: "Mirissa offers beautiful beaches, whale watching opportunities, and breathtaking sunsets.",
    tags: ['Coconut Tree Hill', 'Whale Watching', 'Secret Beach', 'Sunset Surfing'],
    highlights: [
      'Embark on morning catamaran whale watching cruises to encounter Blue Whales and playful dolphins',
      'Capture postcard-worthy photos at Coconut Tree Hill overlooking crashing Indian Ocean waves',
      'Relax in crystal-clear tide pools at secluded Secret Beach flanked by palm cliffs',
      'Savor freshly caught ocean seafood prepared with Sri Lankan spices on candlelit beach sands'
    ],
    bestTime: 'November to April (calmest ocean waters)',
    altitude: 'Sea level',
    recommendedStay: '3 Days / 2 Nights',
    keyAttractions: ['Weligama Bay Surf Schools', 'Parrot Rock Island', 'Galle Dutch Fort (30 mins drive)', 'Koggala Stilt Fishermen']
  }
];

export const TOUR_PACKAGES: TourPackage[] = [
  {
    id: 'kandy-nuwara-eliya',
    name: 'Kandy & Nuwara Eliya Escape',
    slug: 'kandy-nuwara-eliya-escape',
    category: 'hill',
    categoryLabel: 'Central Highlands',
    subCategory: 'Hill Country & Cultural',
    duration: '3 Days / 2 Nights',
    durationDays: 3,
    durationNights: 2,
    location: 'Kandy & Nuwara Eliya',
    image: '/assets/aistudio/Image_3_270fcba3.jpeg',
    rating: 4.9,
    reviewsCount: 128,
    priceLKR: 45000,
    description: "Explore the cultural city of Kandy and enjoy the cool climate of Nuwara Eliya. Visit tea plantations, botanical gardens, Gregory Lake, and the Temple of the Sacred Tooth Relic.",
    includedExperiences: ['Temple Visit', 'Tea Factory Tour', 'Sightseeing', 'Boat Ride'],
    detailedItinerary: [
      {
        dayNumber: 1,
        title: 'Arrival in Kandy & Sacred Temple of the Tooth',
        description: 'Meet your private chauffeur guide and transfer through scenic pineapple plantations to Kandy. Visit the Royal Botanical Gardens of Peradeniya before attending the evening Pooja ceremony at Sri Dalada Maligawa (Temple of the Sacred Tooth Relic).',
        highlights: ['Peradeniya Orchid Collection', 'Temple of the Tooth Relic', 'Kandy Lake Walk'],
        mealsIncluded: 'Dinner included',
        stayLocation: 'Boutique Hotel in Kandy'
      },
      {
        dayNumber: 2,
        title: 'Ascent to Little England (Nuwara Eliya) & Tea Country',
        description: 'Drive upward through mist-shrouded mountain passes. Stop at Ramboda Falls and tour a working heritage tea plantation and orthodox processing factory. Arrive in Nuwara Eliya for Victorian colonial architecture and Gregory Lake leisure.',
        highlights: ['Ramboda Waterfall Viewpoint', 'Pedro Tea Estate Processing & Tasting', 'Lake Gregory Pedal Boating'],
        mealsIncluded: 'Breakfast & Dinner included',
        stayLocation: 'Colonial Style Lodge, Nuwara Eliya'
      },
      {
        dayNumber: 3,
        title: 'Victoria Park & Scenic Return Descent',
        description: 'Morning walk through landscaped Victoria Park and the historic Nuwara Eliya Post Office. Enjoy panoramic views of Sri Lanka\'s highest peaks before your chauffeur comfortably drives you to your onward destination or airport.',
        highlights: ['Victoria Park Bird Watching', 'Colonial Post Office Souvenirs', 'Panoramic mountain pass drive'],
        mealsIncluded: 'Breakfast included',
        stayLocation: 'End of Tour / Colombo Transfer'
      }
    ],
    inclusions: [
      'Private air-conditioned vehicle with dedicated English-speaking chauffeur',
      '2 nights accommodation in handpicked 4-star boutique hotels',
      'Daily breakfast and dinner (Half-Board)',
      'Entry tickets to Temple of the Tooth & Peradeniya Botanical Gardens',
      'Guided Ceylon Tea Factory tour with tea tasting',
      'All vehicle parking fees, highway tolls, and driver allowances'
    ],
    exclusions: [
      'International flights & Sri Lanka tourist visa (ETA)',
      'Lunches and alcoholic beverages',
      'Personal travel insurance & camera permits',
      'Optional tipping for driver and local guides'
    ]
  },
  {
    id: 'southern-coast-adventure',
    name: 'Southern Coast Adventure',
    slug: 'southern-coast-adventure',
    category: 'coastal',
    categoryLabel: 'Ocean & Heritage',
    subCategory: 'Coast & Marine Safari',
    duration: '4 Days / 3 Nights',
    durationDays: 4,
    durationNights: 3,
    location: 'Galle & Mirissa',
    image: '/assets/aistudio/Image_4_aeed9163.jpeg',
    rating: 5.0,
    reviewsCount: 210,
    priceLKR: 55000,
    description: "Experience the beauty of Sri Lanka's southern coastline with golden beaches, whale watching tours, and historical attractions.",
    includedExperiences: ['Beach Leisure', 'Whale Watching', 'Galle Fort Tour', 'Photography'],
    detailedItinerary: [
      {
        dayNumber: 1,
        title: 'Transfer to Galle Fort & Sunset at the Ramparts',
        description: 'Travel along the scenic Southern Expressway to UNESCO World Heritage Galle Fort. Discover cobblestone alleys, 17th-century Dutch colonial architecture, boutique artisan shops, and watch the sunset from the ocean lighthouse ramparts.',
        highlights: ['Galle Dutch Fort Walking Tour', 'Flag Rock & Seawall Sunset', 'Historic Lighthouse'],
        mealsIncluded: 'Dinner included',
        stayLocation: 'Heritage Hotel within Galle Fort / Unawatuna'
      },
      {
        dayNumber: 2,
        title: 'Mirissa Blue Whale Cruise & Coconut Tree Hill',
        description: 'Early morning cruise from Mirissa Harbour with experienced marine naturalists to view Blue Whales, Sperm Whales, and spinner dolphins. In the afternoon, visit Coconut Tree Hill and relax in the calm waters of Mirissa Bay.',
        highlights: ['Responsible Whale Watching Boat Tour', 'Coconut Tree Hill Golden Hour', 'Beachfront Seafood Dinner'],
        mealsIncluded: 'Breakfast & Seafood Dinner',
        stayLocation: 'Beachfront Resort, Mirissa'
      },
      {
        dayNumber: 3,
        title: 'Secret Beach Exploration & Weligama Surf Culture',
        description: 'Morning excursion to secluded Secret Beach surrounded by palm-fringed cliffs. Afternoon visit to Weligama Bay for a gentle beginner surf lesson or relaxation with fresh king coconut water.',
        highlights: ['Secret Beach Tide Pools', 'Weligama Surf Point', 'Ayurvedic Herbal Massage (optional)'],
        mealsIncluded: 'Breakfast included',
        stayLocation: 'Beachfront Resort, Mirissa'
      },
      {
        dayNumber: 4,
        title: 'Stilt Fishermen, Madu River Mangroves & Departure',
        description: 'Observe traditional stilt fishermen in Koggala. On the drive back toward Colombo, take an eco-boat safari through the mangrove tunnels of the Madu River with cinnamon peeling demonstration.',
        highlights: ['Koggala Stilt Fishermen', 'Madu River Mangrove Safari', 'Cinnamon Island visit'],
        mealsIncluded: 'Breakfast included',
        stayLocation: 'Transfer to Colombo / Airport'
      }
    ],
    inclusions: [
      'Private climate-controlled transport throughout',
      '3 nights accommodation in beachfront resort / luxury boutique hotels',
      'Whale watching boat tickets with safety vests and naturalist briefing',
      'Guided walking tour of UNESCO Galle Fort',
      'Madu River mangrove boat safari tickets',
      'Dedicated 24/7 travel coordinator assistance'
    ],
    exclusions: [
      'Visa fees & international airfare',
      'Personal water sports equipment rentals',
      'Gratuities and incidental hotel expenses'
    ]
  },
  {
    id: 'sigiriya-cultural-triangle',
    name: 'Sigiriya & Cultural Triangle Tour',
    slug: 'sigiriya-cultural-triangle-tour',
    category: 'cultural',
    categoryLabel: 'Ancient Wonders',
    subCategory: 'Heritage & Archaeology',
    duration: '2 Days / 1 Night',
    durationDays: 2,
    durationNights: 1,
    location: 'Sigiriya, Dambulla & Polonnaruwa',
    image: '/assets/aistudio/Image_7_0d91d9ad.jpeg',
    rating: 4.8,
    reviewsCount: 94,
    priceLKR: 40000,
    description: "Discover Sri Lanka's ancient heritage by exploring the Cultural Triangle, including Sigiriya Rock Fortress and Dambulla Cave Temple.",
    includedExperiences: ['Historical Site Visits', 'Guided Tours', 'Cultural Experience'],
    detailedItinerary: [
      {
        dayNumber: 1,
        title: 'Golden Dambulla Cave Temples & Minneriya Safari',
        description: 'Depart from Colombo or Kandy towards Dambulla. Climb to the five sacred painted caves containing 150+ Buddha statues and ancient murals. In the late afternoon, embark on an open-top 4x4 jeep safari in Minneriya National Park to observe wild elephant herds.',
        highlights: ['Dambulla UNESCO Cave Monasteries', 'Minneriya Wild Elephant Gathering', 'Evening Lake Dinner'],
        mealsIncluded: 'Dinner included',
        stayLocation: 'Jungle Eco-Lodge, Sigiriya / Habarana'
      },
      {
        dayNumber: 2,
        title: 'Sigiriya Lion Rock Fortress Dawn Climb & Departure',
        description: 'Early morning ascent of Sigiriya Rock Fortress in the cool morning air before the crowds. Walk through the water gardens, admire the frescoes, pass the giant Lion Paws, and stand on King Kashyapa\'s summit throne with 360-degree jungle views.',
        highlights: ['Sigiriya Lion Rock Citadel', 'Ancient Mirror Wall & Frescoes', 'Hiriwadunna Village Lunch (Traditional Rice & Curry)'],
        mealsIncluded: 'Breakfast & Traditional Village Lunch',
        stayLocation: 'Return Transfer to Colombo or Kandy'
      }
    ],
    inclusions: [
      'Private air-conditioned car with licensed chauffeur-guide',
      '1 night at boutique resort with swimming pool in Sigiriya',
      'Sigiriya Rock Fortress UNESCO entrance ticket',
      'Dambulla Cave Temple entrance ticket',
      'Minneriya Safari 4x4 Jeep hire and park permits',
      'Authentic village catamaran ride and clay-pot lunch'
    ],
    exclusions: [
      'Alcoholic drinks & personal snacks',
      'Tips for jeep driver and safari tracker'
    ]
  },
  {
    id: 'ella-hill-country',
    name: 'Ella & Hill Country Adventure',
    slug: 'ella-hill-country-adventure',
    category: 'hill',
    categoryLabel: 'Trek & Panorama',
    subCategory: 'Highland Hiking & Scenic Train',
    duration: '3 Days / 2 Nights',
    durationDays: 3,
    durationNights: 2,
    location: 'Ella Highland',
    image: '/assets/aistudio/Image_6_07fe27eb.jpeg',
    rating: 4.9,
    reviewsCount: 176,
    priceLKR: 48000,
    description: "Enjoy the breathtaking scenery of Sri Lanka's hill country. Visit Nine Arches Bridge, Little Adam's Peak, and Ravana Falls.",
    includedExperiences: ['Nature Hiking', 'Train Journey', 'Photography', 'Waterfall Visit'],
    detailedItinerary: [
      {
        dayNumber: 1,
        title: 'Arrival in Ella & Little Adam\'s Peak Sunset Hike',
        description: 'Arrive in the charming mountain town of Ella. Check into your valley-view chalet. In the late afternoon, take an easy 45-minute hike up Little Adam\'s Peak through tea bushes to watch the sunset paint Ella Gap in golden hues.',
        highlights: ['Little Adam\'s Peak Panorama', 'Chill out at hillside cafes', 'Ella Gap twilight'],
        mealsIncluded: 'Dinner included',
        stayLocation: 'Valley View Chalet, Ella'
      },
      {
        dayNumber: 2,
        title: 'Iconic Scenic Train Ride & Nine Arches Bridge',
        description: 'Board the world-famous blue highland train for a thrilling journey through mountain tunnels and tea terraces. Afterwards, hike to Demodara Nine Arches Bridge to photograph the locomotive emerging against the jungle canopy.',
        highlights: ['Highland scenic train voyage', 'Nine Arches Bridge train photo session', 'Ravana Pool Club or Zip line'],
        mealsIncluded: 'Breakfast & Dinner included',
        stayLocation: 'Valley View Chalet, Ella'
      },
      {
        dayNumber: 3,
        title: 'Ravana Falls, Diyaluma Waterfall & Tea Heritage',
        description: 'Visit the rushing cascades of Ravana Falls. Continue to upper Diyaluma Falls for natural infinity rock pools, followed by a guided tour of a premier organic Ceylon tea factory before your departure transfer.',
        highlights: ['Ravana Falls Photography', 'Diyaluma Natural Rock Pools', 'Ceylon Tea Factory tour'],
        mealsIncluded: 'Breakfast included',
        stayLocation: 'Transfer to Southern Coast or Airport'
      }
    ],
    inclusions: [
      'Private comfortable vehicle with English-speaking chauffeur',
      '2 nights in panoramic mountain view accommodation',
      'Reserved 1st-class scenic train tickets',
      'Guided treks to Nine Arches Bridge & Little Adam\'s Peak',
      'Tea factory tour and freshly brewed tea tasting',
      'Round-the-clock local support'
    ],
    exclusions: [
      'Optional Flying Ravana Zip line ticket',
      'Personal hiking gear and beverages'
    ]
  }
];

export const WHY_CHOOSE_US = [
  {
    icon: 'supervisor_account',
    title: 'Experienced Travel Guides',
    description: 'Licensed chauffeur-guides fluent in history, flora, wildlife, and native customs.'
  },
  {
    icon: 'sell',
    title: 'Affordable Travel Packages',
    description: 'Transparent pricing with zero hidden surcharges and direct local vendor rates.'
  },
  {
    icon: 'headset_mic',
    title: '24/7 Customer Support',
    description: 'Dedicated round-the-clock trip coordinators on WhatsApp and voice assistance.'
  },
  {
    icon: 'edit_calendar',
    title: 'Customized Travel Plans',
    description: 'Tailored schedules crafted specifically around your personal pace and interests.'
  },
  {
    icon: 'directions_car',
    title: 'Reliable Transportation',
    description: 'Fully insured, modern, climate-controlled fleet ranging from sedans to luxury coaches.'
  },
  {
    icon: 'verified_user',
    title: 'Professional Service Standards',
    description: 'SLTDA-accredited protocols ensuring maximum traveler safety and comfort.'
  }
];

export const SERVICES_OFFERED = [
  { icon: 'map', label: 'Local Tour Packages' },
  { icon: 'hotel', label: 'Hotel Reservations' },
  { icon: 'flight_takeoff', label: 'Airport Transfers' },
  { icon: 'event_available', label: 'Holiday Planning' },
  { icon: 'hiking', label: 'Adventure Tours' },
  { icon: 'temple_buddhist', label: 'Cultural Excursions' },
];
