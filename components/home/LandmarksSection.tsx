import { LandmarkCard } from '@/components/home/LandmarkCard';
import { SectionEyebrow } from '@/components/home/SectionEyebrow';
import { getLandmarks } from '@/lib/landmarks';

export async function LandmarksSection() {
  const landmarks = await getLandmarks();

  return (
    <section id="landmarks" className="max-w-7xl mx-auto px-6 mt-16 mb-20">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <SectionEyebrow label="Must Visit 2026" dotClassName="bg-yellow-500" />
          <h2 className="text-5xl md:text-6xl font-semibold tracking-tight text-neutral-900 leading-[1.1]">
            Iconic Landmarks
          </h2>
        </div>
        <p className="text-neutral-500 max-w-sm md:text-right pb-2">
          Explore the rich history, vibrant culture, and stunning monuments across Pakistan.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {landmarks.map((place) => (
          <LandmarkCard key={place.id} place={place} />
        ))}
      </div>
    </section>
  );
}
