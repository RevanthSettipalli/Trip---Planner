import { TripItinerary, DayItinerary, ItineraryStop, StopCategory, TimeOfDay } from './types';

// Pre-configured rich destination presets for instant high-detail generation
export const DESTINATION_PRESETS: Record<string, {
  destination: string;
  currency: string;
  avgDailyCost: number;
  themes: string[];
  stopsPool: Array<{
    title: string;
    category: StopCategory;
    timeOfDay: TimeOfDay;
    durationMinutes: number;
    estimatedCost: number;
    locationName: string;
    description: string;
    insiderTip: string;
  }>;
  packing: Array<{ category: any; item: string }>;
}> = {
  tokyo: {
    destination: "Tokyo, Japan",
    currency: "USD",
    avgDailyCost: 350,
    themes: ["Historic Asakusa & Skytree", "Anime, Manga & Gaming", "Shibuya Scramble & Shrines", "Digital Art & Seafood Market"],
    stopsPool: [
      { title: "Senso-ji Temple & Nakamise Dori", category: "sightseeing", timeOfDay: "morning", durationMinutes: 120, estimatedCost: 0, locationName: "Asakusa, Taito", description: "Walk through Kaminarimon Gate and explore Tokyo's oldest Buddhist temple.", insiderTip: "Try freshly baked Ningyo-yaki cakes at Nakamise Dori stalls." },
      { title: "Tempura Lunch at Daikokuya", category: "food", timeOfDay: "afternoon", durationMinutes: 75, estimatedCost: 25, locationName: "1-38-10 Asakusa", description: "Traditional sesame-oil fried tempura served over rice with rich dark sauce.", insiderTip: "Arrive 15 minutes before 11:30 AM to avoid lines." },
      { title: "Akihabara Electric Town Hunt", category: "activity", timeOfDay: "afternoon", durationMinutes: 180, estimatedCost: 50, locationName: "Soto-Kanda, Chiyoda", description: "Browse 6 floors of retro video games and collectibles at Super Potato.", insiderTip: "Floor 5 has playable retro 80s arcade cabinets." },
      { title: "Memory Lane Yakitori Alley", category: "food", timeOfDay: "evening", durationMinutes: 120, estimatedCost: 35, locationName: "Shinjuku West Exit", description: "Atmospheric narrow alleyway packed with tiny smoky izakayas.", insiderTip: "Order a cold Asahi beer with tare-seasoned chicken skewers." },
      { title: "Shibuya Sky Sunset View", category: "sightseeing", timeOfDay: "evening", durationMinutes: 90, estimatedCost: 22, locationName: "Shibuya Scramble Square", description: "Open-air 360-degree observation deck 229 meters above Shibuya Crossing.", insiderTip: "Book sunset time slots 4 weeks ahead online." },
      { title: "teamLab Planets Digital Museum", category: "activity", timeOfDay: "morning", durationMinutes: 150, estimatedCost: 32, locationName: "Toyosu, Koto City", description: "Walk barefoot through water filled with glowing digital koi fish.", insiderTip: "Wear pants that roll up above the knees easily." },
    ],
    packing: [
      { category: "Essentials", item: "Suica / Pasmo IC Transport Card" },
      { category: "Electronics", item: "Portable Power Bank (10,000 mAh)" },
      { category: "Clothing", item: "Slip-on walking shoes (for temples)" },
      { category: "Miscellaneous", item: "Coin Pouch for Yen coins" },
    ]
  },
  paris: {
    destination: "Paris, France",
    currency: "EUR",
    avgDailyCost: 380,
    themes: ["Montmartre Cobblestones & Artists", "Louvre Masterpieces & Tuileries", "Le Marais Bistros & Shopping", "Seine Sunset & Eiffel Glow"],
    stopsPool: [
      { title: "Fresh Croissants at Du Pain et des Idées", category: "food", timeOfDay: "morning", durationMinutes: 45, estimatedCost: 10, locationName: "34 Rue Yves Toudic", description: "World-famous pistachio snail pastry and buttery sourdough bread.", insiderTip: "Pair with an espresso from the neighboring corner café." },
      { title: "Montmartre Hill & Sacré-Cœur", category: "sightseeing", timeOfDay: "morning", durationMinutes: 120, estimatedCost: 0, locationName: "18th Arrondissement", description: "Wander past open-air painters, vintage windmills, and Sacré-Cœur basilica.", insiderTip: "Get your portrait sketched by local open-air artists at Place du Tertre." },
      { title: "Louvre Museum Highlights Tour", category: "activity", timeOfDay: "afternoon", durationMinutes: 180, estimatedCost: 22, locationName: "Rue de Rivoli", description: "Marvel at the Mona Lisa, Venus de Milo, and Winged Victory of Samothrace.", insiderTip: "Enter via the Porte des Lions entrance to bypass main pyramid queues." },
      { title: "Seine River Sunset Cruise", category: "relaxation", timeOfDay: "evening", durationMinutes: 90, estimatedCost: 25, locationName: "Pont Neuf Pier", description: "Glide past illuminated Notre-Dame cathedral and sparkling Eiffel Tower.", insiderTip: "Grab a seat on the top open deck 20 minutes before departure." },
      { title: "Classic French Bistro Dinner at Le Relais", category: "food", timeOfDay: "night", durationMinutes: 120, estimatedCost: 55, locationName: "Saint-Germain-des-Prés", description: "Savor steak frites served with secret herb butter sauce and house wine.", insiderTip: "Save room for their homemade chocolate profiteroles." },
    ],
    packing: [
      { category: "Essentials", item: "Passport & Contactless Payment Card" },
      { category: "Clothing", item: "Stylish Scarf & Comfortable Walking Boots" },
      { category: "Electronics", item: "European Type C Plug Adapter" },
    ]
  },
  newyork: {
    destination: "New York City, USA",
    currency: "USD",
    avgDailyCost: 400,
    themes: ["Midtown Landmarks & Central Park", "Lower Manhattan & Brooklyn Bridge", "Broadway & West Village Dining", "SoHo Boutiques & Rooftop Views"],
    stopsPool: [
      { title: "Bagel & Coffee at Ess-a-Bagel", category: "food", timeOfDay: "morning", durationMinutes: 45, estimatedCost: 14, locationName: "831 3rd Ave, Midtown", description: "Classic hand-rolled NYC bagel with scallion cream cheese and lox.", insiderTip: "Order on the express line if you're taking it to go." },
      { title: "Central Park Rowboats & Conservatory", category: "relaxation", timeOfDay: "morning", durationMinutes: 120, estimatedCost: 20, locationName: "Central Park, Manhattan", description: "Stroll Bethesda Terrace, Bow Bridge, and rent a iconic rowboat.", insiderTip: "Visit the Strawberry Fields John Lennon memorial nearby." },
      { title: "High Line Park & Hudson Yards", category: "sightseeing", timeOfDay: "afternoon", durationMinutes: 90, estimatedCost: 0, locationName: "Chelsea / Hudson Yards", description: "Elevated greenway built on a historic freight rail line above city streets.", insiderTip: "Stop by Chelsea Market below for artisanal taco bites." },
      { title: "Brooklyn Bridge Sunset Walk", category: "sightseeing", timeOfDay: "evening", durationMinutes: 90, estimatedCost: 0, locationName: "City Hall Park to DUMBO", description: "Walk across the iconic suspension bridge towards Manhattan skyline views.", insiderTip: "Grab pizza at Juliana's or Grimaldi's in DUMBO right after." },
      { title: "Broadway Show & Times Square Lights", category: "activity", timeOfDay: "night", durationMinutes: 180, estimatedCost: 110, locationName: "Theater District", description: "Experience a Tony-award-winning musical followed by Times Square neon lights.", insiderTip: "Check the TKTS booth under the red steps for 50% off day-of tickets." },
    ],
    packing: [
      { category: "Essentials", item: "OMNY Contactless Subway Pass" },
      { category: "Clothing", item: "Comfortable urban sneakers" },
      { category: "Electronics", item: "Portable Battery Bank" },
    ]
  },
  london: {
    destination: "London, United Kingdom",
    currency: "GBP",
    avgDailyCost: 320,
    themes: ["Westminster & Royal Palaces", "British Museum & Cove Garden", "Tower Bridge & South Bank Stroll", "Notting Hill & Hyde Park"],
    stopsPool: [
      { title: "Traditional English Breakfast at Regency Café", category: "food", timeOfDay: "morning", durationMinutes: 60, estimatedCost: 15, locationName: "Westminster, London", description: "Classic full English breakfast with sausage, eggs, beans, bacon, and tea.", insiderTip: "Cash only! Have 15 GBP ready." },
      { title: "Westminster Abbey & Big Ben Views", category: "sightseeing", timeOfDay: "morning", durationMinutes: 120, estimatedCost: 27, locationName: "Parliament Square", description: "Explore 1,000 years of royal coronation history and Big Ben clock tower.", insiderTip: "Cross Westminster Bridge for the best photo angle." },
      { title: "British Museum Artifacts Exploration", category: "activity", timeOfDay: "afternoon", durationMinutes: 150, estimatedCost: 0, locationName: "Great Russell St, Bloomsbury", description: "View world treasures including the Rosetta Stone and Parthenon Sculptures.", insiderTip: "Admission is free, but advance timed entry tickets are recommended." },
      { title: "Borough Market Culinary Tasting", category: "food", timeOfDay: "afternoon", durationMinutes: 90, estimatedCost: 30, locationName: "Southwark, London", description: "Bustling historic food market featuring Scottish sausage rolls and oysters.", insiderTip: "Try the viral chocolate strawberries at Kappacasein." },
      { title: "London Eye Evening Flight", category: "sightseeing", timeOfDay: "evening", durationMinutes: 45, estimatedCost: 35, locationName: "Riverside Building, County Hall", description: "Giant observation wheel offering 360-degree views across London skyline.", insiderTip: "Book fast-track tickets to skip long queues." },
    ],
    packing: [
      { category: "Essentials", item: "Contactless Oyster / Bank Card" },
      { category: "Clothing", item: "Compact Umbrella & Waterproof Jacket" },
      { category: "Electronics", item: "UK 3-prong Plug Adapter" },
    ]
  },
  rome: {
    destination: "Rome, Italy",
    currency: "EUR",
    avgDailyCost: 290,
    themes: ["Colosseum & Ancient Forum", "Vatican City & Sistine Chapel", "Trevi Fountain & Spanish Steps", "Trastevere Food & Wine"],
    stopsPool: [
      { title: "Espresso & Cornetto at Sant'Eustachio", category: "food", timeOfDay: "morning", durationMinutes: 30, estimatedCost: 5, locationName: "Piazza Sant'Eustachio", description: "Rome's most famous wood-roasted espresso coffee bar.", insiderTip: "Drink standing at the counter like a true Roman." },
      { title: "Colosseum & Roman Forum Guided Walk", category: "sightseeing", timeOfDay: "morning", durationMinutes: 180, estimatedCost: 35, locationName: "Piazza del Colosseo", description: "Step back into gladiator history inside the ancient amphitheater.", insiderTip: "Includes access to the Palatine Hill overlooking the Forum." },
      { title: "Piazza Navona & Pantheon Visit", category: "sightseeing", timeOfDay: "afternoon", durationMinutes: 90, estimatedCost: 5, locationName: "Historic Center", description: "Marvel at Bernini's fountains and the ancient oculus dome of the Pantheon.", insiderTip: "Grab a gelato at Frigidarium nearby." },
      { title: "Trastevere Food & Wine Tasting", category: "food", timeOfDay: "evening", durationMinutes: 150, estimatedCost: 50, locationName: "Trastevere District", description: "Cobblestone neighborhood famous for authentic Cacio e Pepe and Suppli.", insiderTip: "Dine at Da Enzo al 29 if you get a table early." },
      { title: "Trevi Fountain Midnight Coin Toss", category: "relaxation", timeOfDay: "night", durationMinutes: 45, estimatedCost: 0, locationName: "Piazza di Trevi", description: "Toss a coin over your left shoulder to ensure your return to Rome.", insiderTip: "Visit after 10 PM when crowds clear out." },
    ],
    packing: [
      { category: "Essentials", item: "Shoulder Cover / Scarf for Churches" },
      { category: "Clothing", item: "Breathable linen clothing & sturdy shoes" },
      { category: "Electronics", item: "Type L / C European Adapter" },
    ]
  }
};

