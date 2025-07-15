import app from './app.ts'
import logger from './logger.ts'

/**
 * Starts the HTTP server.
 */
const port = process.env.PORT || 4000

app.listen(port, () => {
    logger.info(`Server is running on http://localhost:${port}`)
})
