import express from 'express'
import cors from 'cors'
import moviesRouter from './routes/movies.ts'
import pinoHttp from 'pino-http'
import logger from './logger.ts'

/**
 * Express application instance with configured middleware and routes.
 */
const app = express()

app.use(pinoHttp({ logger }))
app.use(express.json())
app.use(cors())

app.use('/movies', moviesRouter)

app.get('/healthz', (_req, res) => {
    res.send('ok')
})

export default app
