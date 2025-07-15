import { getMovies } from '../services/movies.ts'
import type { Movie } from '../types.ts'

/**
 * Validates the search term and fetches matching movies.
 */
export const searchMovies = async (searchTerm: string): Promise<Movie[]> => {
    if (!searchTerm || !searchTerm.trim()) {
        throw new Error('searchTerm parameter is required')
    }
    return getMovies(searchTerm)
}
