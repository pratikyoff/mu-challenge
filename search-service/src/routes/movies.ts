import { Router, type Request, type Response, type NextFunction } from 'express'
import { searchMovies } from '../controllers/movies.ts'

const router = Router()

// GET /movies
router.get('/', getMoviesHandler)

async function getMoviesHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const movies = await searchMovies(req.query.searchTerm as string)
        res.json(movies)
    } catch (error) {
        next(error)
    }
}

export default router
