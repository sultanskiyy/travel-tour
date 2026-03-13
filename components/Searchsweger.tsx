"use client";

import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../app/searchsweger.css";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import getData from "@/service/api";
import Image from "next/image";
import { PackageType } from "@/types/PackageTypes";

const Searchsweger = () => {
  const [category, setCategory] = useState<PackageType[]>([]);
  const progressCircle = useRef<SVGSVGElement | null>(null);
  const progressContent = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData({ url: "package" });
        setCategory(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Fetch error:", error);
        setCategory([]);
      }
    };

    fetchData();
  }, []);

  const onAutoplayTimeLeft = (
    _swiper: SwiperType,
    time: number,
    progress: number,
  ) => {
    if (progressCircle.current) {
      progressCircle.current.style.setProperty(
        "--progress",
        String(1 - progress),
      );
    }

    if (progressContent.current) {
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };

  return (
    <div className="relative">
      <Swiper
        spaceBetween={30}
        centeredSlides
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper"
      >
        {category.map((item) => (
          <SwiperSlide key={item.id}>
            <section className="w-full bg-white">
              <div className="relative h-[340px] w-full overflow-hidden md:h-[420px]">
                <Image
                  src={item.cover_image || "/placeholder.jpg"}
                  alt={item.title_uz || "Package image"}
                  fill
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-black/20" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <h1 className="text-center text-3xl font-bold text-white md:text-6xl">
                    Our Packages
                  </h1>
                </div>

                <div className="absolute bottom-6 left-8 flex items-center gap-6 text-[11px] uppercase tracking-[3px] text-white md:left-14 md:text-sm">
                  <button className="flex items-center gap-2 transition hover:text-teal-300">
                    Price
                    <span className="text-[10px]">▼</span>
                  </button>

                  <button className="flex items-center gap-2 transition hover:text-teal-300">
                    Name
                    <span className="text-[10px]">▼</span>
                  </button>
                </div>
              </div>
            </section>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="autoplay-progress">
        <svg viewBox="0 0 48 48" ref={progressCircle}>
          <circle cx="24" cy="24" r="20" />
        </svg>
        <span ref={progressContent}></span>
      </div>
    </div>
  );
};

export default Searchsweger;
