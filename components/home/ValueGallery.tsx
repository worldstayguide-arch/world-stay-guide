import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import { SectionEyebrow } from '@/components/home/SectionEyebrow';
import { galleryImages } from '@/data/travel';

export function ValueGallery() {
  const [mainImage, topImage, bottomImage] = galleryImages;

  return (
    <div id="value" className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center mt-32">
      <div className="lg:col-span-4 flex flex-col items-start">
        <SectionEyebrow label="01 Our Value" />
        <h3 className="text-4xl md:text-5xl font-medium text-neutral-900 leading-tight tracking-tight mb-6">
          Not Your Boring
          <br />
          Travel Agent
        </h3>
        <p className="text-lg text-neutral-500 mb-8 max-w-sm">
          We plan chill, curated trips with good vibes and better people across Gilgit-Baltistan and Kashmir.
        </p>
        <button className="bg-neutral-900 text-white font-medium px-8 py-3.5 rounded-full hover:bg-neutral-800 transition-colors">
          Book a Seat
        </button>
      </div>

      <div className="lg:col-span-8 relative h-[600px] w-full mt-10 lg:mt-0">
        <div className="absolute left-0 top-[5%] w-[55%] h-[85%] rounded-3xl overflow-hidden shadow-lg group">
          <Image
            src={mainImage.image}
            alt={mainImage.alt}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            referrerPolicy="no-referrer"
            sizes="(min-width: 1024px) 36vw, 90vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
          <div className="absolute bottom-6 left-6 text-white">
            <p className="font-semibold text-lg">{mainImage.title}</p>
            {mainImage.subtitle && <p className="text-sm text-white/80">{mainImage.subtitle}</p>}
          </div>
        </div>

        <div className="absolute right-0 top-0 w-[42%] h-[46%] rounded-3xl overflow-hidden shadow-lg group">
          <Image
            src={topImage.image}
            alt={topImage.alt}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            referrerPolicy="no-referrer"
            sizes="(min-width: 1024px) 28vw, 70vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80" />
          <div className="absolute bottom-4 right-4 text-white text-right">
            <p className="font-semibold">{topImage.title}</p>
          </div>
        </div>

        <div className="absolute right-[5%] bottom-[5%] w-[37%] h-[42%] rounded-3xl overflow-hidden shadow-lg group">
          <Image
            src={bottomImage.image}
            alt={bottomImage.alt}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            referrerPolicy="no-referrer"
            sizes="(min-width: 1024px) 24vw, 65vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80" />
          <div className="absolute bottom-4 right-4 text-white text-right">
            <p className="font-semibold text-sm">{bottomImage.title}</p>
          </div>
        </div>

        <div className="absolute -bottom-6 right-10 flex gap-2">
          <button className="p-3 bg-white border border-neutral-200 rounded-full hover:bg-neutral-50 text-neutral-600 transition-colors" aria-label="Previous gallery image">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button className="p-3 bg-white border border-neutral-200 rounded-full hover:bg-neutral-50 text-neutral-900 transition-colors" aria-label="Next gallery image">
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
