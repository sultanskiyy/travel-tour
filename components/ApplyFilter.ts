// components/ApplyFilter.ts

import type { PackageType } from "@/types/PackageTypes";

export type SearchParamsType = {
  page?: string | string[];
  search?: string | string[];
  location?: string | string[];
  duration?: string | string[];
  minPrice?: string | string[];
  maxPrice?: string | string[];
  onlyPromo?: string | string[];
  destination?: string | string[];
  date?: string | string[];
  typology?: string | string[];
  difficulty?: string | string[];
  minAge?: string | string[];
};

function toNumber(value: unknown): number {
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const parsed = Number(value.replace(/[^\d.]/g, ""));
    return Number.isNaN(parsed) ? 0 : parsed;
  }
  return 0;
}

function getFirst(value?: string | string[]): string {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

function getAll(value?: string | string[]): string[] {
  if (!value) return [];
  if (Array.isArray(value)) return value.filter(Boolean);
  return [value].filter(Boolean);
}

export function getDurationLabel(item: PackageType): string {
  if (typeof item.duration_label === "string" && item.duration_label.trim()) {
    return item.duration_label.trim();
  }
  if (typeof item.duration_days === "number") {
    return `${item.duration_days} days`;
  }
  return "Unknown duration";
}

export function applyFilters(
  packages: PackageType[] = [],
  params: SearchParamsType = {}
): PackageType[] {
  if (!Array.isArray(packages)) return [];

  const search = getFirst(params.search).toLowerCase().trim();
  const location = getFirst(params.location || params.destination)
    .toLowerCase()
    .trim();
  const minPrice = toNumber(getFirst(params.minPrice));
  const maxPrice = toNumber(getFirst(params.maxPrice));
  const onlyPromo = getFirst(params.onlyPromo).toLowerCase().trim();

  const typologies = getAll(params.typology).map((v) => v.toLowerCase());
  const durations = getAll(params.duration).map((v) => v.toLowerCase());
  const difficulties = getAll(params.difficulty).map((v) => v.toLowerCase());
  const minAges = getAll(params.minAge).map((v) => toNumber(v));

  return packages.filter((item) => {
    if (!item || typeof item !== "object") return false;

    const title = String(item.title_uz || "").toLowerCase();
    const description = String(
      item.description_uz || item.description || ""
    ).toLowerCase();
    const itemLocation = String(item.departure_city || "").toLowerCase();
    const itemDuration = getDurationLabel(item).toLowerCase();
    const price = toNumber(item.total_price ?? item.original_price ?? 0);
    const itemTypology = String(item.package_type || "").toLowerCase();
    const itemDifficulty = String(item.difficulty || "").toLowerCase();
    const itemMinAge = toNumber(item.min_age);

    const matchesSearch = search
      ? title.includes(search) || description.includes(search)
      : true;

    const matchesLocation = location
      ? itemLocation.includes(location)
      : true;

    const matchesDuration =
      durations.length > 0
        ? durations.some((d) => itemDuration.includes(d))
        : true;

    const matchesMinPrice = minPrice > 0 ? price >= minPrice : true;
    const matchesMaxPrice = maxPrice > 0 ? price <= maxPrice : true;

    const matchesPromo =
      onlyPromo === "true" ? Boolean(item.is_promotion) : true;

    const matchesTypology =
      typologies.length > 0
        ? typologies.some((t) => itemTypology.includes(t))
        : true;

    const matchesDifficulty =
      difficulties.length > 0
        ? difficulties.some((d) => itemDifficulty.includes(d))
        : true;

    const matchesMinAge =
      minAges.length > 0
        ? minAges.some((age) => itemMinAge <= age)
        : true;

    return (
      matchesSearch &&
      matchesLocation &&
      matchesDuration &&
      matchesMinPrice &&
      matchesMaxPrice &&
      matchesPromo &&
      matchesTypology &&
      matchesDifficulty &&
      matchesMinAge
    );
  });
}