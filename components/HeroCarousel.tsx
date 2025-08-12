"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Slide {
  title: string;
  description: string;
  image: string;
  learnMore: string;
}

export default function HeroCarousel() {
  const t = useTranslations("HomePage");
  const [current, setCurrent] = useState(0);

  const carouselSlides: Slide[] = t.raw("carousel");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % carouselSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [carouselSlides.length]);

  const { title, description, image, learnMore } = carouselSlides[current];

  return (
    <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
      <Image
        src={image}
        alt={title}
        layout="fill"
        objectFit="cover"
        className="transition-opacity duration-700"
        priority
      />

      <div className="absolute inset-0 z-20 flex items-center md:items-center text-white bg-black/50">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-md">
            {title}
          </h2>
          <p className="text-lg md:text-xl mb-6 drop-shadow-sm">
            {description}
          </p>
          <Link
            href="/about"
            className="inline-block px-5 py-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 rounded-full font-medium text-white shadow-lg"
          >
            {learnMore}
          </Link>
        </div>
      </div>

    </div>
  );
}
