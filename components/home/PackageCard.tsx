"use client";

import React from "react";

type PackageCardProps = {
  name: string;
  price: number;
  unit: string;
  features: string[];
  isPopular?: boolean;
  highlight?: boolean; // markaziy paketni urg‘utish
};

const PackageCard: React.FC<PackageCardProps> = ({
  name,
  price,
  unit,
  features,
  isPopular = false,
  highlight = false,
}) => {
  return (
    <div
      className={`
        relative rounded-xl shadow-lg p-8 text-center transform transition-transform
        ${highlight ? "bg-emerald-400 text-white scale-105" : "bg-gray-100 text-gray-800"}
        hover:scale-105 duration-300
      `}
    >
      {isPopular && (
        <span className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 text-xs font-semibold rounded-full">
          POPULAR
        </span>
      )}

      <h3 className="text-xl font-semibold mb-4">{name}</h3>

      <div className="text-4xl font-bold mb-4">
        ${price} <span className="text-lg font-normal">/{unit}</span>
      </div>

      <ul className="text-sm space-y-1 mb-6">
        {features.map((feat, i) => (
          <li
            key={i}
            className="before:content-['✔'] before:text-emerald-400 before:mr-2"
          >
            {feat}
          </li>
        ))}
      </ul>

      <button
        className={`
          px-6 py-2 rounded-md text-sm font-semibold transition-colors
          ${highlight ? "bg-gray-900 text-white hover:bg-gray-800" : "bg-emerald-400 text-white hover:bg-emerald-500"}
        `}
      >
        {highlight ? "VIEW ALL" : "VIEW TRIPS"}
      </button>
    </div>
  );
};

export default PackageCard;
