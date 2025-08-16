# Frontend Test 1

Modern scaffold: **React + TypeScript + Parcel + Tailwind + Jest + ESLint + Prettier**

## Quick Start

```bash
npm install
npm run dev
```

Open (default) http://localhost:1234

## Scripts

| Script | Description |
| ------ | ----------- |
| `dev` | Start Parcel dev server (HMR) |
| `build` | Production build to `dist/` |
| `lint` | Run ESLint |
| `lint:fix` | Auto-fix lint issues |
| `format` | Prettier write |
| `typecheck` | TypeScript type check (no emit) |
| `test` | Run Jest tests |
| `test:watch` | Watch tests |
| `coverage` | Coverage report |

## Stack

- **Parcel** zero-config bundler (no Vite)
- **React 18**
- **TypeScript (strict)**
- **TailwindCSS**
- **Jest + Testing Library**
- **ESLint + Prettier**

## Structure

```
.
├─ index.html
├─ public/
│  └─ favicon.svg
├─ src/
│  ├─ main.tsx
│  ├─ App.tsx
│  ├─ components/
│  │  ├─ Hello.tsx
│  │  └─ Hello.test.tsx
│  ├─ styles/
│  │  └─ tailwind.css
│  └─ setupTests.ts
├─ jest.config.cjs
├─ tailwind.config.cjs
├─ postcss.config.cjs
├─ tsconfig.json
├─ package.json
└─ ...
```

## Tailwind

Configured via `tailwind.config.cjs`; global layer & example `.btn` utility in `src/styles/tailwind.css`.

## Environment Variables

Add values to `.env` (not committed). Example in `.env.example`.

## Testing

```bash
npm test
```

Coverage:

```bash
npm run coverage
```

## Deployment

Build:

```bash
npm run build
```

Serve `dist/` with any static host (GitHub Pages, Netlify, etc.).

## License

MIT