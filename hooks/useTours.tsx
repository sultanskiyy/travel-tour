import type { TourCardType } from "@/types/TourCardType"

export const useTours = (): TourCardType[] => {
  return [
    {
      id: 1,
      title: "Chiang Mai",
      country: "Thailand",
      days: "4 Nights",
      price: 490,
      oldPrice: undefined,
      image: "/ormon.png",
      description:
        "Visit the temples and the Chiang Mai Night Bazaar, a huge market located on Chiang Klan Road.",
      sale: false,
      accent: "green",
    },
    {
      id: 2,
      title: "Chao Phraya",
      country: "Thailand",
      days: "5 Days",
      price: 98,
      oldPrice: 134,
      image: "/orol.png",
      description:
        "Boat tour in the capital of Thailand, Bangkok, to see the beautiful palaces and monuments from the water.",
      sale: true,
      accent: "cyan",
    },
    {
      id: 3,
      title: "Bangkok",
      country: "Thailand",
      days: "10 Days",
      price: 1000,
      oldPrice: 1023,
      image: "/city.png",
      description:
        "Marvelous culinary and cultural trip to the Thai capital with its wonderful monuments and Buddha statues.",
      sale: true,
      accent: "purple",
    },
  ]
}
