# Calculator Web App

A sleek, responsive arithmetic calculator built with **plain HTML, CSS, and JavaScript**. The UI mimics a physical calculator using modern CSS effects such as gradients and glassmorphism.

## Features
- Basic operations: addition, subtraction, multiplication, division.
- Clear (`C`) and equals (`=`) functionality.
- Keyboard support (numbers, operators, Enter, Backspace, Escape).
- Responsive layout for mobile and desktop.
- Visually polished with gradient background, translucent container, and smooth button interactions.

## Project Structure
```
project-root/
├─ index.html          # Main page with calculator markup
├─ css/
│   └─ style.css      # Styling (gradient, glass effect, responsive grid)
├─ js/
│   └─ script.js      # Calculator logic and event handling
├─ README.md           # This documentation
└─ .gitignore          # Git ignore rules
```

## Prerequisites
- Any modern web browser (Chrome, Firefox, Edge, Safari).
- No server or build tools required.

## Setup & Running
1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd <repo-folder>
   ```
2. Open `index.html` in your browser:
   - Double‑click the file, **or**
   - Serve it locally (optional) using a simple HTTP server:
     ```bash
     # Python 3.x
     python -m http.server 8000
     # Then navigate to http://localhost:8000
     ```

## Usage
- Click the buttons or use your keyboard to type numbers and operators.
- Press `=` or `Enter` to evaluate.
- Press `C` or `Escape` to clear.

## Testing
Manual testing is sufficient:
- Verify each button updates the display correctly.
- Confirm that complex expressions (e.g., `12/3+5*2`) evaluate accurately.
- Ensure the UI adapts to different screen sizes.

## Deployment
The app consists of static assets, so you can host it on any static‑site platform:
- GitHub Pages
- Netlify
- Vercel
- AWS S3 + CloudFront

Simply upload the contents of the repository (or the `dist` folder if you generated one) and configure the site to serve `index.html` as the entry point.

## License
This project is released under the MIT License.
