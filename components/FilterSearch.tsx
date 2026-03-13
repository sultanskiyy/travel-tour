"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import getData from "@/service/api";
import { PackageType } from "@/types/PackageTypes";
import { getDurationLabel } from "./ApplyFilter";

const cleanText = (value: unknown) => String(value || "").trim();

const FilterSearch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [packages, setPackages] = useState<PackageType[]>([]);
  const [localPrice, setLocalPrice] = useState(
    searchParams.get("maxPrice") || "5000",
  );

  useEffect(() => {
    setLocalPrice(searchParams.get("maxPrice") || "5000");
  }, [searchParams]);

  useEffect(() => {
    const fetchPackages = async () => {
      const data = await getData({ url: "package" });
      setPackages(Array.isArray(data) ? data : []);
    };

    fetchPackages();
  }, []);

  const filterOptions = useMemo(() => {
    const typologyOptions = Array.from(
      new Set(
        packages.map((item) => cleanText(item.package_type)).filter(Boolean),
      ),
    );

    const durationOptions = Array.from(
      new Set(
        packages
          .map((item) => cleanText(getDurationLabel(item)))
          .filter(Boolean),
      ),
    );

    const difficultyOptions = Array.from(
      new Set(
        packages.map((item) => cleanText(item.difficulty)).filter(Boolean),
      ),
    );

    const minAgeOptions = Array.from(
      new Set(packages.map((item) => cleanText(item.min_age)).filter(Boolean)),
    ).sort((a, b) => Number(a) - Number(b));

    const maxApiPrice = Math.max(
      0,
      ...packages.map((item) => Number(item.total_price) || 0),
    );

    const rangeMax =
      maxApiPrice > 0 ? String(Math.ceil(maxApiPrice / 100) * 100) : "5000";

    return {
      typologyOptions,
      durationOptions,
      difficultyOptions,
      minAgeOptions,
      rangeMax,
    };
  }, [packages]);

  const navigateWithParams = (params: URLSearchParams) => {
    params.delete("page");
    const query = params.toString();

    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  };

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value.trim()) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    navigateWithParams(params);
  };

  const updateCheckboxArray = (
    key: string,
    value: string,
    checked: boolean,
  ) => {
    const params = new URLSearchParams(searchParams.toString());
    const currentValues = params.getAll(key);

    let nextValues: string[] = [];

    if (checked) {
      nextValues = Array.from(new Set([...currentValues, value]));
    } else {
      nextValues = currentValues.filter((item) => item !== value);
    }

    params.delete(key);
    nextValues.forEach((item) => params.append(key, item));

    navigateWithParams(params);
  };

  const updatePromo = (checked: boolean) => {
    const params = new URLSearchParams(searchParams.toString());

    if (checked) {
      params.set("onlyPromo", "1");
    } else {
      params.delete("onlyPromo");
    }

    navigateWithParams(params);
  };

  const applyPriceFilter = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("maxPrice", localPrice);
    navigateWithParams(params);
  };

  const clearAllFilters = () => {
    router.replace(pathname, { scroll: false });
  };

  return (
    <aside className="w-full lg:w-[280px]">
      <div className="space-y-8 rounded-xl bg-white p-5 shadow-sm lg:sticky lg:top-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-black">Filters</h2>
          <button
            onClick={clearAllFilters}
            className="text-sm font-medium text-emerald-500"
          >
            Clear
          </button>
        </div>

        <div>
          <h3 className="mb-4 text-[15px] font-semibold text-black">
            Select your destination :
          </h3>
          <input
            type="text"
            placeholder="All Destinations"
            value={searchParams.get("destination") || ""}
            onChange={(e) => updateParam("destination", e.target.value)}
            className="h-11 w-full rounded-md border border-gray-200 px-4 text-sm outline-none"
          />
        </div>

        <div>
          <h3 className="mb-4 text-[15px] font-semibold text-black">
            Select your date :
          </h3>
          <input
            type="date"
            value={searchParams.get("date") || ""}
            onChange={(e) => updateParam("date", e.target.value)}
            className="h-11 w-full rounded-md border border-gray-200 px-4 text-sm outline-none"
          />
        </div>

        <div>
          <h3 className="mb-4 text-[15px] font-semibold text-black">
            Typologies :
          </h3>

          <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-[12px] text-gray-600">
            {filterOptions.typologyOptions.map((item) => (
              <label key={item} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={searchParams.getAll("typology").includes(item)}
                  onChange={(e) =>
                    updateCheckboxArray("typology", item, e.target.checked)
                  }
                  className="h-4 w-4"
                />
                <span>{item}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-[15px] font-semibold text-black">
            Max Price :
          </h3>

          <input
            type="range"
            min="0"
            max={filterOptions.rangeMax}
            step="50"
            value={localPrice}
            onChange={(e) => setLocalPrice(e.target.value)}
            onMouseUp={applyPriceFilter}
            onTouchEnd={applyPriceFilter}
            className="w-full accent-rose-500"
          />

          <div className="mt-2 flex justify-end text-sm text-gray-500">
            $ {localPrice}
          </div>

          <label className="mt-4 flex items-center gap-2 text-[12px] text-gray-600">
            <input
              type="checkbox"
              checked={searchParams.get("onlyPromo") === "1"}
              onChange={(e) => updatePromo(e.target.checked)}
              className="h-4 w-4"
            />
            <span>See only promotions</span>
          </label>
        </div>

        <div>
          <h3 className="mb-4 text-[15px] font-semibold text-black">
            Durations :
          </h3>

          <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-[12px] text-gray-600">
            {filterOptions.durationOptions.map((item) => (
              <label key={item} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={searchParams.getAll("duration").includes(item)}
                  onChange={(e) =>
                    updateCheckboxArray("duration", item, e.target.checked)
                  }
                  className="h-4 w-4"
                />
                <span>{item}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-[15px] font-semibold text-black">
            Difficulty :
          </h3>

          <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-[12px] text-gray-600">
            {filterOptions.difficultyOptions.map((item) => (
              <label key={item} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={searchParams.getAll("difficulty").includes(item)}
                  onChange={(e) =>
                    updateCheckboxArray("difficulty", item, e.target.checked)
                  }
                  className="h-4 w-4"
                />
                <span>{item}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-[15px] font-semibold text-black">
            Min Age :
          </h3>

          <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-[12px] text-gray-600">
            {filterOptions.minAgeOptions.map((item) => (
              <label key={item} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={searchParams.getAll("minAge").includes(item)}
                  onChange={(e) =>
                    updateCheckboxArray("minAge", item, e.target.checked)
                  }
                  className="h-4 w-4"
                />
                <span>{item}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default FilterSearch;
