"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import type { PackageType } from "@/types/PackageTypes";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type Props = {
  packages?: PackageType[];
};

const Searchsweger = ({ packages = [] }: Props) => {
  if (packages.length === 0) {
    return (
      <section className="w-full bg-white">
        <div className="relative flex h-[340px] w-full items-center justify-center overflow-hidden bg-gray-200 md:h-[420px]">
          <h1 className="text-center text-3xl font-bold text-gray-700 md:text-6xl">
            Our Packages
          </h1>
        </div>
      </section>
    );
  }

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
        className="mySwiper"
      >
        {packages.map((item) => (
          <SwiperSlide key={item.id}>
            <section className="w-full bg-white">
              <div className="relative h-[340px] w-full overflow-hidden md:h-[420px]">
                {item.cover_image ? (
                  <Image
                    src={item.cover_image}
                    alt={item.title_uz || "Package image"}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-300">
                    <span className="text-lg font-medium text-gray-700">
                      No image
                    </span>
                  </div>
                )}

                <div className="absolute inset-0 bg-black/30" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <h1 className="text-center text-3xl font-bold text-white md:text-6xl">
                    Our Packages
                  </h1>
                </div>
              </div>
            </section>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Searchsweger;