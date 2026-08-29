import { Target } from 'lucide-react';

import { trustBadges } from '@/data/travel';

export function TrustIntro() {
  return (
    <div className="flex flex-col items-center mb-16">
      <div className="flex items-center gap-6 mb-8 text-sm font-medium">
        {trustBadges.map(({ label, tone, icon: Icon }) => (
          <div
            key={label}
            className={`flex items-center gap-2 px-4 py-2 rounded-full ${
              tone === 'blue'
                ? 'text-[#0A5C8E] bg-[#0A5C8E]/10'
                : 'text-yellow-600 bg-yellow-50'
            }`}
          >
            <Icon className={`w-4 h-4 ${tone === 'yellow' ? 'fill-current' : ''}`} />
            <span>{label}</span>
          </div>
        ))}
        <div className="hidden md:flex items-center -space-x-2">
          <div className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white" />
          <div className="w-8 h-8 rounded-full bg-gray-400 border-2 border-white" />
          <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-medium">
            +5
          </div>
        </div>
      </div>

      <h2 className="text-5xl md:text-7xl font-semibold text-center tracking-tight text-neutral-900 leading-[1.1]">
        WorldStayGuide means
        <br />
        <span className="relative inline-block">
          Going Places
          <div className="absolute -bottom-2 -right-12 text-[#0A5C8E]">
            <Target className="w-10 h-10" />
            <div className="absolute top-1/2 -left-full w-full h-[1px] bg-blue-300 border-dashed border-t-2 border-blue-400" />
          </div>
        </span>
      </h2>
    </div>
  );
}
