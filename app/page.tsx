import type { Metadata } from 'next';

import { AboutSection } from '@/components/home/AboutSection';
import { AffiliateSection } from '@/components/home/AffiliateSection';
import { Hero } from '@/components/home/Hero';
import { LandmarksSection } from '@/components/home/LandmarksSection';
import { TripsSection } from '@/components/home/TripsSection';
import { TrustIntro } from '@/components/home/TrustIntro';
import { ValueGallery } from '@/components/home/ValueGallery';
import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';

const seoKeywords = [
  'tourism in pakistan',
  'pakistan famous place',
  'pakistan tour packages',
  'pakistan tour packages price',
  'northern pakistan tour packages',
  'pakistan tour packages 2026',
  'north pakistan tour packages',
  'Best tour operator in Pakistan',
  'Book northern areas tour Pakistan',
  'Pakistan travel agency for foreigners',
  'Customized Pakistan tour packages',
  'Hunza Skardu tour package price',
  'Hunza valley tour packages',
  'Places to visit in Hunza Valley',
  'Things to do in Skardu',
  'Lahore historical places tour',
  'Fairy Meadows trekking guide',
  'Naran Kaghan tour packages',
  'Swat valley tourist spots',
  'Is Pakistan safe for foreign tourists?',
  'Pakistan visa for tourists guide',
  'Solo travel in Pakistan',
  'Trekking and hiking in Northern Pakistan',
  'K2 base camp trek tour',
  'Cultural tours in Pakistan',
  'Best time to visit Northern Pakistan',
  '10 days itinerary for Pakistan trip',
  'Budget travel guide Pakistan',
  'Pakistan local food tour experience',
];

export const metadata: Metadata = {
  title: 'Pakistan Tour Packages 2026 | WorldStayGuide',
  description:
    'Book customized Pakistan tour packages for Hunza, Skardu, Fairy Meadows, K2 Base Camp, Lahore, Naran Kaghan, Swat, and cultural food tours.',
  keywords: seoKeywords,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Pakistan Tour Packages 2026 | WorldStayGuide',
    description:
      'Explore northern Pakistan tour packages, Hunza Skardu trips, trekking guides, city tours, and travel planning for foreigners.',
    images: ['/hero-pakistan-mountains.jpg'],
  },
};

export default function Page() {
  return (
    <div className="min-h-screen bg-[#F5F5F7] font-sans overflow-x-hidden">
      <Navbar />
      <Hero />

      <main>
        <section id="destinations" className="max-w-7xl mx-auto px-6 mt-32 md:mt-48 pb-20">
          <TrustIntro />
          <ValueGallery />
        </section>

        <TripsSection />
        <LandmarksSection />
        <AboutSection />
        <SeoContentSection />
        <AffiliateSection />
      </main>

      <Footer />
    </div>
  );
}

function SeoContentSection() {
  return (
    <section className="mx-auto mb-24 max-w-7xl px-6">
      <div className="grid gap-8 border-y border-neutral-200 py-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#0A5C8E]">
            Pakistan travel planning
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-900 md:text-5xl">
            Tourism in Pakistan, tour packages, and famous places to visit
          </h2>
        </div>

        <div className="space-y-7 text-sm leading-7 text-neutral-600 md:text-base">
          <div>
            <h3 className="text-xl font-semibold tracking-tight text-neutral-900">
              Pakistan tour packages 2026 with transparent prices
            </h3>
            <p className="mt-3">
              WorldStayGuide helps travelers compare pakistan tour packages, pakistan tour
              packages price, northern pakistan tour packages, pakistan tour packages 2026,
              and north pakistan tour packages in one simple place. If you want to Book
              northern areas tour Pakistan with flexible hotels, transport, guides, and dates,
              our team can plan Customized Pakistan tour packages around your route and budget.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold tracking-tight text-neutral-900">
              Best tour operator in Pakistan for Hunza, Skardu, and mountain trips
            </h3>
            <p className="mt-3">
              From Hunza valley tour packages to a clear Hunza Skardu tour package price,
              we help you choose the right experience for families, couples, groups, and
              international guests looking for a Pakistan travel agency for foreigners.
              Popular routes include Places to visit in Hunza Valley, Things to do in Skardu,
              Fairy Meadows trekking guide, Naran Kaghan tour packages, Swat valley tourist
              spots, and Trekking and hiking in Northern Pakistan.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold tracking-tight text-neutral-900">
              Safety, visa, budget, and itinerary guides for Pakistan
            </h3>
            <p className="mt-3">
              New visitors often ask, Is Pakistan safe for foreign tourists? We also guide
              travelers on Pakistan visa for tourists guide basics, Solo travel in Pakistan,
              Best time to visit Northern Pakistan, 10 days itinerary for Pakistan trip, and
              Budget travel guide Pakistan. Adventure travelers can plan a K2 base camp trek
              tour, while culture lovers can book Cultural tours in Pakistan, a Lahore
              historical places tour, or a Pakistan local food tour experience.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold tracking-tight text-neutral-900">
              Pakistan famous place recommendations for every traveler
            </h3>
            <p className="mt-3">
              Whether your dream is mountains, lakes, heritage streets, bazaars, food, or
              soft adventure, tourism in pakistan offers a wide mix of experiences. Our
              Pakistan famous place guides connect you with practical routes, trusted local
              support, and trip ideas that match your dates, comfort level, and travel style.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
