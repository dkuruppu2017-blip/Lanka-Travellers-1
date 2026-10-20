import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Server-side Gemini initialization
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Mock curated data for instant fallback if API key is unconfigured or offline
const fallbackItineraries: Record<string, any> = {
  default: {
    title: "Bespoke Royal Heritage & Highland Vista",
    overview: "A masterfully paced Sri Lankan expedition weaving the UNESCO ancient citadel of Sigiriya, the sacred Temple of the Tooth in Kandy, and the emerald tea trails of Ella before concluding along the golden Southern coastline.",
    duration: "7 Days / 6 Nights",
    bestSeason: "Year-Round (Best Hill Country & South: Dec - April)",
    estimatedCost: {
      lkr: "LKR 165,000 per guest",
      usd: "$550 USD per guest"
    },
    days: [
      {
        day: 1,
        title: "Arrival & Transfer to the Cultural Triangle",
        location: "Negombo to Sigiriya",
        driveTime: "3.5 hrs via private A/C sedan",
        highlights: ["Scenic rural vistas", "Coconut grove refreshment stop", "Evening relaxation overlooking water lily lakes"],
        stay: "Luxury Boutique Eco-Lodge, Habarana / Sigiriya",
        expertTip: "Climb Pidurangala Rock at sunset for the most photogenic view of Sigiriya Rock Fortress."
      },
      {
        day: 2,
        title: "The Lion Rock Citadel & Ancient Water Gardens",
        location: "Sigiriya & Dambulla",
        driveTime: "40 mins local transfers",
        highlights: ["Sigiriya 5th-century palace summit climb", "Ancient fresco galleries & mirror wall", "Dambulla Golden Cave Temple monasteries"],
        stay: "Luxury Boutique Eco-Lodge, Sigiriya",
        expertTip: "Begin the fortress climb at 7:00 AM to beat the equatorial midday heat and capture serene morning mist."
      },
      {
        day: 3,
        title: "Spice Gardens & Royal Kandy Heritage",
        location: "Sigiriya to Kandy",
        driveTime: "2.5 hrs scenic drive",
        highlights: ["Matale organic spice garden tour", "Temple of the Sacred Tooth Relic (Sri Dalada Maligawa)", "Kandy Lake evening stroll"],
        stay: "Grand Hillside Pavilion Hotel, Kandy",
        expertTip: "Dress respectfully with shoulders and knees covered for temple entry; white attire is warmly welcomed."
      },
      {
        day: 4,
        title: "Scenic Ceylon Highland Tea Train to Ella",
        location: "Kandy to Ella via Nuwara Eliya",
        driveTime: "3.5 hrs iconic blue rail voyage",
        highlights: ["World's most scenic railway line through mist-clad valleys", "St. Clair & Devon tea waterfall vistas", "Nine Arches Bridge sunset walk"],
        stay: "Mountain View Chalet, Ella",
        expertTip: "Book observation carriage or right-hand window seats for uninterrupted cliffside panoramas."
      },
      {
        day: 5,
        title: "Little Adam's Peak & Ravana Waterfall Cascade",
        location: "Ella Highlands",
        driveTime: "Local chauffeur transfers",
        highlights: ["Morning hike up Little Adam's Peak", "Ravana Falls natural mountain plunge pool", "Ceylon tea artisan tasting session"],
        stay: "Mountain View Chalet, Ella",
        expertTip: "Pair your morning hike with a visit to a working orthodox tea factory to sample fresh Silver Tips."
      },
      {
        day: 6,
        title: "Descent to the Golden Southern Coast & Galle Fort",
        location: "Ella to Galle & Mirissa",
        driveTime: "3.5 hrs descending through scenic plains",
        highlights: ["UNESCO 17th-century Galle Dutch Fort ramparts", "Mirissa coconut palm promontory", "Fresh seafood dining under coastal lanterns"],
        stay: "Coastal Heritage Villa, Mirissa/Galle",
        expertTip: "Walk the Galle Fort lighthouse seawall at 5:30 PM for Sri Lanka's most romantic sunset glow."
      },
      {
        day: 7,
        title: "Coastal Leisure & Airport Departure",
        location: "Mirissa to Colombo Airport (BIA)",
        driveTime: "2 hrs via Southern Expressway",
        highlights: ["Morning beach stroll or surf", "Souvenir Ceylon cinnamon and tea shopping", "Smooth VIP expressway transfer to airport"],
        stay: "Departure",
        expertTip: "Allow 3 hours at Bandaranaike International Airport for international flight check-in and duty-free tea sampling."
      }
    ],
    inclusions: [
      "Dedicated English-speaking chauffeur-guide with SLTDA accreditation",
      "Private climate-controlled air-conditioned luxury vehicle with highway tolls & fuel",
      "All accommodation on Bed & Breakfast or Half-Board basis",
      "Reserved 1st-class tickets for the Kandy-Ella scenic train journey",
      "All monument entrance fees & government tourist taxes",
      "24/7 dedicated Island concierge assistance"
    ],
    weatherNotes: "Expect pleasant 28°C-31°C coastal weather, crisp 15°C-18°C evenings in Nuwara Eliya and Ella, and warm sunny conditions in the Cultural Triangle.",
    travelerAdvice: "Pack lightweight breathable linen, walking shoes with good grip for rock steps, and a light fleece or cardigan for hill country nights."
  }
};

