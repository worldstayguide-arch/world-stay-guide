import { MapPin } from 'lucide-react';

import { navLinks } from '@/data/travel';

export function Navbar() {
  return (
    <nav className="absolute top-0 w-full z-20 flex justify-between items-center px-6 md:px-12 py-6 text-white">
      <div className="flex items-center gap-2 text-xl font-medium tracking-tight">
        <MapPin className="w-6 h-6" />
        <span>WorldStayGuide</span>
      </div>

      <div className="hidden lg:flex items-center gap-8 text-sm font-medium">
        {navLinks.map((link) => (
          <a key={link.label} href={link.href} className="hover:text-white/80 transition-colors">
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
