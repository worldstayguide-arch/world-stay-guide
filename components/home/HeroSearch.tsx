import { heroFilters } from '@/data/travel';

export function HeroSearch() {
  return (
    <div className="absolute -bottom-8 md:-bottom-12 w-[95%] max-w-6xl z-20 flex flex-col md:flex-row shadow-2xl">
      <div className="flex-1 grid grid-cols-2 md:grid-cols-4 bg-black/60 backdrop-blur-xl border border-white/10 text-white divide-x divide-white/10">
        {heroFilters.map((filter) => (
          <button
            key={filter.label}
            className="p-4 md:p-6 text-left hover:bg-white/5 transition-colors"
            type="button"
          >
            <div className="text-xs font-semibold text-white/60 mb-1">{filter.label}</div>
            <div className="font-medium text-sm md:text-base">{filter.value}</div>
          </button>
        ))}
      </div>
      <button className="bg-white text-black font-semibold text-lg px-12 py-6 md:py-0 hover:bg-neutral-100 transition-colors flex items-center justify-center">
        Explore
      </button>
    </div>
  );
}
