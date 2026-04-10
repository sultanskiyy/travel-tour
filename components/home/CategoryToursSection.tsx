"use client";

import Container from "@/components/Container";
import type { CategoryType } from "@/types/CategoryType";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

type Props = {
  categories?: CategoryType[];
};

type CategoryCardProps = {
  id: number | string;
  name: string;
  image?: string | null;
};

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

function CategoryCard({ id, name, image }: CategoryCardProps) {
  const [imgSrc, setImgSrc] = useState(getSafeImageSrc(image));

  return (
    <Link
      href={`/category/${id}`}
      className="group relative block h-30 w-full overflow-hidden rounded-xl"
    >
      <Image
        fill
        src={imgSrc}
        alt={name}
        className="object-cover transition-transform duration-300 group-hover:scale-110"
        sizes="(max-width:768px) 100vw, 360px"
        onError={() => setImgSrc(FALLBACK_IMAGE)}
      />

      <div className="absolute inset-0 flex items-center justify-center bg-black/40">
        <span className="text-lg font-semibold text-white">{name}</span>
      </div>
    </Link>
  );
}

export default function CategoryToursSection({ categories = [] }: Props) {
  const validCategories = categories.filter((el) => {
    if (!el || typeof el !== "object") return false;

    const name = (el.name_uz || el.name || "").trim();

    if (!el.id) return false;
    if (!name) return false;
    if (name.toLowerCase() === "string") return false;

    return true;
  });

  return (
    <section className="py-16">
      <Container className="px-9">
        <div className="max-w-130 pb-10">
          <p className="text-sm font-medium text-emerald-500">
            Dream Vacation Destinations
          </p>

          <h2 className="mt-2 text-4xl font-bold">
            Plan the Trip of a Lifetime
          </h2>
        </div>
      </Container>

      <Container className="px-9">
        {validCategories.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-white p-10 text-center text-gray-500">
            Categories topilmadi
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {validCategories.map((el) => (
              <CategoryCard
                key={el.id}
                id={el.id}
                name={el.name_uz || el.name || "No Name"}
                image={el.icon}
              />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
