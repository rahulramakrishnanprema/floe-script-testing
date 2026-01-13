# Advanced Calculator

A responsive, single‑page web calculator built with **Tailwind CSS** and a glass‑morphism UI. Supports addition, subtraction, multiplication, and division.

## Features

- Gradient background with a modern glass‑morphism container.
- Tailwind‑powered utility‑first styling for a polished SaaS look.
- Fully functional arithmetic operations.
- Mobile‑first responsive design.
- Accessible markup (ARIA roles, screen‑reader labels, focus states).
- Content‑Security‑Policy (CSP) meta tag to mitigate XSS.

## Getting Started

### Prerequisites

- Any modern web browser (Chrome, Firefox, Edge, Safari).

### Installation & Running

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd <repo-folder>
   ```
2. **Open the application**
   - Double‑click `index.html` in your file explorer, **or**
   - Serve the directory with a simple HTTP server (recommended for CSP compliance):
     ```bash
     # Python 3.x
     python -m http.server 8000
     # Then open http://localhost:8000 in your browser
     ```

## Project Structure

```
project/
├─ .gitignore          # Git ignore rules
├─ css/
│   └─ style.css       # Custom CSS variables & tweaks
├─ js/
│   └─ script.js       # Calculator logic (strict mode, no globals)
├─ index.html          # Entry point with Tailwind CDN and CSP
└─ README.md           # Documentation (this file)
```

## Development

- **Styling** – Edit `css/style.css` for custom variables or add Tailwind utilities directly in `index.html`.
- **Logic** – Modify `js/script.js` to extend functionality (e.g., keyboard support, scientific operations).
- **Security** – The CSP meta tag restricts script sources to self and the Tailwind CDN. Adjust it if you add additional external resources.

## Accessibility

- All interactive elements are native `<button>` elements with appropriate `aria-label`s.
- The display input is labelled with a visually hidden `<label>` for screen readers.
- Focus rings are provided via Tailwind's `focus:ring` utilities.

## License

MIT © 2024
