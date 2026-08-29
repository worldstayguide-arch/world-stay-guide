import type { Metadata } from 'next';
import { Compass, Heart, MapPin, ShieldCheck, Sparkles, Users } from 'lucide-react';

import { SectionEyebrow } from '@/components/home/SectionEyebrow';
import { AffiliateSection } from '@/components/home/AffiliateSection';
import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';

export const metadata: Metadata = {
  title: 'About Us | WorldStayGuide',
  description:
    'WorldStayGuide is a team of local guides, photographers, and planners showcasing the real Pakistan through curated retreats, packages, and destination guides.',
};

const stats = [
  { label: 'Travelers guided', value: '50K+', icon: Users },
  { label: 'Curated destinations', value: '120+', icon: Compass },
  { label: 'Years of experience', value: '8+', icon: Heart },
  { label: 'Local partners', value: '200+', icon: MapPin },
];

const values = [
  {
    title: 'Locally rooted',
    description:
      'Every guide and retreat is built by people who actually live in and travel across Pakistan — not scraped listings.',
    icon: MapPin,
  },
  {
    title: 'Safety first',
    description:
      'Routes, stays, and operators are vetted by our team before they ever reach your itinerary.',
    icon: ShieldCheck,
  },
  {
    title: 'Crafted, not templated',
    description:
      'From Hunza to Skardu, every package is designed around the season, terrain, and traveler — never one-size-fits-all.',
    icon: Sparkles,
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F5F5F7] font-sans overflow-x-hidden">
      <Navbar />

      <section className="relative w-full h-[50vh] min-h-[380px] flex flex-col items-center justify-center bg-neutral-900">
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/80 to-neutral-900/40" />
        <div className="relative z-10 text-center text-white px-4">
          <div className="flex justify-center">
            <SectionEyebrow label="About Us" dotClassName="bg-yellow-400" />
          </div>
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight leading-[1.1]">
            We help you discover
            <br />
            Pakistan, properly.
          </h1>
        </div>
      </section>

      <main>
        <section className="max-w-7xl mx-auto px-6 mt-20 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-neutral-900 leading-[1.15] mb-6">
                Our story
              </h2>
              <p className="text-neutral-600 leading-relaxed mb-6">
                WorldStayGuide started with a simple frustration: it was easier to plan a trip to
                Southeast Asia than to Gilgit-Baltistan, despite Pakistan holding some of the
                most spectacular landscapes on earth. So we built the resource we wished existed
                — a team of local guides, photographers, and planners curating every retreat,
                package, and destination guide ourselves.
              </p>
              <p className="text-neutral-600 leading-relaxed">
                Today we work with vetted operators across the north and south of the country,
                from mountain retreats in Hunza to heritage tours through Lahore, so travelers get
                accurate, trustworthy information instead of generic listings.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {stats.map(({ label, value, icon: Icon }) => (
                <div
                  key={label}
                  className="bg-white rounded-2xl border border-neutral-200 p-6 flex flex-col items-start gap-3 shadow-sm"
                >
                  <div className="w-10 h-10 rounded-full bg-[#0A5C8E]/10 text-[#0A5C8E] flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-3xl font-semibold text-neutral-900">{value}</div>
                  <div className="text-sm text-neutral-500">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <SectionEyebrow label="What we stand for" />
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-neutral-900 leading-[1.15] mb-10 max-w-xl">
              The values behind every trip we plan
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {values.map(({ title, description, icon: Icon }) => (
                <div
                  key={title}
                  className="bg-white rounded-2xl border border-neutral-200 p-8 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-10 h-10 rounded-full bg-neutral-900 text-white flex items-center justify-center mb-6">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-lg text-neutral-900 mb-2">{title}</h3>
                  <p className="text-sm text-neutral-500 leading-relaxed">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <AffiliateSection />
      </main>

      <Footer />
    </div>
  );
}
