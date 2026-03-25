import getData from "@/service/api";
import type { CategoryType } from "@/types/CategoryType";
import type { DestinationType } from "@/types/DestinationType";

import HeroSection from "@/components/home/HeroSection";
import CategoryToursSection from "@/components/home/CategoryToursSection";
import VacationSearchSection from "@/components/home/VacationSearchSection";
import DestinationsSection from "@/components/home/DestinationsSection";
import AdventureSection from "@/components/home/AdventureSection";
import VideoPartnersSection from "@/components/home/VideoPartnersSection";
import PricingPackages from "@/components/home/PricingPackages";
import HomeToursSection from "@/components/home/HomeToursSection";

function pickString(obj: Record<string, unknown>, keys: string[]): string {
  for (const key of keys) {
    const value = obj[key];
    if (typeof value === "string" && value.trim() !== "") {
      return value;
    }
  }
  return "";
}

export default async function HomePage() {
  const [categoryResponse, destinationResponse] = await Promise.all([
    getData({ url: "category" }).catch(() => []),
    getData({ url: "destination" }).catch(() => []),
  ]);

  const categories: CategoryType[] = Array.isArray(categoryResponse)
    ? (categoryResponse as CategoryType[])
    : [];

  const destinations: DestinationType[] = Array.isArray(destinationResponse)
    ? (destinationResponse as DestinationType[])
    : [];

  const mappedDestinations = destinations.map((item) => {
    const raw = item as Record<string, unknown>;

    return {
      id: String(raw.id ?? ""),
      title:
        pickString(raw, ["title_uz", "title", "name_uz", "name"]) ||
        "Destination",
      image:
        pickString(raw, ["cover_image", "image"]) ||
        "/images/default-destination.jpg",
      href: `/destination/${String(raw.id ?? "")}`,
    };
  });

  return (
    <>
      <HeroSection />
      <CategoryToursSection categories={categories} />
      <HomeToursSection />
      <VacationSearchSection />
      <DestinationsSection destinations={mappedDestinations} />
      <AdventureSection />
      <VideoPartnersSection />
      <PricingPackages />
    </>
  );
}
