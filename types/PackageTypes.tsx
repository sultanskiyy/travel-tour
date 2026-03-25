export type PackageType = {
  id: number;
  cover_image?: string;
  title_uz?: string;
  description?: string;
  description_uz?: string;
  package_type?: string;
  departure_city?: string;
  departure_date?: string;
  duration_days?: number;
  duration_label?: string;
  difficulty?: string;
  min_age?: number | string;
  total_price?: number | string;
  original_price?: number | string;
  is_promotion?: boolean;
};
