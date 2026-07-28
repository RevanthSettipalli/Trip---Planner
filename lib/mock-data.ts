import { TripItinerary } from './types';

export const SAMPLE_TRIPS: Record<string, TripItinerary> = {
  tokyo: {
    id: "sample-tokyo-7day",
    title: "Tokyo Neon & Heritage Explorer",
    destination: "Tokyo, Japan",
    durationDays: 4,
    estimatedTotalBudget: 1450,
    currency: "USD",
    pace: "moderate",
    summary: "A vibrant 4-day Tokyo journey balancing historic temples in Asakusa, futuristic tech in Akihabara, world-class street food, and serene gardens.",
    userPrompt: "4 days in Tokyo focusing on food, anime, historic shrines, and local hidden gems",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    days: [
      {
        dayNumber: 1,
        theme: "Historic Asakusa & Skytree Views",
        dateNote: "Day 1",
        summary: "Immerse into old Tokyo tradition at Senso-ji Temple before viewing the hyper-modern skyline from Tokyo Skytree.",
        stops: [
          {
            id: "tokyo-1-1",
            title: "Senso-ji Temple & Nakamise Dori",
            category: "sightseeing",
            timeOfDay: "morning",
            durationMinutes: 120,
            estimatedCost: 0,
            locationName: "Asakusa, Taito City",
            description: "Walk through Kaminarimon (Thunder Gate) and explore Tokyo's oldest Buddhist temple surrounded by historic stall snacks.",
            insiderTip: "Try the freshly baked Ningyo-yaki cakes at Nakamise Dori stalls."
          },
          {
            id: "tokyo-1-2",
            title: "Tempura Lunch at Daikokuya",
            category: "food",
            timeOfDay: "afternoon",
            durationMinutes: 75,
            estimatedCost: 25,
            locationName: "1-38-10 Asakusa",
            description: "Traditional sesame-oil fried tempura served over steamed rice with secret rich dark sauce since 1887.",
            insiderTip: "Arrive 15 minutes before 11:30 AM opening to avoid the line."
          },
          {
            id: "tokyo-1-3",
            title: "Sumida River Cruise to Odaiba",
            category: "transport",
            timeOfDay: "afternoon",
            durationMinutes: 60,
            estimatedCost: 18,
            locationName: "Asakusa Pier",
            description: "Board the futuristic Himiko futuristic vessel designed by manga legend Leiji Matsumoto down to Odaiba bay.",
            insiderTip: "Sit near the glass canopy for panoramic views of Rainbow Bridge."
          },
          {
            id: "tokyo-1-4",
            title: "Odaiba Giant Gundam & Bay Dinner",
            category: "activity",
            timeOfDay: "evening",
            durationMinutes: 150,
            estimatedCost: 45,
            locationName: "DiverCity Tokyo Plaza",
            description: "Watch the life-sized Unicorn Gundam transform during the evening light show followed by seaside dining.",
            insiderTip: "Show timings are typically 7:00 PM and 8:30 PM."
          }
        ]
      },
      {
        dayNumber: 2,
        theme: "Anime, Manga & Gaming Heaven",
        dateNote: "Day 2",
        summary: "Full day in Akihabara & Nakano Broadway exploring retro video games, rare figures, and themed cafes.",
        stops: [
          {
            id: "tokyo-2-1",
            title: "Akihabara Electric Town Hunt",
            category: "activity",
            timeOfDay: "morning",
            durationMinutes: 180,
            estimatedCost: 60,
            locationName: "Soto-Kanda, Chiyoda",
            description: "Browse 6 floors of retro games at Super Potato and rare collectibles at Radio Kaikan.",
            insiderTip: "Floor 5 of Super Potato has playable 80s arcade machines!"
          },
          {
            id: "tokyo-2-2",
            title: "Katsu Curry Lunch at Go! Go! Curry",
            category: "food",
            timeOfDay: "afternoon",
            durationMinutes: 45,
            estimatedCost: 12,
            locationName: "Akihabara Central",
            description: "Hearty Kanazawa-style thick, dark pork cutlet curry served with shredded cabbage.",
            insiderTip: "Order the Major Katsu if you have a massive appetite."
          },
          {
            id: "tokyo-2-3",
            title: "Kanda Myojin Anime Shrine",
            category: "sightseeing",
            timeOfDay: "afternoon",
            durationMinutes: 60,
            estimatedCost: 0,
            locationName: "2-16-2 Soto-Kanda",
            description: "A 1,300-year-old shrine famous for IT blessings, anime ema wooden plaques, and peaceful gardens.",
            insiderTip: "You can buy smartphone protection charms blessed by shrine priests."
          },
          {
            id: "tokyo-2-4",
            title: "Memory Lane (Omoide Yokocho) Yakitori",
            category: "food",
            timeOfDay: "evening",
            durationMinutes: 120,
            estimatedCost: 35,
            locationName: "Shinjuku West Exit",
            description: "Atmospheric narrow alleyway packed with tiny smoky izakayas serving charcoal-grilled skewers.",
            insiderTip: "Order a cold Asahi beer and a platter of tare-seasoned chicken thighs."
          }
        ]
      },
      {
        dayNumber: 3,
        theme: "Shibuya Scramble & Meiji Shrine Sanctuary",
        dateNote: "Day 3",
        summary: "Step into quiet forested tranquility at Meiji Jingu before diving into high-energy Harajuku and Shibuya Sky.",
        stops: [
          {
            id: "tokyo-3-1",
            title: "Meiji Jingu Forest Walk",
            category: "relaxation",
            timeOfDay: "morning",
            durationMinutes: 90,
            estimatedCost: 0,
            locationName: "Yoyogikamizonocho, Shibuya",
            description: "Stroll through a 170-acre forest featuring 100,000 evergreen trees donated from across Japan.",
            insiderTip: "Visit early at 8:00 AM before tour groups arrive."
          },
          {
            id: "tokyo-3-2",
            title: "Takeshita Street & Crepes in Harajuku",
            category: "sightseeing",
            timeOfDay: "afternoon",
            durationMinutes: 120,
            estimatedCost: 20,
            locationName: "Jingumae 1-chome",
            description: "Youth fashion hotspot lined with vintage stores, cotton candy, and Marion Crepes.",
            insiderTip: "Head into Cat Street nearby for cooler boutique street style."
          },
          {
            id: "tokyo-3-3",
            title: "Shibuya Sky Sunset View",
            category: "sightseeing",
            timeOfDay: "evening",
            durationMinutes: 90,
            estimatedCost: 22,
            locationName: "Shibuya Scramble Square Roof",
            description: "Open-air 360-degree observation deck 229 meters above Shibuya Crossing.",
            insiderTip: "Book sunset time tickets 4 weeks in advance on official site."
          },
          {
            id: "tokyo-3-4",
            title: "Ichiran Ramen Night Bowl",
            category: "food",
            timeOfDay: "night",
            durationMinutes: 60,
            estimatedCost: 15,
            locationName: "Shibuya Main Store",
            description: "Solo dining booth tonkotsu pork broth ramen customized precisely to your noodle firmness preference.",
            insiderTip: "Add extra garlic and soft-boiled seasoned egg."
          }
        ]
      },
      {
        dayNumber: 4,
        theme: "Digital Art & Culinary Farewell",
        dateNote: "Day 4",
        summary: "Experience teamLab Planets immersive liquid art and enjoy a farewell sushi omakase.",
        stops: [
          {
            id: "tokyo-4-1",
            title: "teamLab Planets Immersive Museum",
            category: "activity",
            timeOfDay: "morning",
            durationMinutes: 150,
            estimatedCost: 32,
            locationName: "Toyosu, Koto City",
            description: "Walk barefoot through water filled with glowing digital koi fish and mirror gardens.",
            insiderTip: "Wear pants that roll up above the knees easily!"
          },
          {
            id: "tokyo-4-2",
            title: "Toyosu Outer Seafood Market Lunch",
            category: "food",
            timeOfDay: "afternoon",
            durationMinutes: 90,
            estimatedCost: 40,
            locationName: "Toyosu Market",
            description: "Ultra-fresh sashimi rice bowls featuring fatty tuna, sea urchin, and grilled scallops.",
            insiderTip: "Try the tamagoyaki (sweet rolled omelet) on a stick for $1.50."
          },
          {
            id: "tokyo-4-3",
            title: "Ginza Luxury Stroll & Souvenir Tea",
            category: "relaxation",
            timeOfDay: "afternoon",
            durationMinutes: 120,
            estimatedCost: 25,
            locationName: "Ginza 4-Chome",
            description: "Explore flagship departmental architecture and sample matcha parfaits at Ippodo Tea.",
            insiderTip: "On weekends, Ginza's main boulevard is closed to cars for pedestrian strolling."
          }
        ]
      }
    ],
    packingList: [
      { id: "p1", category: "Essentials", item: "Passport & Suica / Pasmo IC Transport Card", packed: true },
      { id: "p2", category: "Electronics", item: "Portable Power Bank (10,000 mAh)", packed: true },
      { id: "p3", category: "Clothing", item: "Slip-on walking shoes (for temple visits)", packed: false },
      { id: "p4", category: "Documents", item: "Visit Japan Web QR Code & Hotel Voucher", packed: false },
      { id: "p5", category: "Miscellaneous", item: "Coin Pouch (Japan is heavy on yen coins!)", packed: false },
    ],
    budgetBreakdown: [
      { category: "Sightseeing & Museums", amount: 450, percentage: 31 },
      { category: "Food & Dining", amount: 520, percentage: 36 },
      { category: "Local Transport", amount: 180, percentage: 12 },
      { category: "Shopping & Souvenirs", amount: 300, percentage: 21 },
    ]
  },
  paris: {
    id: "sample-paris-3day",
    title: "Paris Romantics & Hidden Bistro Tour",
    destination: "Paris, France",
    durationDays: 3,
    estimatedTotalBudget: 1100,
    currency: "EUR",
    pace: "relaxed",
    summary: "A 3-day Parisian escape featuring Montmartre artists, croissant tastings, Louver highlights, and a Seine sunset cruise.",
    userPrompt: "3 days in Paris relaxed pace focused on food, art, and romantic views",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    days: [
      {
        dayNumber: 1,
        theme: "Montmartre Cobblestones & Sacré-Cœur",
        stops: [
          {
            id: "paris-1-1",
            title: "Fresh Croissant at Du Pain et des Idées",
            category: "food",
            timeOfDay: "morning",
            durationMinutes: 45,
            estimatedCost: 8,
            locationName: "34 Rue Yves Toudic",
            description: "World-famous pistachio snail pastry and buttery sourdough bread.",
            insiderTip: "Pair with an espresso from neighboring cafe."
          },
          {
            id: "paris-1-2",
            title: "Montmartre Hill & Place du Tertre",
            category: "sightseeing",
            timeOfDay: "morning",
            durationMinutes: 120,
            estimatedCost: 0,
            locationName: "18th Arrondissement",
            description: "Wander past street painters, vintage windmills, and historic cabaret locations.",
            insiderTip: "Get your portrait sketched by local open-air artists."
          }
        ]
      }
    ],
    packingList: [
      { id: "p1", category: "Essentials", item: "Passport & Credit Cards", packed: true },
      { id: "p2", category: "Clothing", item: "Stylish Scarf & Light Trench Coat", packed: false }
    ],
    budgetBreakdown: [
      { category: "Food & Dining", amount: 400, percentage: 36 },
      { category: "Museums & Passes", amount: 300, percentage: 27 },
      { category: "Accommodations", amount: 400, percentage: 37 }
    ]
  }
};

/**
 * Fallback generator when API keys are not configured or when failure simulation mode is triggered
 */
export function generateMockItinerary(promptText: string): TripItinerary {
  const lowerPrompt = promptText.toLowerCase();

  if (lowerPrompt.includes("paris") || lowerPrompt.includes("france")) {
    return { ...SAMPLE_TRIPS.paris, id: `trip-${Date.now()}`, userPrompt: promptText };
  }

  // Default to rich Tokyo itinerary
  return {
    ...SAMPLE_TRIPS.tokyo,
    id: `trip-${Date.now()}`,
    userPrompt: promptText,
    title: promptText.length > 25 ? `${promptText.substring(0, 25)}...` : promptText,
  };
}
