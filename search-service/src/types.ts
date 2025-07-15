export interface Movie {
    id: number
    title: string
    year: number
    director?: string | null
    plot?: string | null
    poster?: string | null
}