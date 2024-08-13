"use client";

import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Hero() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="relative h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="container mx-auto h-full flex flex-col items-center justify-center relative z-10">
        <h1 
          className={`text-5xl font-bold mb-8 text-white text-center cedarville-cursive-regular transition-all duration-500 ease-out ${isClient ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}
        >
          Welcome to the Acoustic Set
        </h1>
        <div
          className={`transition-all duration-500 ease-out delay-200 ${isClient ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
        >
          <Image
            src="/taylor-swift-acoustic.jpg"
            alt="Taylor Swift Acoustic"
            width={500}
            height={500}
            className="rounded-full"
          />
        </div>
      </div>
    </div>
  )
}