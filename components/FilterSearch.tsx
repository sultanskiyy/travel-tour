"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { PackageType } from "@/types/PackageTypes";

type Props = {
  packages?: PackageType[];
};

const getDurationLabel = (item: PackageType) => {
  if (item.duration_label && String(item.duration_label).trim()) {
    return String(item.duration_label).trim();
  }
  if (item.duration_days) {
    return `${item.duration_days} Days`;
  }
  return "";
};

export default function FilterSearch({ packages = [] }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const typologies = useMemo(() => {
    return [
      ...new Set(
        packages
          .map((item) => item.package_type)
          .filter((v): v is string => Boolean(v && String(v).trim()))
      ),
    ];
  }, [packages]);

  const durations = useMemo(() => {
    return [
      ...new Set(
        packages
          .map((item) => getDurationLabel(item))
          .filter((v) => v.trim() !== "")
      ),
    ];
  }, [packages]);

  const difficulties = useMemo(() => {
    return [
      ...new Set(
        packages
          .map((item) => item.difficulty)
          .filter((v): v is string => Boolean(v && String(v).trim()))
      ),
    ];
  }, [packages]);

  const minAges = useMemo(() => {
    return [
      ...new Set(
        packages
          .map((item) => item.min_age)
          .filter((v) => v !== undefined && v !== null && String(v).trim() !== "")
          .map((v) => String(v))
      ),
    ];
  }, [packages]);

  const prices = useMemo(() => {
    return packages
      .map((item) => Number(item.total_price))
      .filter((v) => Number.isFinite(v));
  }, [packages]);

  const minAvailablePrice = useMemo(() => {
    if (prices.length === 0) return 0;
    return Math.min(...prices);
  }, [prices]);

  const maxAvailablePrice = useMemo(() => {
    if (prices.length === 0) return 1000;
    return Math.max(...prices);
  }, [prices]);

  const selectedValues = (key: string) => searchParams.getAll(key);

  const currentMinPrice = (() => {
    const value = Number(searchParams.get("minPrice"));
    if (Number.isFinite(value)) return value;
    return minAvailablePrice;
  })();

  const currentMaxPrice = (() => {
    const value = Number(searchParams.get("maxPrice"));
    if (Number.isFinite(value)) return value;
    return maxAvailablePrice;
  })();

  const pushParams = (params: URLSearchParams) => {
    params.set("page", "1");
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  const updateMultiValue = (key: string, value: string, checked: boolean) => {
    const params = new URLSearchParams(searchParams.toString());
    const current = params.getAll(key);

    params.delete(key);

    let nextValues = current;
    if (checked) {
      if (!current.includes(value)) nextValues = [...current, value];
    } else {
      nextValues = current.filter((v) => v !== value);
    }

    nextValues.forEach((v) => params.append(key, v));
    pushParams(params);
  };

  const updatePriceRange = (min: number, max: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("minPrice", String(min));
    params.set("maxPrice", String(max));
    pushParams(params);
  };

  const updateMinInput = (value: string) => {
    const nextMin = Number(value || 0);
    const safeMin = Math.max(
      minAvailablePrice,
      Math.min(nextMin, currentMaxPrice)
    );
    updatePriceRange(safeMin, currentMaxPrice);
  };

  const updateMaxInput = (value: string) => {
    const nextMax = Number(value || 0);
    const safeMax = Math.min(
      maxAvailablePrice,
      Math.max(nextMax, currentMinPrice)
    );
    updatePriceRange(currentMinPrice, safeMax);
  };

  const updateMinSlider = (value: string) => {
    const nextMin = Number(value);
    const safeMin = Math.min(nextMin, currentMaxPrice);
    updatePriceRange(safeMin, currentMaxPrice);
  };

  const updateMaxSlider = (value: string) => {
    const nextMax = Number(value);
    const safeMax = Math.max(nextMax, currentMinPrice);
    updatePriceRange(currentMinPrice, safeMax);
  };

  const clearFilters = () => {
    router.push(pathname, { scroll: false });
  };

  const renderGroup = (title: string, keyName: string, items: string[]) => (
    <div className="mt-10">
      <h3 className="text-[22px] font-semibold text-black">{title}</h3>
      <div className="mt-5 space-y-4">
        {items.map((item, index) => {
          const checked = selectedValues(keyName).includes(item);

          return (
            <label key={`${keyName}-${index}`} className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={checked}
                onChange={(e) => updateMultiValue(keyName, item, e.target.checked)}
                className="h-[18px] w-[18px] cursor-pointer rounded border border-gray-300 accent-emerald-500"
              />
              <span className="text-[18px] text-slate-500">{item}</span>
            </label>
          );
        })}
      </div>
    </div>
  );

  const range = maxAvailablePrice - minAvailablePrice || 1;
  const leftPercent = ((currentMinPrice - minAvailablePrice) / range) * 100;
  const rightPercent = ((currentMaxPrice - minAvailablePrice) / range) * 100;

  return (
    <aside className="w-full max-w-[350px] rounded-[20px] bg-[#f3f3f3] p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-[24px] font-bold text-black">Filters</h2>
        <button
          type="button"
          onClick={clearFilters}
          className="text-sm font-medium text-emerald-600 transition hover:text-emerald-700"
        >
          Clear
        </button>
      </div>

      <div className="mt-10">
        <h3 className="text-[22px] font-semibold text-black">Price</h3>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-white px-4 py-3 shadow-sm">
            <p className="text-xs text-gray-400">dan</p>
            <input
              type="number"
              min={minAvailablePrice}
              max={currentMaxPrice}
              value={currentMinPrice}
              onChange={(e) => updateMinInput(e.target.value)}
              className="mt-1 w-full bg-transparent text-[20px] font-semibold text-black outline-none"
            />
          </div>

          <div className="rounded-2xl bg-white px-4 py-3 shadow-sm">
            <p className="text-xs text-gray-400">gacha</p>
            <input
              type="number"
              min={currentMinPrice}
              max={maxAvailablePrice}
              value={currentMaxPrice}
              onChange={(e) => updateMaxInput(e.target.value)}
              className="mt-1 w-full bg-transparent text-[20px] font-semibold text-black outline-none"
            />
          </div>
        </div>

        <div className="relative mt-6 px-1">
          <div className="relative h-6">
            <div className="absolute top-1/2 h-[4px] w-full -translate-y-1/2 rounded-full bg-gray-300" />
            <div
              className="absolute top-1/2 h-[4px] -translate-y-1/2 rounded-full bg-emerald-500"
              style={{
                left: `${leftPercent}%`,
                width: `${rightPercent - leftPercent}%`,
              }}
            />

            <input
              type="range"
              min={minAvailablePrice}
              max={maxAvailablePrice}
              value={currentMinPrice}
              onChange={(e) => updateMinSlider(e.target.value)}
              className="range-slider absolute left-0 top-1/2 h-6 w-full -translate-y-1/2"
            />

            <input
              type="range"
              min={minAvailablePrice}
              max={maxAvailablePrice}
              value={currentMaxPrice}
              onChange={(e) => updateMaxSlider(e.target.value)}
              className="range-slider absolute left-0 top-1/2 h-6 w-full -translate-y-1/2"
            />
          </div>

          <div className="mt-2 flex items-center justify-between text-xs text-gray-400">
            <span>{minAvailablePrice}</span>
            <span>{maxAvailablePrice}</span>
          </div>
        </div>
      </div>

      {renderGroup("Typology", "typology", typologies)}
      {renderGroup("Duration", "duration", durations)}
      {renderGroup("Difficulty", "difficulty", difficulties)}
      {renderGroup("Min Age", "minAge", minAges)}
    </aside>
  );
}