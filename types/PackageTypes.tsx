export type PackageType = {
    id: string;

    cover_image: string;

    departure_city: string;

    title_uz: string;

    description: string;

    package_type: string;

    total_price: number;

    original_price?: number;

    discount_pct?: number;

    is_promotion?: boolean;

    duration_days?: number;

    duration_label?: string;

    difficulty?: string;

    min_age?: number;

    departure_date?: string;
};