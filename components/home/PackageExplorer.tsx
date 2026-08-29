'use client';

import { useMemo, useState } from 'react';
import { ChevronDown } from 'lucide-react';

import { TripCard } from '@/components/home/TripCard';
import type { TravelPackageRecord } from '@/lib/packages';

type PackageExplorerProps = {
  packages: TravelPackageRecord[];
};

type Selections = {
  destination: string;
  category: string;
  price: string;
  date: string;
};

const defaultSelections: Selections = {
  destination: 'All destinations',
  category: 'All categories',
  price: 'Any price',
  date: 'Any date',
};

export function PackageExplorer({ packages }: PackageExplorerProps) {
  const [activeDropdown, setActiveDropdown] = useState<keyof Selections | null>(null);
  const [selections, setSelections] = useState<Selections>(defaultSelections);
  const [appliedSelections, setAppliedSelections] = useState<Selections>(defaultSelections);

  const options = useMemo(
    () => ({
      destination: ['All destinations', ...unique(packages.map((item) => item.destination))],
      category: ['All categories', ...unique(packages.map((item) => item.category))],
      price: ['Any price', ...unique(packages.map((item) => item.price))],
      date: ['Any date', ...unique(packages.map((item) => item.dateLabel))],
    }),
    [packages]
  );

  const filteredPackages = useMemo(
    () =>
      packages.filter((item) => {
        const destinationMatch =
          appliedSelections.destination === 'All destinations' ||
          item.destination === appliedSelections.destination;
        const categoryMatch =
          appliedSelections.category === 'All categories' || item.category === appliedSelections.category;
        const priceMatch = appliedSelections.price === 'Any price' || item.price === appliedSelections.price;
        const dateMatch = appliedSelections.date === 'Any date' || item.dateLabel === appliedSelections.date;

        return destinationMatch && categoryMatch && priceMatch && dateMatch;
      }),
    [appliedSelections, packages]
  );

  const selectOption = (type: keyof Selections, value: string) => {
    setSelections((current) => ({ ...current, [type]: value }));
    setActiveDropdown(null);
  };

  return (
    <>
      <div className="relative mb-10 flex flex-wrap items-center gap-2 rounded-[2rem] border border-neutral-200 bg-white p-3 shadow-sm lg:flex-nowrap">
        <Dropdown
          activeDropdown={activeDropdown}
          label="Destination"
          name="destination"
          onOpen={setActiveDropdown}
          onSelect={selectOption}
          options={options.destination}
          value={selections.destination}
        />
        <Divider />
        <Dropdown
          activeDropdown={activeDropdown}
          label="Category"
          name="category"
          onOpen={setActiveDropdown}
          onSelect={selectOption}
          options={options.category}
          value={selections.category}
        />
        <Divider />
        <Dropdown
          activeDropdown={activeDropdown}
          label="Price"
          name="price"
          onOpen={setActiveDropdown}
          onSelect={selectOption}
          options={options.price}
          value={selections.price}
        />
        <Divider />
        <Dropdown
          activeDropdown={activeDropdown}
          label="Date"
          name="date"
          onOpen={setActiveDropdown}
          onSelect={selectOption}
          options={options.date}
          value={selections.date}
        />

        <button
          className="w-full shrink-0 rounded-full bg-neutral-900 px-8 py-4 font-medium text-white transition-colors hover:bg-neutral-800 lg:w-auto"
          type="button"
          onClick={() => setAppliedSelections(selections)}
        >
          Discover
        </button>
      </div>

      {filteredPackages.length === 0 ? (
        <div className="rounded-[2rem] border border-dashed border-neutral-300 bg-white p-10 text-center">
          <h3 className="text-xl font-semibold text-neutral-900">No packages found</h3>
          <p className="mt-2 text-sm text-neutral-500">Try a different destination, category, price, or date.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPackages.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      )}
    </>
  );
}

function unique(values: string[]) {
  return Array.from(new Set(values.filter(Boolean)));
}

function Divider() {
  return <div className="hidden h-10 w-px bg-neutral-200 lg:block" />;
}

type DropdownProps = {
  activeDropdown: keyof Selections | null;
  label: string;
  name: keyof Selections;
  value: string;
  options: string[];
  onOpen: (name: keyof Selections | null) => void;
  onSelect: (name: keyof Selections, value: string) => void;
};

function Dropdown({ activeDropdown, label, name, value, options, onOpen, onSelect }: DropdownProps) {
  const isActive = activeDropdown === name;

  return (
    <div className="relative flex min-w-[200px] flex-1 flex-col px-4 py-2">
      <span className="mb-1 text-sm font-bold text-neutral-900">{label}</span>
      <button
        className="flex items-center justify-between text-left text-sm text-neutral-500"
        type="button"
        onClick={() => onOpen(isActive ? null : name)}
      >
        <span className="truncate">{value}</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isActive ? 'rotate-180' : ''}`} />
      </button>

      {isActive && (
        <div className="absolute left-0 top-full z-50 mt-2 max-h-64 w-full overflow-auto rounded-xl border border-neutral-200 bg-white py-2 shadow-lg">
          {options.map((option) => (
            <button
              key={option}
              className="block w-full px-4 py-2 text-left text-sm text-neutral-700 hover:bg-neutral-50"
              type="button"
              onClick={() => onSelect(name, option)}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
