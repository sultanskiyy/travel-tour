import type { PackageType } from "@/types/PackageTypes";

export type SearchParamsType = {
  destination?: string;
  date?: string;
  typology?: string | string[];
  duration?: string | string[];
  difficulty?: string | string[];
  minAge?: string | string[];
  minPrice?: string;
  maxPrice?: string;
  onlyPromo?: string;
  page?: string;
};

function toArray(value?: string | string[]) {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

function normalize(value: unknown) {
  return String(value ?? "").trim().toLowerCase();
}

function toSafeNumber(value: unknown) {
  const num = Number(value);
  return Number.isFinite(num) ? num : null;
}

export function getDurationLabel(tour: PackageType) {
  if (tour.duration_label && String(tour.duration_label).trim()) {
    return String(tour.duration_label).trim();
  }

  if (tour.duration_days) {
    return `${tour.duration_days} Days`;
  }

  return "";
}

export function applyFilters(data: PackageType[], sp: SearchParamsType) {
  const typologies = toArray(sp.typology).map(normalize).filter(Boolean);
  const durations = toArray(sp.duration).map(normalize).filter(Boolean);
  const difficulties = toArray(sp.difficulty).map(normalize).filter(Boolean);
  const minAges = toArray(sp.minAge)
    .map((value) => Number(value))
    .filter(Number.isFinite);

  const minPrice = sp.minPrice ? Number(sp.minPrice) : 0;
  const maxPrice = sp.maxPrice ? Number(sp.maxPrice) : Infinity;
  const onlyPromo = sp.onlyPromo === "1";

  return data.filter((tour) => {
    if (sp.destination?.trim()) {
      const query = normalize(sp.destination);

      const matchesDestination =
        normalize(tour.departure_city).includes(query) ||
        normalize(tour.title_uz).includes(query) ||
        normalize(tour.package_type).includes(query);

      if (!matchesDestination) return false;
    }

    if (sp.date && tour.departure_date) {
      const filterDate = new Date(sp.date).getTime();
      const tourDate = new Date(tour.departure_date).getTime();

      if (!Number.isNaN(filterDate) && !Number.isNaN(tourDate)) {
        if (tourDate < filterDate) return false;
      }
    }

    const price = toSafeNumber(tour.total_price);
    if (price !== null) {
      if (price < minPrice) return false;
      if (Number.isFinite(maxPrice) && price > maxPrice) return false;
    }

    if (onlyPromo && !tour.is_promotion) return false;

    if (
      typologies.length > 0 &&
      !typologies.includes(normalize(tour.package_type))
    ) {
      return false;
    }

    if (
      durations.length > 0 &&
      !durations.includes(normalize(getDurationLabel(tour)))
    ) {
      return false;
    }

    if (
      difficulties.length > 0 &&
      !difficulties.includes(normalize(tour.difficulty))
    ) {
      return false;
    }

    const tourMinAge = toSafeNumber(tour.min_age);
    if (minAges.length > 0) {
      if (tourMinAge === null || !minAges.includes(tourMinAge)) {
        return false;
      }
    }

    return true;
  });
}