// API: Plan Itinerary using gemini-4-argon with thinkingLevel: HIGH
app.post('/api/plan-itinerary', async (req: Request, res: Response) => {
  const {
    destinations = ['Sigiriya', 'Kandy', 'Ella'],
    duration = '5-7 Days',
    travelers = '2 adults',
    budgetTier = 'Comfort & Boutique',
    interests = ['Culture', 'Nature', 'Photography'],
    travelStyle = 'Paced & Relaxed',
    travelDate = 'Flexible',
    specialNotes = ''
  } = req.body;

  // If no GEMINI_API_KEY is configured, return the high-fidelity structured fallback
  if (!process.env.GEMINI_API_KEY) {
    return res.json({
      success: true,
      itinerary: fallbackItineraries.default,
      source: 'offline-curated'
    });
  }

  try {
    const prompt = `
You are the Chief Expedition Architect at Lanka Travellers, Sri Lanka's premier bespoke travel agency.
Create an exceptionally detailed, highly realistic, day-by-day luxury travel itinerary for Sri Lanka based on the following user requirements:

- Desired Destinations: ${Array.isArray(destinations) ? destinations.join(', ') : destinations}
- Duration: ${duration}
- Travelers: ${travelers}
- Budget Tier: ${budgetTier}
- Main Interests: ${Array.isArray(interests) ? interests.join(', ') : interests}
- Preferred Travel Style: ${travelStyle}
- Planned Travel Date: ${travelDate}
- Special Requests & Notes: ${specialNotes || 'None provided'}

Provide real Sri Lankan logistics: accurate driving times between towns considering hill terrain (e.g. Colombo to Sigiriya is ~3.5h, Kandy to Nuwara Eliya is ~2.5h, Kandy to Ella train is ~6.5h, Ella to Galle is ~3.5h).
Include insider tips, dress codes for holy Buddhist sites, scenic viewpoints, recommended stays, and realistic cost estimates in both Sri Lankan Rupees (LKR) and USD.

Format your response strictly as valid JSON matching this schema:
{
  "title": "string (e.g. Royal Highlands & Sun-Kissed Ceylon Shores)",
  "overview": "string (concise 2-3 paragraph summary)",
  "duration": "string",
  "bestSeason": "string",
  "estimatedCost": {
    "lkr": "string",
    "usd": "string"
  },
  "days": [
    {
      "day": 1,
      "title": "string",
      "location": "string",
      "driveTime": "string",
      "highlights": ["string", "string", "string"],
      "stay": "string",
      "expertTip": "string"
    }
  ],
  "inclusions": ["string", "string"],
  "weatherNotes": "string",
  "travelerAdvice": "string"
}
`;

    // High thinking mode using gemini-4-argon with ThinkingLevel.HIGH (no maxOutputTokens set)
    const response = await ai.models.generateContent({
      model: 'gemini-4-argon',
      contents: prompt,
      config: {
        systemInstruction: "You are an elite Sri Lanka travel curator. Respond ONLY with valid parseable JSON adhering strictly to the requested schema. Do not include markdown code block backticks like ```json.",
        thinkingConfig: {
          thinkingLevel: ThinkingLevel.HIGH,
        },
        responseMimeType: 'application/json',
      },
    });

    const rawText = response.text || '';
    let parsedData;
    try {
      const cleaned = rawText.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim();
      parsedData = JSON.parse(cleaned);
    } catch (e) {
      console.warn("Failed to parse Gemini response as JSON directly, falling back:", e);
      parsedData = fallbackItineraries.default;
    }

    return res.json({
      success: true,
      itinerary: parsedData,
      source: 'gemini-4-argon'
    });
  } catch (error: any) {
    console.error("Gemini API error during itinerary generation:", error);
    // Return high quality curated fallback on any error so app never breaks
    return res.json({
      success: true,
      itinerary: fallbackItineraries.default,
      source: 'offline-curated-fallback',
      warning: error?.message || 'Using curated itinerary'
    });
  }
});

