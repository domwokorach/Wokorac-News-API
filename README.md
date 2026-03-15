# Wokorach-News-API

React + Vite news app that fetches headlines from NewsAPI.

## Why a proxy is required

NewsAPI requests made **directly from the browser** are often blocked (CORS / plan restrictions) and exposing your API key in client-side code is unsafe.

This repo uses a `/api/top-headlines` proxy so the API key stays server-side:

- **Local dev:** Vite proxies `/api/*` to `https://newsapi.org/*` (see `vite.config.js`).
- **Production (Vercel):** a serverless function at `api/top-headlines.js` calls NewsAPI using `NEWS_API_KEY`.

## Setup

Create a `.env` file for local development:

```bash
# used only by the Vercel function / production; for local dev via Vite proxy you can still set it for parity
NEWS_API_KEY=your_newsapi_key_here
```

If you previously committed/exposed a key, rotate it in your NewsAPI dashboard.

## Run

```bash
npm install
npm run dev
```

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

