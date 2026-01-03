'use client';

import { useEffect, useState } from 'react';

const START_COUNT = 10000;

export default function VisitCounter() {
  const [count, setCount] = useState<number>(START_COUNT);

  useEffect(() => {
    const storedCount = localStorage.getItem('visitCount');
    let newCount = storedCount ? parseInt(storedCount, 10) : START_COUNT;

    newCount += 1;
    localStorage.setItem('visitCount', newCount.toString());
    setCount(newCount);
  }, []);

  return (
    <div className="w-full bg-green-50 border-t border-green-220 py-8">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-sm text-green-700 uppercase tracking-wider">
          🌱 Growing with love
        </p>
        <h3 className="text-3xl md:text-4xl font-bold text-green-800 mt-2">
          {count.toLocaleString()}+
        </h3>
        <p className="text-green-700 mt-1">
          Happy visitors on Green Gift
        </p>
      </div>
    </div>
  );
}
