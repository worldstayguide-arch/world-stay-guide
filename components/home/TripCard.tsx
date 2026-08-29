import Image from 'next/image';
import { Calendar, CheckCircle2, Users } from 'lucide-react';

import type { TripPackage } from '@/types/travel';

type TripCardProps = {
  trip: TripPackage;
};

export function TripCard({ trip }: TripCardProps) {
  const DateIcon = trip.dateKind === 'calendar' ? Calendar : CheckCircle2;

  return (
    <article className="bg-white p-4 rounded-[2rem] border border-neutral-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4 px-2 pt-2">
        <div>
          <h4 className="font-semibold text-lg text-neutral-900">{trip.name}</h4>
          <p className="text-sm text-neutral-500">{trip.location}</p>
        </div>
        <div className="bg-orange-50 text-orange-600 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
          {trip.slotsLeft} Slot left
        </div>
      </div>

      <div className="relative w-full h-[280px] rounded-[1.5rem] overflow-hidden mb-4">
        <Image
          src={trip.image}
          alt={trip.alt}
          fill
          className="object-cover"
          referrerPolicy="no-referrer"
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          unoptimized={trip.image.startsWith('data:')}
        />
        {trip.badge && (
          <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-full">
            {trip.badge}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-white">
          <div className="flex items-center gap-4 text-sm font-medium">
            <span>{trip.price}</span>
            <div className="flex items-center gap-1 text-white/90">
              <Users className="w-4 h-4" />
              <span className="text-xs">{trip.tripType}</span>
            </div>
            <div className="flex items-center gap-1 text-white/90">
              <DateIcon className="w-4 h-4" />
              <span className="text-xs">{trip.dateLabel}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 px-2 pb-2">
        {trip.features.map((feature) => (
          <div key={feature.label}>
            <p className="text-[10px] text-neutral-400 uppercase font-semibold">{feature.label}</p>
            <p className="text-xs font-medium text-neutral-800">{feature.value}</p>
          </div>
        ))}
      </div>
    </article>
  );
}
