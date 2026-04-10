"use client"
export const dynamic = "force-dynamic";


import { useSearchParams } from "next/navigation"
import TourPage from "./TourPage"

export default function TourPageClient() {
  const searchParams = useSearchParams()
  const packageId = searchParams.get("id")

  return <TourPage packageId={packageId} />
}
