'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';


const desktopBanners = [
  { type: 'video', src: '/plant-hero.mp4' },
  { type: 'image', src: '/Ban.jpg' },
  { type: 'image', src: '/banner2.png' },
];

const mobileBanners = [
  { type: 'image', src: '/mobile-banner1.jpg' }, // 300x250
  { type: 'image', src: '/Mob-ban2.png' },       // 300x250
  { type: 'image', src: '/mobile-banner3.jpg' }, // 300x250
];

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const touchStartX = useRef(0);

  const banners = useMemo(
    () => (isMobile ? mobileBanners : desktopBanners),
    [isMobile]
  );

  const currentBanner = banners[currentIndex];

  /* Detect screen */
  useEffect(() => {
    const resize = () => setIsMobile(window.innerWidth < 768);
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  /* Auto slide */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % banners.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [banners.length]);

  /* Video control */
  useEffect(() => {
    if (currentBanner.type === 'video') {
      videoRef.current?.play();
    } else if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [currentBanner]);

  /* Swipe */
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (delta > 50) setCurrentIndex((i) => (i + 1) % banners.length);
    if (delta < -50)
      setCurrentIndex((i) => (i - 1 + banners.length) % banners.length);
  };

  return (
    <section
      className="relative w-full overflow-hidden bg-black"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
     {/* ================= MOBILE HERO ================= */}
{isMobile && (
  <div className="relative w-full bg-transparent">
    <div className="relative w-full aspect-[300/250]">
      <Image
        src={currentBanner.src}
        alt="Green Gift Mobile Banner"
        fill
        priority
        className="object-contain"
      />
    </div>
  </div>
)}


      {/* ================= DESKTOP HERO ================= */}
      {!isMobile && (
        <div className="relative w-full h-screen">
          {currentBanner.type === 'video' ? (
            <video
              ref={videoRef}
              src={currentBanner.src}
              className="w-full h-full object-cover"
              muted
              loop
              playsInline
            />
          ) : (
            <Image
              src={currentBanner.src}
              alt="Green Gift Banner"
              fill
              priority
              className="object-cover"
            />
          )}
        </div>
      )}


      {/* SLIDE DOTS */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-2.5 h-2.5 rounded-full ${
              i === currentIndex ? 'bg-green-500' : 'bg-white/60'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
