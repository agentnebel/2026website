# PORTFOLIO

Eine React-basierte Portfolio-Website für Street Photography mit:

- 📸 Magazin-Layout und Lightbox-Galerie
- 🌙 Dark/Light Mode mit localStorage Persistierung
- 📱 Responsive Design mit Burger-Menü für Mobile
- 🖼️ Automatische AVIF & WebP Konvertierung via GitHub Actions
- ♿ Barrierefreie Navigation und Struktur

## Aufbau

- **`index.html`** — Die komplette Website (React via CDN)
- **`.github/workflows/bilder-konvertieren.yml`** — GitHub Action für Bild-Konvertierung
- **`scripts/konvertiere-bilder.js`** — Lokales Konvertierungsscript
- **`images/`** — Ordner für eigene Fotos (JPG)

## Bilder hinzufügen

1. Lokale JPG-Dateien in `images/` legen
2. Committen und pushen
3. GitHub Action konvertiert automatisch zu AVIF & WebP
4. Im `PROJECTS`-Objekt in `index.html` referenzieren

## Lokal ausführen

```bash
npm install
npm run bilder  # Konvertiert images/ nach AVIF & WebP
```

Dann `index.html` im Browser öffnen.

## Online

Verfügbar unter: https://agentnebel.github.io/2026website

---

**Navigation:**
- Start — Startseite mit Featured Projects
- Street — Street Photography Portfolio
- Travel — Travel Photography Portfolio
- About — Über Sven Belz
