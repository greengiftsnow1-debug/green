'use client';

import { useEffect, useState } from 'react';

export default function MouseTracker() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  if (!isDesktop) return null; // 🔥 HIDE ON MOBILE

  return (
    <div id="bee-cursor">
      {/* your existing bee cursor code */}
    </div>
  );
}
