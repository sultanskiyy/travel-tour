"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Category = {
  id?: string;
  name: string;
  name_uz: string;
  name_ru: string;
  slug: string;
  icon: string;
  description: string;
  parent_id?: string;
  sort_order: number;
  is_active: boolean;
};

export default function ToursSection() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          "https://x8ki-letl-twmt.n7.xano.io/api:qNrTfAaz/category",
        );

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data: Category[] = await res.json();

        const activeCategories = data.filter((item) => item.is_active);

        setCategories(activeCategories);
      } catch (error) {
        console.error("Category olishda xatolik:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section className="bg-[#f5f5f5] py-16">
      <div className="w-full">
        <div className="relative h-45 overflow-hidden sm:h-60 md:h-75 lg:h-90">
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop"
            alt="Shop banner"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/25" />

          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              Shop
            </h1>
          </div>
        </div>
      </div>

      <div className="w-full bg-[#f5f5f5] px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex justify-end">
            <button className="rounded-md bg-gray-200 px-4 py-2 text-sm text-gray-600">
              Default sorting
            </button>
          </div>

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((item, index) => (
              <div key={item.id || index} className="text-center">
                <div className="overflow-hidden rounded-xl">
                  <Image
                    src={item.icon || "/placeholder.png"}
                    alt={item.name_uz || item.name || "category image"}
                    className="h-[260px] w-full rounded-xl object-cover transition hover:scale-105"
                    width={300}
                    height={200}
                  />
                </div>

                <h3 className="mt-4 text-lg font-semibold">
                  {item.name_uz || item.name}
                </h3>

                <p className="line-clamp-2 text-gray-500">{item.description}</p>

                <button className="mt-4 rounded-md bg-[#2ec4b6] px-5 py-2 text-sm text-white">
                  View category
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
