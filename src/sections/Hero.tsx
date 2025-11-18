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
  const [navHeight, setNavHeight] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const banners = useMemo(
    () => (isMobile ? mobileBanners : desktopBanners),
    [isMobile]
  );

  const currentBanner = useMemo(
    () => banners[currentIndex],
    [banners, currentIndex]
  );

  // Detect navbar height dynamically
  useEffect(() => {
    const nav = document.querySelector('nav');
    if (nav) {
      const height = nav.getBoundingClientRect().height;
      setNavHeight(height);
    }
  }, []);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners]);

  // Play/pause video
  useEffect(() => {
    if (currentBanner.type === 'video') {
      videoRef.current?.play();
    } else if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [currentBanner]);

  return (
   <div
  className="relative w-full overflow-hidden"
  style={{
    height: "calc(100vh - 80px)",  // use navbar height
    marginTop: "80px",
  }}
>
  {currentBanner.type === 'video' ? (
    <video
      ref={videoRef}
      src={currentBanner.src}
      className="w-full h-full object-cover object-center"
      muted
      loop
      playsInline
    />
  ) : (
    <img
      src={currentBanner.src}
      alt="Hero Banner"
      className="w-full h-full object-cover object-center"
    />
  )}
</div>

  );
}
