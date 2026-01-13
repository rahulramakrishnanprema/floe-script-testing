# Advanced Calculator

A sleek, responsive web calculator built with plain HTML, CSS, and JavaScript. The UI mimics a classic calculator layout with modern glassmorphism styling and a gradient background.

## Features

- Basic arithmetic: addition, subtraction, multiplication, division
- Clear (C) and decimal support
- Responsive design for mobile and desktop
- Visually polished with gradients, glass effect, and hover animations
- Security‑enhanced with a strict Content‑Security‑Policy header

## Project Structure

```
project/
├─ index.html          # Main page with calculator layout
├─ css/
│   └─ style.css       # Styling (gradient, glassmorphism, responsive)
├─ js/
│   └─ script.js       # Calculator logic
├─ README.md           # This file
└─ .gitignore          # Ignored files
```

## Getting Started

1. **Clone the repository** or download the files.
2. Open `index.html` in any modern browser (Chrome, Firefox, Edge, Safari).

No build steps or external dependencies are required.

## Development

- **Styling** – Edit `css/style.css` to adjust colors, gradients, or layout.
- **Logic** – Modify `js/script.js` to add features such as keyboard support, scientific functions, or theming.
- **Accessibility** – The markup includes ARIA labels and a semantic `<main>` element; feel free to enhance further.

## Security Notes

The page includes a **Content‑Security‑Policy** meta tag that restricts resources to the same origin and disables unsafe inline scripts. This mitigates XSS risks while still allowing the required inline styles.

## License

This project is open source and free to use.
