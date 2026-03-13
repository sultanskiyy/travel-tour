
import FilterSearch from "@/components/FilterSearch";
import Searchsweger from "@/components/Searchsweger";
import TourCardsSarch from "@/components/TourCardsSarch";

type SearchParams = Promise<{
  destination?: string;
  date?: string;
  typology?: string | string[];
  duration?: string | string[];
  difficulty?: string | string[];
  minAge?: string | string[];
  maxPrice?: string;
  onlyPromo?: string;
  page?: string;
}>;

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return (
    <div className="w-full">
      <Searchsweger />

      <section className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[280px_minmax(0,1fr)]">
          <FilterSearch />
          <TourCardsSarch searchParams={searchParams} />
        </div>
      </section>
    </div>
  );
}

