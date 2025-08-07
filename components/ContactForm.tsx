import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const t = useTranslations("HomePage.carousel");

  const slides = [
    {
      image: "/background_studio.webp",
      title: t("slides[0].title"),
      subtitle: t("slides[0].subtitle"),
    },
    {
      image: "/carousel2.webp",
      title: t("slides[1].title"),
      subtitle: t("slides[1].subtitle"),
    },
    {
      image: "/carousel3.webp",
      title: t("slides[2].title"),
      subtitle: t("slides[2].subtitle"),
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const { image, title, subtitle } = slides[current];

  return (
    <section className="relative h-[500px] w-full overflow-hidden rounded-b-3xl shadow-md">
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover transition-opacity duration-1000"
        sizes="100vw"
        priority
      />
      <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center text-white px-4">
        <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
          {title}
        </h1>
        <p className="mt-4 text-lg md:text-xl">{subtitle}</p>
        <Link href="/schedule">
          <Button className="mt-6 px-6 py-3 text-lg bg-pink-600 hover:bg-pink-700">
            {t("cta")}
          </Button>
        </Link>
      </div>
    </section>
  );
}