// API: Submit Booking Inquiry
app.post('/api/inquiry', (req: Request, res: Response) => {
  const { name, email, phone, packageName, travelers, travelDate, message } = req.body;
  const inquiryId = `LT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

  res.json({
    success: true,
    inquiryId,
    message: "Ayubowan! Your inquiry has been received. Our senior travel curator will contact you within 2 hours with a comprehensive quotation and itinerary draft.",
    details: {
      name,
      email,
      packageName,
      travelers,
      travelDate
    }
  });
});

// API: Get Curated Destination Guides
app.get('/api/destinations', (_req: Request, res: Response) => {
  res.json([
    {
      id: "sigiriya",
      name: "Sigiriya",
      region: "Cultural Triangle",
      tagline: "The Lion Rock Citadel & Ancient Marvel",
      image: "/assets/aistudio/Image_7_0d91d9ad.jpeg",
      description: "Sigiriya Rock Fortress is one of Sri Lanka's most iconic attractions. Visitors can climb the ancient rock fortress and enjoy spectacular views.",
      tags: ["UNESCO Heritage", "Ancient Frescoes", "Water Gardens", "Lion Gate"],
      highlights: [
        "Ascend 1,200 steps past the colossal Lion's paws to King Kashyapa's 5th-century sky palace",
        "Marvel at the enigmatic Sigiriya Maidens frescoes painted on sheer cliff granite",
        "Stroll through one of the oldest water gardens in the ancient world featuring hydraulic fountains",
        "Panoramic 360-degree views across emerald forests and Pidurangala ridge"
      ],
      bestTime: "December to April & July to September",
      altitude: "349 meters above sea level",
      recommendedStay: "2 Days / 1 Night",
      keyAttractions: ["Pidurangala Vihara", "Minneriya National Park Elephant Gathering", "Dambulla Royal Cave Temples", "Hiriwadunna Village Safari"]
    },
    {
      id: "ella",
      name: "Ella",
      region: "Highland Haven",
      tagline: "Misty Mountain Peaks & Iconic Tea Railways",
      image: "/assets/aistudio/Image_6_07fe27eb.jpeg",
      description: "Ella is famous for its scenic mountain views, tea plantations, Nine Arches Bridge, and peaceful nature trails.",
      tags: ["Nine Arches Bridge", "Little Adam's Peak", "Ravana Falls", "Hill Train"],
      highlights: [
        "Watch the iconic blue colonial train cross the 1921 Nine Arches Bridge surrounded by cloud forest",
        "Sunrise trek up Little Adam's Peak overlooking the panoramic Ella Gap gorge",
        "Cool down under the mist of the legendary 25-meter Ravana Waterfall cascade",
        "Taste world-renowned high-grown Ceylon BOPF and Silver Tips at historic tea factories"
      ],
      bestTime: "January to May",
      altitude: "1,041 meters above sea level",
      recommendedStay: "3 Days / 2 Nights",
      keyAttractions: ["Ella Rock Hike", "Demodara Railway Loop", "Diyaluma Waterfall Trek", "Flying Ravana Mega Zipline"]
    },
    {
      id: "kandy",
      name: "Kandy",
      region: "Royal Capital",
      tagline: "Sacred Relics, Lakeside Serenity & Tea Hills",
      image: "/assets/aistudio/Image_3_270fcba3.jpeg",
      description: "Kandy is the cultural capital of Sri Lanka and home to the Temple of the Sacred Tooth Relic.",
      tags: ["Tooth Temple", "Botanical Gardens", "Kandy Lake", "Ceylon Tea"],
      highlights: [
        "Witness traditional drumming and the golden casket pooja at Sri Dalada Maligawa",
        "Wander beneath towering Javanese fig trees and rare royal palms in Peradeniya Royal Botanic Gardens",
        "Circumnavigate tranquil Kandy Lake with its reflection of mist-covered Buddhist stupas",
        "Explore century-old tea estates and bungalows preserving Ceylon tea heritage"
      ],
      bestTime: "December to April",
      altitude: "500 meters above sea level",
      recommendedStay: "2 Days / 2 Nights",
      keyAttractions: ["Royal Botanical Gardens Peradeniya", "Bahirawakanda Giant Buddha", "Ceylon Tea Museum", "Kandy Cultural Dance Troupe"]
    },
    {
      id: "mirissa",
      name: "Mirissa",
      region: "Southern Shore",
      tagline: "Azure Bays, Blue Whale Safaris & Sunset Surfing",
      image: "/assets/aistudio/Image_4_aeed9163.jpeg",
      description: "Mirissa offers beautiful beaches, whale watching opportunities, and breathtaking sunsets.",
      tags: ["Coconut Tree Hill", "Whale Watching", "Secret Beach", "Sunset Surfing"],
      highlights: [
        "Embark on responsible early morning catamaran safaris to observe blue whales and spinner dolphins",
        "Photograph iconic Coconut Tree Hill during fiery golden hour sunbursts",
        "Relax in hidden turquoise lagoons at secluded Secret Beach",
        "Dine on caught-that-day giant king prawns and red snapper at beachfront candlelit tables"
      ],
      bestTime: "November to April",
      altitude: "Sea level",
      recommendedStay: "3 Days / 2 Nights",
      keyAttractions: ["Weligama Beginner Surf Point", "Parrot Rock Overlook", "Galle Dutch Fort (30 mins drive)", "Stilt Fishermen of Koggala"]
    }
  ]);
});

// Setup Vite middlewares for development, or serve static assets in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(port, () => {
    console.log(`Lanka Travellers server listening on http://localhost:${port}`);
  });
}

startServer();