/**
 * Universal dynamic itinerary generator for ANY location in the world
 */
export function generateMockItinerary(promptText: string): TripItinerary {
  const lowerPrompt = promptText.toLowerCase();

  // 1. Detect location preset or extract custom location string
  let matchedPresetKey = Object.keys(DESTINATION_PRESETS).find(key => 
    lowerPrompt.includes(key) || 
    (key === 'newyork' && (lowerPrompt.includes('nyc') || lowerPrompt.includes('new york')))
  );

  // 2. Parse duration in days from prompt (e.g. "5 days", "3 day", "7-day", "weekend")
  let daysCount = 4;
  const daysMatch = promptText.match(/(\d+)\s*(?:-\s*)?(?:day|days)/i);
  if (daysMatch && daysMatch[1]) {
    daysCount = Math.min(Math.max(parseInt(daysMatch[1], 10), 1), 7);
  } else if (lowerPrompt.includes('weekend')) {
    daysCount = 2;
  } else if (lowerPrompt.includes('week')) {
    daysCount = 7;
  }

  // 3. Extract custom location name if not matched in preset
  let targetDestination = "Custom Destination";
  if (matchedPresetKey) {
    targetDestination = DESTINATION_PRESETS[matchedPresetKey].destination;
  } else {
    // Attempt location extraction heuristic from prompt text
    const inMatch = promptText.match(/(?:in|to|for|around)\s+([A-Z][a-zA-Z\s,]+?)(?:\s+for|\s+with|\s+on|\s+\d+|$|\.|\,)/);
    if (inMatch && inMatch[1]) {
      targetDestination = inMatch[1].trim();
    } else {
      // Capitalize first 2-3 words of prompt as destination title fallback
      const words = promptText.trim().split(/\s+/);
      targetDestination = words.slice(0, 3).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    }
  }

  const preset = matchedPresetKey ? DESTINATION_PRESETS[matchedPresetKey] : null;
  const currency = preset ? preset.currency : "USD";
  const dailyCost = preset ? preset.avgDailyCost : 250;
  const totalCost = daysCount * dailyCost;

  // 4. Construct Day-by-Day Itinerary Array dynamically
  const generatedDays: DayItinerary[] = [];

  for (let d = 1; d <= daysCount; d++) {
    let dayTheme = `Day ${d}: Highlights & Local Hidden Gems`;
    let daySummary = `Explore top attractions, cultural landmarks, and local dining in ${targetDestination}.`;
    
    let dayStops: ItineraryStop[] = [];

    if (preset && preset.stopsPool) {
      // Cycle through preset stops
      const startIdx = ((d - 1) * 2) % preset.stopsPool.length;
      const selected = [
        preset.stopsPool[startIdx % preset.stopsPool.length],
        preset.stopsPool[(startIdx + 1) % preset.stopsPool.length],
        preset.stopsPool[(startIdx + 2) % preset.stopsPool.length],
      ];

      if (preset.themes[d - 1]) {
        dayTheme = `Day ${d}: ${preset.themes[d - 1]}`;
      }

      dayStops = selected.map((s, idx) => ({
        id: `stop-${d}-${idx + 1}-${Math.random().toString(36).substring(2, 6)}`,
        title: s.title,
        category: s.category,
        timeOfDay: s.timeOfDay,
        durationMinutes: s.durationMinutes,
        estimatedCost: s.estimatedCost,
        locationName: s.locationName,
        description: s.description,
        insiderTip: s.insiderTip,
      }));
    } else {
      // Dynamic fallback stops tailored to user's exact destination string
      dayTheme = d === 1 ? `Day 1: Arrival & Historic Center` : d === 2 ? `Day 2: Cultural Landmarks & Dining` : d === 3 ? `Day 3: Nature, Parks & Skyline Views` : `Day ${d}: Local Markets & Leisure`;
      
      dayStops = [
        {
          id: `stop-${d}-1-${Math.random().toString(36).substring(2, 6)}`,
          title: `${targetDestination} Central Plaza & Historic Walk`,
          category: 'sightseeing',
          timeOfDay: 'morning',
          durationMinutes: 120,
          estimatedCost: 0,
          locationName: `${targetDestination} Downtown Center`,
          description: `Stroll through the iconic central square of ${targetDestination}, taking in architectural landmarks and vibrant local life.`,
          insiderTip: `Start early around 8:30 AM for the best lighting and fewer crowds.`
        },
        {
          id: `stop-${d}-2-${Math.random().toString(36).substring(2, 6)}`,
          title: `Local Culinary Experience & Café Lunch`,
          category: 'food',
          timeOfDay: 'afternoon',
          durationMinutes: 75,
          estimatedCost: 35,
          locationName: `${targetDestination} Culinary District`,
          description: `Sample regional specialties and freshly prepared authentic dishes at a top-rated local eatery.`,
          insiderTip: `Ask your server for the house chef recommendation.`
        },
        {
          id: `stop-${d}-3-${Math.random().toString(36).substring(2, 6)}`,
          title: `${targetDestination} Famous Museum / Viewpoint`,
          category: 'activity',
          timeOfDay: 'afternoon',
          durationMinutes: 120,
          estimatedCost: 25,
          locationName: `${targetDestination} Arts & Cultural Quarter`,
          description: `Immerse into local history and artistic heritage with panoramic views across the city skyline.`,
          insiderTip: `Book entry tickets online in advance to skip ticket counter lines.`
        },
        {
          id: `stop-${d}-4-${Math.random().toString(36).substring(2, 6)}`,
          title: `Atmospheric Evening Promenade & Dinner`,
          category: 'food',
          timeOfDay: 'evening',
          durationMinutes: 120,
          estimatedCost: 50,
          locationName: `${targetDestination} Waterfront / Old Town`,
          description: `Enjoy an evening stroll along historic lanes followed by a relaxed dinner paired with local beverages.`,
          insiderTip: `Reserve a window or outdoor terrace table for sunset.`
        }
      ];
    }

    generatedDays.push({
      dayNumber: d,
      theme: dayTheme,
      dateNote: `Day ${d}`,
      summary: daySummary,
      stops: dayStops,
    });
  }

  // 5. Packing & Budget Breakdown
  const packingItems = preset ? preset.packing.map((p, idx) => ({
    id: `pack-${idx + 1}`,
    category: p.category,
    item: p.item,
    packed: idx < 2
  })) : [
    { id: 'p1', category: 'Essentials', item: `Valid Passport & ${targetDestination} Travel Documents`, packed: true },
    { id: 'p2', category: 'Electronics', item: 'Universal Power Adapter & Battery Bank', packed: true },
    { id: 'p3', category: 'Clothing', item: 'Comfortable walking shoes & weather layers', packed: false },
    { id: 'p4', category: 'Documents', item: 'Hotel Reservations & Transport Cards', packed: false },
    { id: 'p5', category: 'Miscellaneous', item: 'Reusable Water Bottle & Coin Pouch', packed: false },
  ];

  return {
    id: `trip-${Date.now()}`,
    title: `${targetDestination} ${daysCount}-Day Adventure`,
    destination: targetDestination,
    durationDays: daysCount,
    estimatedTotalBudget: totalCost,
    currency: currency,
    pace: daysCount <= 3 ? "fast-paced" : daysCount >= 6 ? "relaxed" : "moderate",
    summary: `A carefully crafted ${daysCount}-day itinerary for ${targetDestination}, balancing iconic sights, authentic local dining, and hidden neighborhood gems based on your custom request.`,
    userPrompt: promptText,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    days: generatedDays,
    packingList: packingItems as any,
    budgetBreakdown: [
      { category: "Sightseeing & Activities", amount: Math.round(totalCost * 0.35), percentage: 35 },
      { category: "Food & Dining", amount: Math.round(totalCost * 0.40), percentage: 40 },
      { category: "Local Transport", amount: Math.round(totalCost * 0.15), percentage: 15 },
      { category: "Miscellaneous & Souvenirs", amount: Math.round(totalCost * 0.10), percentage: 10 },
    ]
  };
}

export const SAMPLE_TRIPS: Record<string, TripItinerary> = {
  tokyo: generateMockItinerary("4 days in Tokyo focusing on food, anime, historic shrines, and local hidden gems"),
  paris: generateMockItinerary("3 days in Paris relaxed pace focused on food, art, and romantic views")
};
