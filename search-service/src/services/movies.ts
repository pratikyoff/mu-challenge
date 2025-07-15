import { prisma } from '../db/db.ts'
import type { Movie } from '../types.ts'

/**
 * Fetches movies containing the given search term in title, director or plot.
 */
export const getMovies = (searchTerm: string): Promise<Movie[]> => {
    return prisma.movie.findMany({
        where: {
            OR: [
                { title: { contains: searchTerm, mode: 'insensitive' } },
                { director: { contains: searchTerm, mode: 'insensitive' } },
                { plot: { contains: searchTerm, mode: 'insensitive' } }
            ]
        }
    })
}
