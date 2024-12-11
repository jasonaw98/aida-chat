'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-white transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-24 w-24 animate-pulse">
          <Image
            src="/aidaicon.png"
            alt="Logo"
            fill
            style={{ objectFit: 'contain' }}
            priority
          />
        </div>
        <p className="text-sm text-gray-600 font-bold animate-pulse">
          Powered by TRUSTED AI Frameworks
        </p>
      </div>
    </div>
  );
}
