import request from 'supertest'
import app from '../src/app.ts'

jest.mock('../src/db/db', () => {
    return {
        prisma: {
            movie: {
                findMany: jest.fn().mockResolvedValue([
                    { id: 1, title: 'Space Movie', year: 2020, director: 'A', plot: 'Plot', poster: null }
                ])
            }
        }
    }
})

describe('GET /movies', () => {
    it('should require searchTerm parameter', async () => {
        const res = await request(app).get('/movies')
        expect(res.status).toBe(500)
    })

    it('should return movies', async () => {
        const res = await request(app).get('/movies').query({ searchTerm: 'space' })
        expect(res.status).toBe(200)
        expect(res.body.length).toBe(1)
        expect(res.body[0].title).toBe('Space Movie')
    })
})
