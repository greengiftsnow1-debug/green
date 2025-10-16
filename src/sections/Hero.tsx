'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

const banners = [
  { type: 'video', src: '/plant-hero.mp4' },
  { type: 'image', src: '/banner1.jpg' },
  { type: 'image', src: '/banner2.jpg' },
  { type: 'image', src: '/banner3.jpg' },
];

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const currentBanner = useMemo(() => banners[currentIndex], [currentIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (currentBanner.type === 'video') {
      videoRef.current?.play();
    } else {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [currentBanner]);

  return (
    <div
  className="relative w-full h-[80vh] mt-24 overflow-hidden flex items-center justify-center bg-black"
>

      {currentBanner.type === 'video' ? (
        <video
          ref={videoRef}
          src={currentBanner.src}
          className="w-full h-full object-cover"
          muted
          loop
          playsInline
          preload="auto"
        />
      ) : (
        <img
          src={currentBanner.src}
          alt="Hero Banner"
          className="w-full h-full object-cover"
        />
      )}

      
      
    </div>
  );
}
