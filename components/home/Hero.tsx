import Image from 'next/image';

import { HeroSearch } from '@/components/home/HeroSearch';

export function Hero() {
  return (
    <section className="relative w-full h-[85vh] min-h-[600px] flex flex-col items-center justify-center">
      <Image
        src="/hero-pakistan-mountains.jpg"
        alt="Karakoram mountains and turquoise river in Hunza Valley, Pakistan"
        fill
        className="object-cover object-center"
        priority
        sizes="100vw"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-black/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/30" />

      <div className="relative z-10 text-center text-white px-4 -mt-20">
        <h1 className="text-[120px] md:text-[180px] font-semibold leading-none tracking-tighter drop-shadow-lg">
          Travel
        </h1>
        <p className="text-lg md:text-xl font-medium mt-4 max-w-xl mx-auto drop-shadow-md">
          Travel with intention. Discover northern retreats, active adventures, and boutique stays all in one place.
        </p>
      </div>

      <HeroSearch />
    </section>
  );
}
