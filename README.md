# Stellar Voiid Website

A modern, responsive website framework for Stellar Voiid.

## Domain

- **Domain**: https://stellarvoiid.duckdns.org

## Structure

```
stellarvoiid-website/
├── index.html      # Main HTML file
├── styles.css      # Stylesheet with modern design
├── script.js       # JavaScript for interactivity
├── robots.txt      # Search engine directives
├── sitemap.xml     # Site map for search engines
├── LICENSE.md      # MIT License
└── README.md       # This file
```

## Features

- ✨ Modern, clean design with dark theme
- 📱 Fully responsive (mobile-friendly)
- 🎨 Beautiful gradient accents
- ⚡ Smooth scrolling and animations
- 🍔 Mobile hamburger menu
- 📧 Contact form with validation

## Getting Started

### Local Development

1. Simply open `index.html` in a web browser, or
2. Use a local server:

```bash
# Python 3
python -m http.server 8000

# Node.js (with http-server installed)
npx http-server

# PHP
php -S localhost:8000
```

Then navigate to `http://localhost:8000` in your browser.

### Deployment

This website is deployed on **GitHub Pages** with a custom domain.

**Live Site:**
- https://stellarvoiid.duckdns.org

## Customization

### Colors

Edit the CSS variables in `styles.css`:

```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #8b5cf6;
    --accent-color: #ec4899;
    /* ... */
}
```

### Content

- Edit `index.html` to change the content
- Modify sections, text, and structure as needed
- Update the contact form handler in `script.js` to connect to a backend

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Feel free to modify and use as needed for your project.
