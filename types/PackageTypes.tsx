export interface PackageType {
    country_id: string;
    cover_image: string;
    created_at: number;
    currency: string;
    departure_city: string;
    departure_date: string;
    description: string;
    destination_id: string;
    discount_pct: number;
    duration_days: number;
    duration_nights: number;

    excludes: string[];
    includes: string[];

    id: string;

    is_active: boolean;
    is_featured: boolean;
    is_flexible: boolean;

    itinerary: string;

    max_people: number;
    min_people: number;

    original_price: number;

    package_type: string;

    slug: string;

    title: string;
    title_ru: string;
    title_uz: string;

    total_price: number;

    updated_at: number;
}