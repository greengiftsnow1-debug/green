'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

const desktopBanners = [
  { type: 'video', src: '/plant-hero.mp4' },
  { type: 'image', src: '/banner1.jpg' },
  { type: 'image', src: '/banner2.jpg' },
  { type: 'image', src: '/banner3.jpg' },
];

const mobileBanners = [
  { type: 'image', src: '/mobile-banner1.jpg' },
  { type: 'image', src: '/mobile-banner2.jpg' },
  { type: 'image', src: '/mobile-banner3.png' },
];

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Choose banner set based on screen width
  const banners = useMemo(
    () => (isMobile ? mobileBanners : desktopBanners),
    [isMobile]
  );

  const currentBanner = useMemo(() => banners[currentIndex], [banners, currentIndex]);

  // Detect screen size on mount & resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners]);

  // Handle video play/pause
  useEffect(() => {
    if (currentBanner.type === 'video') {
      videoRef.current?.play();
    } else if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [currentBanner]);

  return (
    <div className="relative w-full h-[70vh] sm:h-[85vh] mt-20 sm:mt-24 overflow-hidden flex items-center justify-center bg-[#f5f5f5]">
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
