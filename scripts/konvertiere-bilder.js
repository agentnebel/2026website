#!/usr/bin/env node
// Konvertiert alle JPG-Dateien im images/-Ordner nach AVIF und WebP.
// Bereits vorhandene Konvertierungen werden übersprungen.

const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

function findeJpgDateien(verzeichnis) {
  const ergebnisse = [];
  if (!fs.existsSync(verzeichnis)) return ergebnisse;

  for (const eintrag of fs.readdirSync(verzeichnis, { withFileTypes: true })) {
    const pfad = path.join(verzeichnis, eintrag.name);
    if (eintrag.isDirectory()) {
      ergebnisse.push(...findeJpgDateien(pfad));
    } else if (/\.(jpg|jpeg)$/i.test(eintrag.name)) {
      ergebnisse.push(pfad);
    }
  }
  return ergebnisse;
}

async function main() {
  const dateien = findeJpgDateien("images");

  if (dateien.length === 0) {
    console.log("Keine JPG-Dateien gefunden.");
    return;
  }

  console.log(`${dateien.length} JPG-Datei(en) gefunden.\n`);
  let konvertiert = 0;

  for (const datei of dateien) {
    const dir = path.dirname(datei);
    const name = path.basename(datei, path.extname(datei));

    const avifPfad = path.join(dir, `${name}.avif`);
    const webpPfad = path.join(dir, `${name}.webp`);

    if (!fs.existsSync(avifPfad)) {
      await sharp(datei)
        .avif({ quality: 70, effort: 6 })
        .toFile(avifPfad);
      console.log(`✓ AVIF erstellt: ${avifPfad}`);
      konvertiert++;
    } else {
      console.log(`– AVIF vorhanden, übersprungen: ${avifPfad}`);
    }

    if (!fs.existsSync(webpPfad)) {
      await sharp(datei)
        .webp({ quality: 80 })
        .toFile(webpPfad);
      console.log(`✓ WebP erstellt: ${webpPfad}`);
      konvertiert++;
    } else {
      console.log(`– WebP vorhanden, übersprungen: ${webpPfad}`);
    }
  }

  console.log(`\nFertig — ${konvertiert} Datei(en) neu konvertiert.`);
}

main().catch((err) => {
  console.error("Fehler:", err);
  process.exit(1);
});
