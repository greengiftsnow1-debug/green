'use client';

import { useScrollFadeIn } from '@/hooks/useScrollFadeIn';

export default function PlantCarePage() {
  const ref = useScrollFadeIn();

  return (
    <section className="min-h-screen bg-[#E1EEBC] px-8 py-20">
      <div ref={ref} className="max-w-4xl mx-auto bg-white/60 backdrop-blur-md p-10 rounded-2xl shadow">
        <h1 className="text-4xl font-bold text-green-900 mb-6 text-center">Plant Care Tips</h1>
        <ul className="list-disc list-inside text-gray-800 space-y-2 text-lg">
          <li>Water your plants regularly but avoid overwatering.</li>
          <li>Place them in areas with natural sunlight.</li>
          <li>Use organic compost every 2-3 weeks.</li>
          <li>Wipe leaves gently to remove dust and improve photosynthesis.</li>
        </ul>
      </div>
    </section>
  );
}
