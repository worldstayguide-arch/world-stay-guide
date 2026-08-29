import Image from 'next/image';
import { Star } from 'lucide-react';

import { resolveLandmarkIcon } from '@/lib/landmark-icons';
import type { LandmarkRecord } from '@/types/travel';

type LandmarkCardProps = {
  place: LandmarkRecord;
};

export function LandmarkCard({ place }: LandmarkCardProps) {
  const Icon = resolveLandmarkIcon(place.iconName);

  return (
    <article className="bg-white rounded-2xl overflow-hidden border border-neutral-200 shadow-sm hover:shadow-md transition-shadow group cursor-pointer flex flex-col justify-between">
      <div>
        <div className="relative w-full h-40">
          <Image
            src={place.image}
            alt={place.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            referrerPolicy="no-referrer"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
            {/* eslint-disable-next-line react-hooks/static-components -- resolveLandmarkIcon returns a stable component reference from a lookup map, not a new component */}
            <Icon className="w-4 h-4" />
          </div>
          {place.rating && (
            <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/40 backdrop-blur-md px-2 py-1 rounded-full border border-white/20">
              <Star className="w-3.5 h-3.5 text-yellow-400 fill-current" />
              <span className="text-xs font-bold text-white">{place.rating}</span>
            </div>
          )}
        </div>

        <div className="p-4">
          <h4 className="font-semibold text-neutral-900 leading-tight mb-1">{place.name}</h4>
          <p className="text-xs text-neutral-500 mb-2">{place.category}</p>
          {place.reviews && <p className="text-[10px] text-neutral-400">({place.reviews} reviews)</p>}
        </div>
      </div>

      <div className="flex items-center justify-between p-4 pt-0 border-t border-transparent">
        <div className="flex items-center gap-1.5">
          <span className={`w-2 h-2 rounded-full ${place.status === 'Open' ? 'bg-green-500' : 'bg-red-500'}`} />
          <span className="text-xs font-medium text-neutral-700">{place.status}</span>
        </div>
        {place.price && <span className="text-xs font-semibold text-neutral-900">{place.price}</span>}
      </div>
    </article>
  );
}
