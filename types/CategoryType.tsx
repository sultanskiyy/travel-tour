export type CategoryType = {
    id: string
    created_at: number
    name: string
    name_uz: string
    name_ru: string
    slug: string
    icon?: string | null
    description?: string
    parent_id?: string | null
    sort_order: number
    is_active: boolean
}