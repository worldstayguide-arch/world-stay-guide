import { Handshake } from 'lucide-react';

import { SectionEyebrow } from '@/components/home/SectionEyebrow';

export function AffiliateSection() {
  return (
    <section id="affiliate" className="max-w-7xl mx-auto px-6 mb-20">
      <div className="bg-[#0A5C8E] rounded-3xl px-8 py-12 md:px-16 md:py-16 flex flex-col md:flex-row items-center justify-between gap-8 text-white overflow-hidden relative">
        <div className="max-w-xl">
          <SectionEyebrow label="Affiliate Program" dotClassName="bg-yellow-400" />
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-[1.1] mb-4">
            Partner with WorldStayGuide and earn on every booking
          </h2>
          <p className="text-white/80 leading-relaxed">
            Join our affiliate program and earn commission for every traveler you refer to our
            retreats, packages, and guided tours. Perfect for bloggers, creators, and travel
            communities passionate about Pakistan.
          </p>
        </div>

        <a
          href="mailto:partners@worldstayguide.com"
          className="flex items-center gap-2 bg-white text-[#0A5C8E] font-semibold px-6 py-3 rounded-full whitespace-nowrap hover:bg-white/90 transition-colors"
        >
          <Handshake className="w-4 h-4" />
          Become an affiliate
        </a>
      </div>
    </section>
  );
}
