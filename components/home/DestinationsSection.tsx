
"use client";

import Container from "@/components/Container";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

type DestinationItem = {
  id: number | string;
  title: string;
  image: string;
  href?: string;
};

type Props = {
  destinations?: DestinationItem[];
};

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80";

function DestinationCard({ item }: { item: DestinationItem }) {
  const [imgSrc, setImgSrc] = useState(item.image || FALLBACK_IMAGE);

  return (
    <Link
      href={item.href || "#"}
      className="group block overflow-hidden rounded-2xl"
    >
      <div className="relative h-[320px] w-full bg-gray-200 rounded-2xl overflow-hidden">
        <Image
          src={imgSrc}
          alt={item.title}
          fill
          quality={100}
          sizes="(max-width:768px) 100vw, (max-width:1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition" />

        <div className="absolute bottom-6 left-6 text-white">
          <h3 className="text-2xl font-bold">{item.title}</h3>
          <p className="text-sm opacity-90">
            Experience the ancient history & beaches
          </p>
        </div>
      </div>
    </Link>
  );
}

export default function DestinationsSection({ destinations = [] }: Props) {
  return (
    <section className="py-16">
      <Container className="px-4 md:px-6">
        <div className="mb-10">
          <p className="mb-2 text-sm font-medium text-emerald-500">
            Popular destinations
          </p>

          <h2 className="text-3xl font-bold md:text-4xl">
            Explore Amazing Places
          </h2>
        </div>

        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          slidesPerView={4}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          loop={true}
          breakpoints={{
            320: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
        >
          {destinations.map((item) => (
            <SwiperSlide key={item.id}>
              <DestinationCard item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </section>
  );
}
