# Sanitation Soldiers

Website for **Sanitation Soldiers**, an environmental sanitation vigilante group (environmental sanitation taskforce) created by the **Adabraka Atukpai Mantse** and the **Office of the Adabraka Atukpai Stool Authority**, to resolve environmental sanitation issues in and around the Adabraka community and Korle Klottey Constituency (Accra, Ghana).

## Stack

Plain HTML, CSS, and JavaScript. No build step, no dependencies. Hosted on GitHub Pages.

- `index.html` — homepage
- `about.html` — mandate, founding authority, taskforce background
- `services.html` (or equivalent) — sanitation programs / what we do
- `contact.html` — contact + report form (Web3Forms)
- `privacy.html` — privacy policy
- `404.html` — not-found page
- `assets/css/` `assets/js/` `assets/img/` — styles, behaviour, logo/OG image

## Design direction

Heritage green & gold: deep forest green primary, gold accents (traditional authority gravitas), serif headings (Source Serif 4) + Inter body.

## OpenCode setup

This folder has its own `opencode.json`. Skills are shared from the AVEC workspace via absolute paths (`C:/Users/hp/AVEC/...`) — **do not move or modify the AVEC folder**; this project only reads it.

## Run locally

Open `index.html` in a browser. Everything works from `file://`.

## Deploy

GitHub repo: `passportjuice/sanitation-soldiers` (public), Pages from `main` / root.
Live at `https://passportjuice.github.io/sanitation-soldiers/`.

## Before going live — TODO

1. **Contact details**: phone/WhatsApp, email, physical address of the Stool Authority office.
2. **Contact form key**: sign up at [web3forms.com](https://web3forms.com) with the receiving email, replace the access key placeholder in `contact.html`.
3. **Assets**: real logo/photos if available (else hand-crafted SVG like AVES).
4. **Copy review**: mandate wording, chief's title/styling, program names with the taskforce.
5. **Custom domain** (optional): `CNAME` + Pages domain settings; update canonical URLs, `sitemap.xml`, `robots.txt`.

## Repo layout

Sibling projects live at `C:\Users\hp\<name>`. This project is fully isolated from `C:\Users\hp\AVEC`.
