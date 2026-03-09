"use client";

import { useEffect, useState } from "react";
import Container from "@/components/Container";
import Image from "next/image";
import Link from "next/link";
import {
  FaClock,
  FaEnvelope,
  FaShareAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

type PackageType = {
  id: string;
  title: string;
  title_uz: string;
  title_ru: string;
  slug: string;
  description: string;
  duration_days: number;
  total_price: number;
  original_price: number;
  departure_city: string;
  cover_image: string;
  discount_pct: number;
  is_active: boolean;
};

interface ToursSectionProps {
  tours?: PackageType[];
}

const ToursSection = ({ tours: initialTours }: ToursSectionProps = {}) => {
  const [packages, setPackages] = useState<PackageType[]>(initialTours || []);

  useEffect(() => {
    fetch("https://x8ki-letl-twmt.n7.xano.io/api:qNrTfAaz/package")
      .then((res) => res.json())
      .then((data) => {
        setPackages(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Package fetch error:", err);
        setPackages([]);
      });
  }, []);

  return (
    <section className="py-8">
      <Container className="mt-14 px-4 md:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3 place-items-center">
          {packages
            .filter((item) => item.is_active)
            .map((item) => {
              const hasSale =
                item.discount_pct > 0 || item.original_price > item.total_price;

              return (
                <div
                  key={item.id}
                  className="w-full max-w-sm overflow-hidden rounded-2xl bg-[#f6f6f6] shadow-[0_12px_35px_rgba(0,0,0,0.08)]"
                >
                  <div className="relative h-56 w-full">
                    <Image
                      src={item.cover_image}
                      alt={item.title_uz || item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 90vw, 360px"
                    />

                    {hasSale && (
                      <span className="absolute right-4 top-4 rounded-full bg-cyan-500 px-4 py-1.5 text-[12px] font-semibold tracking-[0.18em] text-white">
                        SALE
                      </span>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="rounded-[10px] bg-[#f1f1f1] px-5 py-4 shadow-sm">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-[15px] text-gray-500">
                          <FaClock className="text-cyan-500 text-[13px]" />
                          <span>{item.duration_days} Days</span>
                        </div>

                        <div className="flex items-center gap-4 text-cyan-500">
                          <FaEnvelope className="text-[13px]" />
                          <FaShareAlt className="text-[13px]" />
                        </div>
                      </div>
                    </div>

                    <h3 className="mt-7 text-[18px] font-extrabold text-black">
                      {item.title_uz || item.title}
                    </h3>

                    <div className="mt-3 flex items-center gap-2 text-[15px] text-gray-500">
                      <FaMapMarkerAlt className="text-cyan-500 text-[13px]" />
                      <span>{item.departure_city}</span>
                    </div>

                    <div className="my-5 h-px w-full bg-[#dddddd]" />

                    <p className="text-[15px] leading-8 text-gray-500 line-clamp-3">
                      {item.description}
                    </p>

                    <div className="my-5 h-px w-full bg-[#dddddd]" />

                    <div className="flex items-end justify-between gap-4">
                      <Link
                        href={`/single?id=${item.id}`}
                        className="rounded-md bg-cyan-500 px-7 py-3 text-base font-semibold text-white transition hover:bg-cyan-600"
                      >
                        Details
                      </Link>

                      <div className="text-right leading-none">
                        <p className="mb-2 text-[14px] text-gray-400">From</p>

                        <div className="flex items-end justify-end gap-2">
                          <span className="text-[20px] font-extrabold text-black">
                            $ {item.total_price}
                          </span>

                          {item.original_price > item.total_price && (
                            <span className="text-[14px] font-semibold text-gray-400 line-through">
                              $ {item.original_price}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </Container>
    </section>
  );
};

export default ToursSection;
