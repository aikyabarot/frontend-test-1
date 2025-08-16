# Talent Platform (Scaffold)

Initial scaffold created with Vite + React + TypeScript + Tailwind.

## Scripts

- `dev` – start dev server
- `build` – production build
- `preview` – preview production build
- `lint` – run ESLint
- `format` – run Prettier write

## Structure

```
src/
  components/
  pages/
  state/
  utils/
  index.css
  main.tsx
  App.tsx
  routes.tsx
```

## Theming

Uses a simple context toggling a `dark` class on `<html>`.

## Next Steps

- Integrate real auth
- Real API base via `VITE_API_BASE`
- Add tests (Vitest + RTL)
- Add CI workflow
