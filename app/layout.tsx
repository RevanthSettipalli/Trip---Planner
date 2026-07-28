import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AI Trip Planner - Turn Travel Prompts into Interactive Itineraries',
  description: 'AI-powered trip planner that converts free-form travel prompts into structured day-by-day itineraries with reorderable stops, budget breakdowns, and refinement loops.',
  keywords: ['AI Trip Planner', 'Itinerary Generator', 'Travel Assistant', 'React AI App'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
