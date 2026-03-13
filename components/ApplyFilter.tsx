import { PackageType } from "@/types/PackageTypes";

type SearchParams = {
    destination?: string;
    date?: string;
    typology?: string | string[];
    duration?: string | string[];
    difficulty?: string | string[];
    minAge?: string | string[];
    maxPrice?: string;
    onlyPromo?: string;
};

function toArray(value?: string | string[]) {
    if (!value) return [];
    return Array.isArray(value) ? value : [value];
}

export function applyFilters(data: PackageType[], sp: SearchParams) {

    const typologies = toArray(sp.typology);
    const durations = toArray(sp.duration);
    const difficulties = toArray(sp.difficulty);
    const minAges = toArray(sp.minAge).map(Number);

    const maxPrice = sp.maxPrice ? Number(sp.maxPrice) : Infinity;
    const onlyPromo = sp.onlyPromo === "1";

    return data.filter((tour) => {

        if (sp.destination?.trim()) {
            const q = sp.destination.trim().toLowerCase();

            const match =
                tour.departure_city?.toLowerCase().includes(q) ||
                tour.title_uz?.toLowerCase().includes(q);

            if (!match) return false;
        }

        if (sp.date && tour.departure_date) {
            const filterDate = new Date(sp.date).getTime();
            const tourDate = new Date(tour.departure_date).getTime();

            if (tourDate < filterDate) return false;
        }

        if (Number(tour.total_price) > maxPrice) return false;

        if (onlyPromo && !tour.is_promotion) return false;

        if (typologies.length > 0 && !typologies.includes(tour.package_type)) return false;

        if (durations.length > 0 && !durations.includes(tour.duration_label || "")) return false;

        if (difficulties.length > 0 && !difficulties.includes(tour.difficulty || "")) return false;

        if (minAges.length > 0 && !minAges.includes(Number(tour.min_age))) return false;

        return true;
    });
}