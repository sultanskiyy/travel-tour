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
  if (!value) return null;

  const trimmed = value.trim();

  if (!trimmed || trimmed === "string") return null;

  if (
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://") ||
    trimmed.startsWith("/")
  ) {
    return trimmed;
  }

  return null;
}

function CategoryCard({ id, name, image }: CategoryCardProps) {
  const safeImage = getSafeImageSrc(image);
  const [imgSrc, setImgSrc] = useState(safeImage || FALLBACK_IMAGE);

  if (!safeImage) return null;

  return (
    <Link
      href={`/category/${id}`}
      className="group relative block h-[120px] w-full overflow-hidden rounded-xl"
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

const CategoryToursSection = ({ categories = [] }: Props) => {
  const validCategories = categories.filter((el) => {
    const icon = typeof el.icon === "string" ? el.icon.trim() : "";
    return !!el.id && !!el.name_uz && !!icon && icon !== "string";
  });

  return (
    <section className="py-16">
      <Container className="px-9">
        <div className="max-w-[520px] pb-10">
          <p className="text-sm text-emerald-500 font-medium">
            Dream Vacation Destinations
          </p>

          <h2 className="text-4xl font-bold mt-2">
            Plan the Trip of a Lifetime
          </h2>
        </div>
      </Container>

      <Container className="px-9">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {validCategories.map((el) => (
            <CategoryCard
              key={el.id}
              id={el.id}
              name={el.name_uz || "No Name"}
              image={el.icon}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default CategoryToursSection;
