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
import { CategoryType } from "@/types/CategoryType";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80";

function getSafeImageSrc(value?: string | null) {
  if (!value) return FALLBACK_IMAGE;

  const trimmed = value.trim();

  if (!trimmed || trimmed === "string") return FALLBACK_IMAGE;

  if (
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://") ||
    trimmed.startsWith("/")
  ) {
    return trimmed;
  }

  return FALLBACK_IMAGE;
}

const SwiperBlog = () => {
  const [category, setCategory] = useState<CategoryType[]>([]);
  const progressCircle = useRef<SVGSVGElement | null>(null);
  const progressContent = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData({ url: "category" });
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
    progress: number
  ) => {
    if (progressCircle.current) {
      progressCircle.current.style.setProperty(
        "--progress",
        String(1 - progress)
      );
    }

    if (progressContent.current) {
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };

  const validCategory = category.filter((item) => item?.id);

  return (
    <div className="relative h-full w-full">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="h-full w-full"
      >
        {validCategory.map((item) => (
          <SwiperSlide key={item.id} className="h-full">
            <section className="h-full w-full">
              <div className="relative h-full w-full overflow-hidden">
                <Image
                  src={getSafeImageSrc(item?.icon)}
                  alt={item?.name_uz?.trim() || "Package image"}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />

                <div className="absolute inset-0 bg-black/20" />
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

export default SwiperBlog;