# Frontend Test 1

This is a Next.js application built with TypeScript, Tailwind CSS, and modern tooling.

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   Update `NEXT_PUBLIC_API_BASE` in `.env.local` with your API endpoint.

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking
- `npm run test` - Run Jest tests
- `npm run test:watch` - Run Jest in watch mode
- `npm run coverage` - Generate test coverage report
- `npm run format` - Format code with Prettier

## Architecture & Tooling Decisions

### Framework
- **Next.js 14** with App Router - Modern React framework with server-side rendering
- **TypeScript** - Type safety and better developer experience

### Styling
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **PostCSS** - CSS processing with autoprefixer

### Development Tools
- **ESLint** - Code linting with TypeScript and import order rules
- **Prettier** - Code formatting
- **Jest** - Testing framework with React Testing Library

### Configuration Files
- `tailwind.config.js` - Tailwind CSS configuration with custom color scheme
- `postcss.config.js` - PostCSS configuration
- `.eslintrc.js` - ESLint configuration with TypeScript and import rules

## API Integration

The application includes a typed fetch helper at `lib/fetcher.ts` that provides:

### fetchJSON Function

A lightweight wrapper around axios with robust error handling:

```typescript
import { fetchJSON } from '@/lib/fetcher';

// Basic usage
const data = await fetchJSON<ApiResponse>('/api/users');

// With query parameters
const users = await fetchJSON<User[]>('/api/users', {
  query: { page: 1, limit: 10 }
});

// With custom headers and retry options
const result = await fetchJSON<Data>('/api/data', {
  headers: { 'Custom-Header': 'value' },
  retries: 3,
  retryBaseDelayMs: 500
});
```

### Features
- **Type-safe responses** - Generic type support for response data
- **Automatic retries** - Configurable retry logic for failed requests
- **Query parameter handling** - Automatic URL construction with query parameters
- **Error handling** - Robust error handling with retry logic for 429 and 5xx responses
- **Environment integration** - Uses `NEXT_PUBLIC_API_BASE` from environment variables

### Environment Variables

The fetch helper uses the following environment variable:
- `NEXT_PUBLIC_API_BASE` - Base URL for API requests (defaults to localhost:3001)
