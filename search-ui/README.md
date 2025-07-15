# Search UI

The React frontend for the Movie Search challenge.

## Development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm start
   ```
   The app runs on [http://localhost:3000](http://localhost:3000) and expects the API at `http://localhost:4000`.

## Build

Create an optimized production build with:
```bash
npm run build
```

A Dockerfile is also provided so the UI can be built and served via nginx:
```bash
docker build -t search-ui .
```

## Tests

```bash
npm test -- --passWithNoTests
```
