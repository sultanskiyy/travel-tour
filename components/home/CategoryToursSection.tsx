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
        onError={() =>
          setImgSrc(
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80"
          )
        }
      />

      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        <span className="text-lg font-semibold text-white">{name}</span>
      </div>
    </Link>
  );
}

const CategoryToursSection = ({ categories = [] }: Props) => {
  const validCategories = categories.filter(
    (el) => typeof el.icon === "string" && el.icon.startsWith("http")
  );

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
              name={el.name_uz}
              image={el.icon}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default CategoryToursSection;
