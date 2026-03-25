import type { PackageType } from "@/types/PackageTypes";

export type SearchParamsType = {
  page?: string;
  search?: string;
  location?: string;
  duration?: string | string[];
  minPrice?: string;
  maxPrice?: string;
  onlyPromo?: string;

  destination?: string;
  date?: string;
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
    return item.duration_label;
  }

  if (typeof item.duration_days === "number") {
    return `${item.duration_days} days`;
  }

  return "Unknown duration";
}

export function applyFilters(
  packages: PackageType[],
  params: SearchParamsType
) {
  const search = getFirst(params.search).toLowerCase().trim();
  const location = getFirst(params.location || params.destination)
    .toLowerCase()
    .trim();
  const duration = getFirst(params.duration).toLowerCase().trim();
  const minPrice = Number(getFirst(params.minPrice) || 0);
  const maxPrice = Number(getFirst(params.maxPrice) || 0);
  const onlyPromo = getFirst(params.onlyPromo);

  return packages.filter((item) => {
    const title = String(
      item.title_uz || item.description_uz || item.description || ""
    ).toLowerCase();

    const itemLocation = String(item.departure_city || "").toLowerCase();
    const itemDuration = getDurationLabel(item).toLowerCase();
    const price = toNumber(item.total_price ?? item.original_price ?? 0);

    const matchesSearch = search ? title.includes(search) : true;
    const matchesLocation = location ? itemLocation.includes(location) : true;
    const matchesDuration = duration ? itemDuration.includes(duration) : true;
    const matchesMinPrice = minPrice ? price >= minPrice : true;
    const matchesMaxPrice = maxPrice ? price <= maxPrice : true;
    const matchesPromo = onlyPromo === "true" ? !!item.is_promotion : true;

    return (
      matchesSearch &&
      matchesLocation &&
      matchesDuration &&
      matchesMinPrice &&
      matchesMaxPrice &&
      matchesPromo
    );
  });
}