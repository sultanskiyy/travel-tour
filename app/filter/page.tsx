"use client"

import { useEffect, useState } from "react"

type Category = {
  id?: string
  name: string
  name_uz: string
  name_ru: string
  slug: string
  icon: string
  description: string
  parent_id?: string
  sort_order: number
  is_active: boolean
}

export default function ToursSection() {
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          "https://x8ki-letl-twmt.n7.xano.io/api:qNrTfAaz/category"
        )
        const data = await res.json()

        const activeCategories = data.filter(
          (item: Category) => item.is_active
        )

        setCategories(activeCategories)
      } catch (error) {
        console.error("Category olishda xatolik:", error)
      }
    }

    fetchCategories()
  }, [])

  return (
    <section className="bg-[#f5f5f5] py-16">
      <div className="w-full">
        <div className="relative h-45 sm:h-60 md:h-75 lg:h-90 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop"
            alt="Shop banner"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/25" />

          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold">
              Shop
            </h1>
          </div>
        </div>
      </div>

      <div className="w-full bg-[#f5f5f5] py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-end mb-8">
            <button className="bg-gray-200 text-gray-600 text-sm px-4 py-2 rounded-md">
              Default sorting
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {categories.map((item, index) => (
              <div key={item.id || index} className="text-center">
                <div className="overflow-hidden rounded-xl">
                  <img
                    src={item.icon}
                    alt={item.name_uz || item.name}
                    className="w-full h-65 object-cover rounded-xl hover:scale-105 transition"
                  />
                </div>

                <h3 className="mt-4 text-lg font-semibold">
                  {item.name_uz || item.name}
                </h3>

                <p className="text-gray-500 line-clamp-2">
                  {item.description}
                </p>

                <button className="mt-4 bg-[#2ec4b6] text-white px-5 py-2 rounded-md text-sm">
                  View category
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}