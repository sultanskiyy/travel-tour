
"use client";

import { useState } from "react";
import Container from "@/components/Container";
import Image from "next/image";
import Link from "next/link";
import type { DestinationType } from "@/types/DestinationType";

type Props = {
  destinations: DestinationType[];
};

const DestinationsSection = ({ destinations = [] }: Props) => {
  const [showAll, setShowAll] = useState(false);

  const visibleDestinations = showAll ? destinations : destinations.slice(0, 4);

  return (
    <section className="bg-white py-24">
      <Container className="px-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="max-w-xl">
            <p className="text-emerald-500 text-sm mb-3 font-medium">
              Next Adventure
            </p>

            <h2 className="text-4xl md:text-5xl font-extrabold text-black leading-tight">
              Travel Destinations <br /> Available Worldwide
            </h2>

            <p className="text-gray-500 text-sm mt-4 leading-6">
              We have compiled a list of top destinations across the globe,
              scoured the world for the most alluring and fascinating places to
              visit. From beaches to mountains and vibrant cities.
            </p>
          </div>

          <div className="hidden lg:block" />
        </div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {visibleDestinations.map((item) => {
            const rawImage = item.image || item.cover_image || item.icon || "";
            const imgSrc = rawImage && rawImage.trim() ? rawImage : "/placeholder.jpg";

            return (
              <Link
                key={item.id}
                href={`/destination/${item.slug || item.id}`}
                className="group relative h-[290px] rounded-2xl overflow-hidden bg-gray-200 shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_18px_50px_rgba(0,0,0,0.16)] transition-all duration-300"
              >
                <Image
                  src={imgSrc}
                  alt={item.name_uz || item.name || "Destination"}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.10]"
                  sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 260px"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent transition-opacity duration-300" />

                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.18),transparent_45%)]" />

                <div className="absolute bottom-6 left-0 right-0 px-5 text-center text-white">
                  <h3 className="text-xl font-extrabold drop-shadow-[0_8px_18px_rgba(0,0,0,0.55)]">
                    {item.name_uz || item.name || "Destination"}
                  </h3>

                  <p className="mt-2 text-xs leading-5 opacity-95 max-w-[210px] mx-auto line-clamp-2 drop-shadow">
                    {item.description || "No description"}
                  </p>

                  <div className="mt-4 flex justify-center">
                    <span className="h-[3px] w-10 rounded-full bg-white/65 group-hover:bg-emerald-400 transition" />
                  </div>
                </div>

                <div className="absolute left-4 top-4">
                  <span className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold text-white/90 backdrop-blur-md bg-white/15 border border-white/20">
                    Explore
                  </span>
                </div>
              </Link>
            );
          })}

          {destinations.length === 0 && (
            <div className="col-span-full text-center text-sm text-gray-400 py-10">
              Hozircha destination yo‘q...
            </div>
          )}
        </div>

        {destinations.length > 4 && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={() => setShowAll((prev) => !prev)}
              className="rounded-md bg-emerald-500 px-8 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600"
            >
              {showAll ? "Show Less" : "Learn More"}
            </button>
          </div>
        )}
      </Container>
    </section>
  );
};

export default DestinationsSection;