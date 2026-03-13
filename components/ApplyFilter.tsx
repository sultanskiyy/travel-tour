import { PackageType } from "@/types/PackageTypes";

export type SearchParamsType = {
  destination?: string;
  date?: string;
  typology?: string | string[];
  duration?: string | string[];
  difficulty?: string | string[];
  minAge?: string | string[];
  maxPrice?: string;
  onlyPromo?: string;
  page?: string;
};

function toArray(value?: string | string[]) {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

const normalize = (value: unknown) => String(value || "").trim().toLowerCase();

export function getDurationLabel(tour: PackageType) {
  if (tour.duration_label) return String(tour.duration_label).trim();
  if (tour.duration_days) return `${tour.duration_days} Days`;
  return "";
}

export function applyFilters(data: PackageType[], sp: SearchParamsType) {
  const typologies = toArray(sp.typology).map(normalize);
  const durations = toArray(sp.duration).map(normalize);
  const difficulties = toArray(sp.difficulty).map(normalize);
  const minAges = toArray(sp.minAge).map(Number).filter(Number.isFinite);

  const maxPrice = sp.maxPrice ? Number(sp.maxPrice) : Infinity;
  const onlyPromo = sp.onlyPromo === "1";

  return data.filter((tour) => {
    if (sp.destination?.trim()) {
      const q = sp.destination.trim().toLowerCase();

      const match =
        normalize(tour.departure_city).includes(q) ||
        normalize(tour.title_uz).includes(q) ||
        normalize(tour.package_type).includes(q);

      if (!match) return false;
    }

    if (sp.date && tour.departure_date) {
      const filterDate = new Date(sp.date).getTime();
      const tourDate = new Date(tour.departure_date).getTime();

      if (!Number.isNaN(filterDate) && !Number.isNaN(tourDate)) {
        if (tourDate < filterDate) return false;
      }
    }

    const price = Number(tour.total_price);
    if (Number.isFinite(maxPrice) && Number.isFinite(price) && price > maxPrice) {
      return false;
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

    if (minAges.length > 0 && !minAges.includes(Number(tour.min_age))) {
      return false;
    }

    return true;
  });
}