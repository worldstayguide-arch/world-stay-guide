import { Compass, Heart, Users } from 'lucide-react';

import { SectionEyebrow } from '@/components/home/SectionEyebrow';

const aboutStats = [
  { label: 'Travelers guided', value: '50K+', icon: Users },
  { label: 'Curated destinations', value: '120+', icon: Compass },
  { label: 'Years of experience', value: '8+', icon: Heart },
];

export function AboutSection() {
  return (
    <section id="about" className="max-w-7xl mx-auto px-6 mt-16 mb-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <SectionEyebrow label="About Us" />
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-neutral-900 leading-[1.1] mb-6">
            We help you discover Pakistan, properly.
          </h2>
          <p className="text-neutral-600 leading-relaxed mb-6">
            WorldStayGuide is a team of local guides, photographers, and planners dedicated to
            showcasing the real Pakistan — from the peaks of the Karakoram to the streets of
            Lahore. We curate every retreat, package, and guide ourselves so you get accurate,
            trustworthy travel information instead of generic listings.
          </p>
          <p className="text-neutral-600 leading-relaxed">
            Our mission is simple: make it easy and safe for anyone to explore Pakistan&apos;s
            landmarks, culture, and landscapes with confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {aboutStats.map(({ label, value, icon: Icon }) => (
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
    </section>
  );
}
