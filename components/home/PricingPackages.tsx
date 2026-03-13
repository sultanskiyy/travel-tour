"use client";

import React from "react";

const PricingPackages = () => {
  const packages = [
  {
    id: 1,
    name: "Half Board",
    price: 50,
    unit: "Day",
    features: [
      "Transfers from Airport",
      "Minimum 3 Star Hotel",
      "Alcoholic beverages",
      "Incl. Museum Tickets",
      "Meals in Restaurants",
    ],
    bgColor: "bg-gray-100",
    buttonColor: "bg-emerald-400 text-white",
    buttonText: "VIEW TRIPS",
    width: "w-72",   // hamma card bir xil width
    height: "h-80",  // eng kichik card (chap taraf)
  },
  {
    id: 2,
    name: "All Inclusive",
    price: 32,
    unit: "Day",
    features: [
      "Meals in Restaurants",
      "Alcoholic beverages",
      "Minimum 3 Star Hotel",
      "Transfers from Airport",
      "Incl. Museum Tickets",
    ],
    bgColor: "bg-emerald-400 text-white",
    buttonColor: "bg-gray-900 text-white",
    buttonText: "VIEW ALL",
    width: "w-72",    // hamma card bir xil width
    height: "h-96",   // eng uzun card (o‘rta)
  },
  {
    id: 3,
    name: "Excursions Included",
    price: 68,
    unit: "Day",
    features: [
      "Minimum 3 Star Hotel",
      "Meals in Restaurants",
      "Incl. Museum Tickets",
      "Meals in Restaurants",
      "Alcoholic beverages",
    ],
    bgColor: "bg-gray-800 text-white",
    buttonColor: "bg-emerald-400 text-white",
    buttonText: "BUTTON",
    badge: "POPULAR",
    width: "w-72",    // hamma card bir xil width
    height: "h-88",   // o‘rtacha card (o‘ng taraf)
  },
];


  return (
    <section className="py-20 px-6 lg:px-32 bg-white">
      <div className="text-center mb-12">
        <p className="text-sm text-emerald-400 uppercase tracking-widest">
          Clear Price
        </p>
        <h2 className="text-3xl font-bold mt-2">Affordable Travel Packages</h2>
        <p className="text-gray-600 mt-2 max-w-xl mx-auto">
          We believe that everyone deserves to experience their dream vacation
          without breaking the bank.
        </p>
      </div>

      {/* Packages grid with flexible width */}
      <div className="flex justify-center items-start gap-6 flex-wrap md:flex-nowrap">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className={`${pkg.bgColor} relative rounded-xl shadow-lg p-8 text-center ${pkg.width}`}
          >
            {pkg.badge && (
              <span className="absolute top-4 right-4 bg-emerald-400 text-white px-3 py-1 text-xs font-semibold rounded-full">
                {pkg.badge}
              </span>
            )}

            <h3
              className={`text-xl font-semibold mb-4 ${
                pkg.bgColor.includes("emerald") || pkg.bgColor.includes("gray-800")
                  ? "text-white"
                  : "text-black"
              }`}
            >
              {pkg.name}
            </h3>

            <div className="text-4xl font-bold mb-4">
              ${pkg.price}{" "}
              <span
                className={`text-lg font-normal ${
                  pkg.bgColor.includes("emerald") || pkg.bgColor.includes("gray-800")
                    ? "text-white"
                    : "text-gray-800"
                }`}
              >
                /{pkg.unit}
              </span>
            </div>

            <ul
              className={`text-sm space-y-1 mb-6 ${
                pkg.bgColor.includes("emerald") || pkg.bgColor.includes("gray-800")
                  ? "text-white text-opacity-80"
                  : "text-gray-600"
              }`}
            >
              {pkg.features.map((feat, i) => (
                <li key={i}>{feat}</li>
              ))}
            </ul>

            <button
              className={`${pkg.buttonColor} px-6 py-2 rounded-md text-sm font-semibold cursor-pointer`}
            >
              {pkg.buttonText}
            </button>
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-500 text-center mt-6">
        * All trips include medical insurance
      </p>
    </section>
  );
};

export default PricingPackages;
