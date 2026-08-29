import { PackageExplorer } from '@/components/home/PackageExplorer';
import { SectionEyebrow } from '@/components/home/SectionEyebrow';
import { getTravelPackages } from '@/lib/packages';

export async function TripsSection() {
  const packages = await getTravelPackages();

  return (
    <section id="packages" className="max-w-7xl mx-auto px-6 mt-16 mb-32">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <SectionEyebrow label="Popular Destination 2026" />
          <h2 className="text-5xl md:text-7xl font-semibold tracking-tight text-neutral-900">
            Pick the Place
          </h2>
        </div>
        <p className="text-neutral-500 max-w-sm md:text-right pb-2">
          We have great options for everyone and cozy spots for your squad to enjoy together!
        </p>
      </div>

      <PackageExplorer packages={packages} />
    </section>
  );
}
