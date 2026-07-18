# CROBIZ website

Multilingual Nuxt website for CROBIZ, with Czech, Croatian, and English content, a Git-backed Nuxt Studio editor, and a Formspree-ready contact form.

## Local development

```bash
npm install
npm run dev
```

The website opens at `http://localhost:3000`. In development, use the floating Nuxt Studio button to edit content locally.

Run the production check with:

```bash
npm run build
```

## Editable content

- `content/site/*.yml` — page copy and SEO metadata in all three languages
- `content/blog/{cs,hr,en}/*.md` — blog articles
- `content/settings.yml` — contact details, shared images, and the optional Ivana portrait
- `public/images` — uploaded and generated media

Legal pages remain in `app/pages/privacy.vue` and `app/pages/cookies.vue` so they are not changed accidentally in the editor.

## Environment variables

Copy `.env.example` to `.env` for local secrets. Production values belong in the hosting provider's environment settings and must never be committed.

- `NUXT_PUBLIC_FORMSPREE_FORM_ID` — the ID from a Formspree form
- `NUXT_PUBLIC_GA_MEASUREMENT_ID` — optional GA4 measurement ID
- `STUDIO_GITHUB_CLIENT_ID` — GitHub OAuth app client ID
- `STUDIO_GITHUB_CLIENT_SECRET` — GitHub OAuth app secret

Without a Formspree ID, the contact form falls back to opening the visitor's email application.

## Production editor setup

Nuxt Studio is configured for the private `Marko496/crobiz` GitHub repository and the `main` branch.

Before giving the editor to the client:

1. Deploy with `npm run build` to a host that supports Nuxt server-side routes.
2. Create a GitHub OAuth app for the final domain.
3. Add both `STUDIO_GITHUB_*` variables to the host.
4. Give Ivana access to the private GitHub repository.
5. Open `https://your-domain/_studio`, sign in, edit, and publish.

Publishing creates Git commits. A connected host should redeploy the site automatically after each content commit.

## Formspree setup

1. Create the form in Ivana's Formspree account.
2. Set its recipient address and complete Formspree's email verification.
3. Copy only the form ID into `NUXT_PUBLIC_FORMSPREE_FORM_ID` on the host.
4. Redeploy and send one real test enquiry in each language.

The form includes browser validation, a spam honeypot, localized sending/success/error messages, and does not store enquiries in the CROBIZ application.

## Client instructions

The short Croatian handover guide is in [`docs/UPUTE-ZA-UREDIVANJE.md`](docs/UPUTE-ZA-UREDIVANJE.md).
