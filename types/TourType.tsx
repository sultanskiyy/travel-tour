
export interface TourType {
  id: string;
  created_at: string;
  destination_id: string;
  category_id: string;

  title: string;
  title_uz: string;
  title_ru: string;
  slug: string;

  description: string;

  highlights: string[];
  includes: string[];
  excludes: string[];

  itinerary: string;

  duration_days: number;
  duration_nights: number;

  min_people: number;
  max_people: number;

  difficulty: string;

  base_price: number;
  currency: string;
  discount_pct: number;

  cover_image: string;

  meeting_point: string;
  meeting_lat: number;
  meeting_lng: number;

  is_featured: boolean;
  is_active: boolean;

  updated_at: number;
};