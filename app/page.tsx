"use client";

import { useEffect, useState } from "react";
import getData from "@/service/api";

import type { CategoryType } from "@/types/CategoryType";
import type { DestinationType } from "@/types/DestinationType";

import HeroSection from "@/components/home/HeroSection";
import CategoryToursSection from "@/components/home/CategoryToursSection";
import ToursSection from "@/components/home/ToursSection";
import VacationSearchSection from "@/components/home/VacationSearchSection";
import DestinationsSection from "@/components/home/DestinationsSection";
import AdventureSection from "@/components/home/AdventureSection";
import VideoPartnersSection from "@/components/home/VideoPartnersSection";

export default function HomePage() {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [destinations, setDestinations] = useState<DestinationType[]>([]);

  useEffect(() => {
    getData({ url: "category" }).then((data) => {
      setCategories(Array.isArray(data) ? (data as CategoryType[]) : []);
    });

    getData({ url: "destination" }).then((data) => {
      setDestinations(Array.isArray(data) ? (data as DestinationType[]) : []);
    });
  }, []);

  return (
    <>
      <HeroSection />
      <CategoryToursSection categories={categories} />
      <ToursSection />
      <VacationSearchSection />
      <DestinationsSection destinations={destinations} />
      <AdventureSection />
      <VideoPartnersSection />
    </>
  );
}
