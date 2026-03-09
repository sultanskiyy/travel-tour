"use client";

import { useEffect, useState } from "react";
import getData from "@/service/api";
import type { CategoryType } from "@/types/CategoryType";

import HeroSection from "@/components/home/HeroSection";
import CategoryToursSection from "@/components/home/CategoryToursSection";
import ToursSection from "@/components/home/ToursSection";
import VacationSearchSection from "@/components/home/VacationSearchSection";
import AdventureSection from "@/components/home/AdventureSection";
import VideoPartnersSection from "@/components/home/VideoPartnersSection";

export default function HomePage() {
  const [categories, setCategories] = useState<CategoryType[]>([]);

  useEffect(() => {
    getData({ url: "category" }).then((data) => {
      setCategories(data as CategoryType[]);
    });
  }, []);

  return (
    <>
      <HeroSection />
      <CategoryToursSection categories={categories} />
      <ToursSection />
      <VacationSearchSection />
      <AdventureSection />
      <VideoPartnersSection />
    </>
  );
}