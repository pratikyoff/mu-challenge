# Search Service

This directory contains the backend REST API for the Movie Search challenge.

## Development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy the example environment file and adjust values if necessary:
   ```bash
   cp .env.example .env
   ```
   Ensure `DATABASE_URL` points to your Postgres instance and `OMDB_API_KEY` contains a valid key.
3. Generate the Prisma client:
   ```bash
   npm run generate:types
   ```
4. Run migrations and ingest sample movies:
   ```bash
   npm run migrate:dev
   npm run ingest:movies
   ```
5. Start the service in watch mode:
   ```bash
   npm run start:dev
   ```
   The API listens on `http://localhost:4000`.

You can also run the service via Docker Compose from the repository root:
```bash
docker compose -f compose.dev.yaml up --build search-service
```

## Endpoints

- `GET /movies?searchTerm=<term>` – search movies by title, director or plot
- `GET /healthz` – liveness probe

## Tests

```bash
npm test
```
