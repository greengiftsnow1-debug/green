'use client';

import { Player } from '@lottiefiles/react-lottie-player';

interface LottieWrapperProps {
  src: string;
  height?: string;
  width?: string;
}

export default function LottieWrapper({
  src,
  height = '350px',
  width = '100%',
}: LottieWrapperProps) {
  return (
    <Player
      autoplay
      loop
      src={src}
      style={{ height, width }}
    />
  );
}
