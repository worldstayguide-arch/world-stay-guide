import { MapPin } from 'lucide-react';

import { footerLinks } from '@/data/travel';

export function Footer() {
  return (
    <footer id="footer" className="bg-neutral-900 text-white pt-20 pb-10 rounded-t-[3rem] mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 text-2xl font-medium tracking-tight mb-6">
              <MapPin className="w-8 h-8 text-[#0A5C8E]" />
              <span>WorldStayGuide</span>
            </div>
            <p className="text-neutral-400 max-w-sm mb-8">
              Travel with intention. Discover northern retreats, active adventures, and boutique stays all in one place across Pakistan.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-2 bg-white/10 p-2 rounded-[2rem] max-w-md">
              <input
                type="email"
                placeholder="Enter your email to get updates"
                className="bg-transparent text-sm px-4 py-2 w-full focus:outline-none text-white placeholder:text-neutral-400"
              />
              <button className="bg-white text-neutral-900 px-6 py-2 rounded-full text-sm font-semibold hover:bg-neutral-200 transition-colors w-full sm:w-auto">
                Subscribe
              </button>
            </div>
          </div>

          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="font-semibold text-lg mb-6">{heading}</h4>
              <ul className="space-y-4 text-neutral-400 text-sm">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-neutral-500">
          <p>&copy; 2026 WorldStayGuide. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">Facebook</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
