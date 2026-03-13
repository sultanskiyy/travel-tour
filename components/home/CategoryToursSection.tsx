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
  image: string;
};

function CategoryCard({ id, name, image }: CategoryCardProps) {
  const [imgSrc, setImgSrc] = useState(image);

  return (
    <div className="group relative h-[120px] w-full cursor-pointer overflow-hidden rounded-xl">
      <Link
        href={`/category/${id}`}
        className="absolute inset-0 z-10 flex items-center justify-center"
      >
        <span className="relative z-10 text-lg font-semibold text-white drop-shadow-lg">
          {name}
        </span>
      </Link>

      <Image
        fill
        src={imgSrc}
        alt={name || "Category"}
        className="object-cover transition-transform duration-300 group-hover:scale-110"
        sizes="(max-width: 768px) 90vw, 360px"
        onError={() => setImgSrc("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80")}
      />

      <div className="absolute inset-0 bg-black/30 transition-colors duration-300 group-hover:bg-black/40" />
    </div>
  );
}

const CategoryToursSection = ({ categories = [] }: Props) => {
  const validCategories = categories.filter((el) => {
    return (
      typeof el.icon === "string" &&
      el.icon.trim() !== "" &&
      (el.icon.startsWith("http://") || el.icon.startsWith("https://"))
    );
  });

  return (
    <section className="py-16">
      <Container className="px-9">
        <div className="max-w-[520px] pb-10">
          <p className="mb-2 text-sm font-medium text-emerald-500">
            Dream Vacation Destinations
          </p>

          <h2 className="text-4xl font-extrabold leading-tight text-black md:text-5xl">
            Plan the Trip of a Lifetime <br /> with Ease
          </h2>

          <p className="mt-5 text-sm leading-6 text-gray-500">
            Whether you are looking for a romantic getaway, a family-friendly
            adventure, or a solo journey to explore the world, a travel agency
            can provide you with a custom-tailored itinerary that exceeds your
            expectations.
          </p>

          <button className="mt-6 rounded-md bg-emerald-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600">
            More Info
          </button>
        </div>
      </Container>

      <Container className="px-9">
        <div className="grid grid-cols-1 place-items-center gap-6 md:grid-cols-3">
          {validCategories.map((el) => (
            <CategoryCard
              key={el.id}
              id={el.id}
              name={el.name_uz || "Category"}
              image={el.icon as string}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default CategoryToursSection;