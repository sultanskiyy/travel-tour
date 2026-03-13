"use client";

import Container from "@/components/Container";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

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
      <div className="relative h-[260px] w-full bg-gray-200">
        <Image
          src={imgSrc}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
          onError={() => {
            if (imgSrc !== FALLBACK_IMAGE) {
              setImgSrc(FALLBACK_IMAGE);
            }
          }}
        />

        <div className="absolute inset-0 bg-black/25 transition-colors duration-300 group-hover:bg-black/35" />

        <div className="absolute bottom-0 left-0 w-full p-5">
          <h3 className="text-xl font-semibold text-white drop-shadow-md">
            {item.title}
          </h3>
        </div>
      </div>
    </Link>
  );
}

export default function DestinationsSection({ destinations = [] }: Props) {
  const safeDestinations = destinations.map((item, index) => ({
    id: item.id ?? index,
    title: item.title || "Destination",
    image: item.image || FALLBACK_IMAGE,
    href: item.href || "#",
  }));

  return (
    <section className="py-16">
      <Container className="px-4 md:px-6">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-sm font-medium text-emerald-500">
              Popular destinations
            </p>
            <h2 className="text-3xl font-bold text-black md:text-4xl">
              Explore Amazing Places
            </h2>
          </div>
        </div>

        {safeDestinations.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {safeDestinations.map((item) => (
              <DestinationCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl bg-gray-100 p-10 text-center text-gray-500">
            No destinations found
          </div>
        )}
      </Container>
    </section>
  );
}