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
    const cleaned = value.replace(/[^\d.]/g, "");
    const parsed = Number(cleaned);
    return Number.isNaN(parsed) ? 0 : parsed;
  }

  return 0;
}

function getFirst(value?: string | string[]): string {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
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
  const duration = getFirst(params.duration).toLowerCase().trim();
  const minPrice = toNumber(getFirst(params.minPrice));
  const maxPrice = toNumber(getFirst(params.maxPrice));
  const onlyPromo = getFirst(params.onlyPromo).toLowerCase().trim();
  const typology = getFirst(params.typology).toLowerCase().trim();
  const difficulty = getFirst(params.difficulty).toLowerCase().trim();
  const minAge = toNumber(getFirst(params.minAge));

  return packages.filter((item) => {
    if (!item || typeof item !== "object") return false;

    // FIX: `item.title` removed — PackageType has no `title` field, only `title_uz`
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

    const matchesDuration = duration
      ? itemDuration.includes(duration)
      : true;

    const matchesMinPrice = minPrice > 0
      ? price >= minPrice
      : true;

    const matchesMaxPrice = maxPrice > 0
      ? price <= maxPrice
      : true;

    const matchesPromo = onlyPromo === "true"
      ? Boolean(item.is_promotion)
      : true;

    const matchesTypology = typology
      ? itemTypology.includes(typology)
      : true;

    const matchesDifficulty = difficulty
      ? itemDifficulty.includes(difficulty)
      : true;

    // FIX: `>=` emas `<=` — paket min_age foydalanuvchi yoshidan kichik bo'lishi kerak
    const matchesMinAge = minAge > 0
      ? itemMinAge <= minAge
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
