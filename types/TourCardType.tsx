export type TourCardType = {
    id: number
    title: string
    country: string
    days: string
    price: number
    oldPrice?: number
    image: string
    description: string
    sale: boolean
    accent: "green" | "cyan" | "purple"
}