'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export function FilterBar() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  
  const [selections, setSelections] = useState({
    destination: 'Find a spot...',
    category: 'Select type',
    price: 'Select range budget',
    date: 'Select date range'
  });

  const toggleDropdown = (dropdown: string) => {
    if (activeDropdown === dropdown) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(dropdown);
    }
  };

  const selectOption = (type: string, value: string) => {
    setSelections(prev => ({ ...prev, [type]: value }));
    setActiveDropdown(null);
  };

  const options = {
    destination: ['Hunza Valley', 'Skardu', 'Swat', 'Fairy Meadows', 'Naran Kaghan'],
    category: ['Trekking', 'Sightseeing', 'Cultural', 'Honeymoon', 'Adventure'],
    price: ['$0 - $500', '$500 - $1000', '$1000 - $2000', '$2000+'],
    date: ['Next 7 Days', 'Next 30 Days', 'This Summer', 'This Winter']
  };

  return (
    <div className="flex flex-wrap lg:flex-nowrap items-center bg-white rounded-[2rem] p-3 border border-neutral-200 shadow-sm gap-2 mb-10 relative">
      {/* Destination Dropdown */}
      <div className="flex-1 flex flex-col px-4 py-2 min-w-[200px] relative">
        <span className="text-sm font-bold text-neutral-900 mb-1">Destination</span>
        <div 
          className="flex items-center justify-between text-neutral-500 text-sm cursor-pointer"
          onClick={() => toggleDropdown('destination')}
        >
          <span>{selections.destination}</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'destination' ? 'rotate-180' : ''}`} />
        </div>
        
        {activeDropdown === 'destination' && (
          <div className="absolute top-full left-0 mt-2 w-full bg-white border border-neutral-200 rounded-xl shadow-lg z-50 py-2 overflow-hidden">
            {options.destination.map(opt => (
              <div 
                key={opt} 
                className="px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 cursor-pointer"
                onClick={() => selectOption('destination', opt)}
              >
                {opt}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="w-[1px] h-10 bg-neutral-200 hidden lg:block" />
      
      {/* Category Dropdown */}
      <div className="flex-1 flex flex-col px-4 py-2 min-w-[150px] relative">
        <span className="text-sm font-bold text-neutral-900 mb-1">Category</span>
        <div 
          className="flex items-center justify-between text-neutral-500 text-sm cursor-pointer"
          onClick={() => toggleDropdown('category')}
        >
          <span>{selections.category}</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'category' ? 'rotate-180' : ''}`} />
        </div>
        
        {activeDropdown === 'category' && (
          <div className="absolute top-full left-0 mt-2 w-full bg-white border border-neutral-200 rounded-xl shadow-lg z-50 py-2 overflow-hidden">
            {options.category.map(opt => (
              <div 
                key={opt} 
                className="px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 cursor-pointer"
                onClick={() => selectOption('category', opt)}
              >
                {opt}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="w-[1px] h-10 bg-neutral-200 hidden lg:block" />
      
      {/* Price Dropdown */}
      <div className="flex-1 flex flex-col px-4 py-2 min-w-[200px] relative">
        <span className="text-sm font-bold text-neutral-900 mb-1">Price</span>
        <div 
          className="flex items-center justify-between text-neutral-500 text-sm cursor-pointer"
          onClick={() => toggleDropdown('price')}
        >
          <span>{selections.price}</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'price' ? 'rotate-180' : ''}`} />
        </div>
        
        {activeDropdown === 'price' && (
          <div className="absolute top-full left-0 mt-2 w-full bg-white border border-neutral-200 rounded-xl shadow-lg z-50 py-2 overflow-hidden">
            {options.price.map(opt => (
              <div 
                key={opt} 
                className="px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 cursor-pointer"
                onClick={() => selectOption('price', opt)}
              >
                {opt}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="w-[1px] h-10 bg-neutral-200 hidden lg:block" />
      
      {/* Date Dropdown */}
      <div className="flex-1 flex flex-col px-4 py-2 min-w-[200px] relative">
        <span className="text-sm font-bold text-neutral-900 mb-1">Date</span>
        <div 
          className="flex items-center justify-between text-neutral-500 text-sm cursor-pointer"
          onClick={() => toggleDropdown('date')}
        >
          <span>{selections.date}</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'date' ? 'rotate-180' : ''}`} />
        </div>
        
        {activeDropdown === 'date' && (
          <div className="absolute top-full left-0 mt-2 w-full bg-white border border-neutral-200 rounded-xl shadow-lg z-50 py-2 overflow-hidden">
            {options.date.map(opt => (
              <div 
                key={opt} 
                className="px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 cursor-pointer"
                onClick={() => selectOption('date', opt)}
              >
                {opt}
              </div>
            ))}
          </div>
        )}
      </div>
      
      <button className="w-full lg:w-auto bg-neutral-900 text-white font-medium px-8 py-4 rounded-full hover:bg-neutral-800 transition-colors shrink-0">
        Discover
      </button>
    </div>
  );
}
