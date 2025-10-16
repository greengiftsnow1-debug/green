'use client';

import { useEffect, useState } from 'react';

export default function MouseTracker() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const moveBee = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', moveBee);
    return () => window.removeEventListener('mousemove', moveBee);
  }, []);

  return (
    <img
      src="/bee.png"
      alt="Bee Cursor"
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        width: 60,
        height: 60,
        pointerEvents: 'none',
        transform: 'translate(-50%, -50%)',
        transition: 'transform 0.05s linear',
        zIndex: 9999,
      }}
    />
  );
}
