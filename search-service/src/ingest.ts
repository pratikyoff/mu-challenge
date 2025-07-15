import { prisma } from './db/db.ts'

const API_KEY = process.env.OMDB_API_KEY
const BASE_URL = `http://www.omdbapi.com/?apikey=${API_KEY}`

const searchString = 'space'
const year = 2020

interface SearchItem {
    imdbID: string
}

interface SearchResult {
    Search: SearchItem[]
    Response: string,
    totalResults: string
}

interface MovieDetails {
    Response: string
    Title: string
    Year: string
    Director: string
    Plot: string
    Poster: string
}

const fetchJson = async (url: string) => {
    const res = await fetch(url)
    return await res.json()
}

const normalizeNA = (text: string) => {
    return text === 'N/A' ? undefined : text
}

const ingest = async () => {
    const isMovieTableEmpty = await prisma.movie.count() === 0
    if (!isMovieTableEmpty) {
        console.log('Movie table is not empty, skipping ingestion')
        return
    }

    console.log('Starting ingestion for movies...')
    let page = 1
    while (true) {
        const search: SearchResult = await fetchJson(`${BASE_URL}&s=${searchString}&type=movie&y=${year}&page=${page}`)
        if (search.Response === 'False' || !search.Search) {
            break
        }
        const items = [] as {
            title: string,
            year: number,
            director?: string,
            plot?: string,
            poster?: string
        }[]
        for (const item of search.Search) {
            const detail: MovieDetails = await fetchJson(`${BASE_URL}&i=${item.imdbID}&plot=full`)
            if (detail.Response === 'True') {
                items.push({
                    title: detail.Title,
                    year: parseInt(detail.Year),
                    director: normalizeNA(detail.Director),
                    plot: normalizeNA(detail.Plot),
                    poster: normalizeNA(detail.Poster)
                })
            }
        }
        if (items.length) {
            await prisma.movie.createMany({ data: items })
        }
        page++

        console.log(`Processed page ${page - 1} with ${items.length} items`)
    }
    console.log('Ingestion completed')
}

ingest().catch(err => {
    console.error(err)
    process.exit(1)
}).finally(() => {
    prisma.$disconnect().catch(() => {})
    console.log('Process finished')
})
