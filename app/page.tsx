import type { CategoryType } from "@/types/CategoryType";
import { getData } from "@/service/api";


import HeroSection from "@/components/home/HeroSection";
import CategoryToursSection from "@/components/home/CategoryToursSection";
import VacationSearchSection from "@/components/home/VacationSearchSection";
import DestinationsSection from "@/components/home/DestinationsSection";
import AdventureSection from "@/components/home/AdventureSection";
import VideoPartnersSection from "@/components/home/VideoPartnersSection";
import PricingPackages from "@/components/home/PricingPackages";
import HomeToursSection from "@/components/home/HomeToursSection";

export const dynamic = "force-dynamic";

type AnyRecord = Record<string, unknown>;

function isRecord(value: unknown): value is AnyRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function pickString(obj: AnyRecord, keys: string[]): string {
  for (const key of keys) {
    const value = obj[key];
    if (typeof value === "string" && value.trim() !== "" && value.trim() !== "string") {
      return value.trim();
    }
  }
  return "";
}

function isValidId(value: unknown) {
  return typeof value === "string" || typeof value === "number";
}

function sanitizeCategories(data: unknown): CategoryType[] {
  if (!Array.isArray(data)) return [];

  return data.filter((item): item is CategoryType => {
    if (!isRecord(item)) return false;

    const id = item.id;
    const name =
      pickString(item, ["name_uz", "name", "title_uz", "title"]);

    if (!isValidId(id)) return false;
    if (!name) return false;

    return true;
  });
}

function sanitizeDestinations(data: unknown) {
  if (!Array.isArray(data)) return [];

  return data
    .filter((item) => {
      if (!isRecord(item)) return false;
      if (!isValidId(item.id)) return false;

      const title = pickString(item, ["title_uz", "title", "name_uz", "name"]);
      return !!title;
    })
    .map((item) => {
      const raw = item as AnyRecord;

      return {
        id: String(raw.id),
        title:
          pickString(raw, ["title_uz", "title", "name_uz", "name"]) ||
          "Destination",
        image:
          pickString(raw, ["cover_image", "image"]) ||
          "/images/default-destination.jpg",
        href: `/destination/${String(raw.id)}`,
      };
    });
}

export default async function HomePage() {
  const [categoryResponse, destinationResponse] = await Promise.all([
    getData({ url: "category" }).catch(() => []),
    getData({ url: "destination" }).catch(() => []),
  ]);

  const categories = sanitizeCategories(categoryResponse);
  const mappedDestinations = sanitizeDestinations(destinationResponse);

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
