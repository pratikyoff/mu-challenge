import { getMovies } from '../src/services/movies.ts'
import { prisma } from '../src/db/db'

jest.mock('../src/db/db', () => {
    return {
        prisma: {
            movie: {
                findMany: jest.fn()
            }
        }
    }
})

describe('getMovies', () => {
    it('builds search query correctly', async () => {
        const searchTerm = 'space'
        ;(prisma.movie.findMany as jest.Mock).mockResolvedValue([])
        await getMovies(searchTerm)
        expect(prisma.movie.findMany).toHaveBeenCalledWith({
            where: {
                OR: [
                    { title: { contains: searchTerm, mode: 'insensitive' } },
                    { director: { contains: searchTerm, mode: 'insensitive' } },
                    { plot: { contains: searchTerm, mode: 'insensitive' } }
                ]
            }
        })
    })
})
