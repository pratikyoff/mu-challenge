import { searchMovies } from '../src/controllers/movies.ts'
import { getMovies } from '../src/services/movies.ts'

jest.mock('../src/services/movies.ts', () => {
    return {
        getMovies: jest.fn()
    }
})

describe('searchMovies', () => {
    it('throws when searchTerm is missing', async () => {
        await expect(searchMovies('')).rejects.toThrow('searchTerm parameter is required')
    })

    it('returns movies from service', async () => {
        const movies = [{ id: 1, title: 'Test' }]
        ;(getMovies as jest.Mock).mockResolvedValue(movies)
        const result = await searchMovies('test')
        expect(getMovies).toHaveBeenCalledWith('test')
        expect(result).toBe(movies)
    })
})
