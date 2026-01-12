# Frontend Documentation

## Prerequisites
- Node.js 20+ (recommended)
- npm 9+ (or Yarn)

## Setup
```bash
cd frontend
npm install
cp .env.example .env   # ensure VITE_API_URL points to the backend URL
npm run dev
```
The development server will start at `http://localhost:5173` and automatically open in your browser.

## Build for Production
```bash
npm run build
npm run preview   # serves the built files locally
```

## Security & Best Practices
- All API calls go through the Axios instance defined in `src/services/api.ts`, which automatically attaches the JWT stored in `localStorage`.
- The UI uses Tailwind CSS with a gradient background to meet the design requirements.
- No inline scripts or styles are used; CSP can be enforced by the hosting platform.
