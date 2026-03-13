import FilterSearch from "@/components/FilterSearch";
import Searchsweger from "@/components/Searchsweger";
import TourCardsSarch from "@/components/TourCardsSarch";
import getData from "@/service/api";
import type { PackageType } from "@/types/PackageTypes";
import type { SearchParamsType } from "@/components/ApplyFilter";

type Props = {
  searchParams: Promise<SearchParamsType>;
};

export default async function Page({ searchParams }: Props) {
  const response = await getData({ url: "package" });
  const packages: PackageType[] = Array.isArray(response) ? response : [];

  return (
    <div className="w-full">
      <Searchsweger packages={packages} />

      <section className="bg-[#f5f5f5] py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[280px_minmax(0,1fr)]">
            <FilterSearch />
            <TourCardsSarch searchParams={searchParams} packages={packages} />
          </div>
        </div>
      </section>
    </div>
  );
}