# CROBIZ website

Multilingual Nuxt website for CROBIZ, with Czech, Slovak, Croatian, and English content, a Git-backed Nuxt Studio editor, and a Netlify Forms contact form.

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

- `NUXT_PUBLIC_GA_MEASUREMENT_ID` — optional GA4 measurement ID
- `STUDIO_GITHUB_CLIENT_ID` — GitHub OAuth app client ID
- `STUDIO_GITHUB_CLIENT_SECRET` — GitHub OAuth app secret
- `STUDIO_GITHUB_MODERATORS` — comma-separated whitelist of editor GitHub emails

## Production editor setup

Nuxt Studio is configured for the private `crobiz499/crobiz` GitHub repository and the `main` branch.

Before giving the editor to the client:

1. Deploy with `npm run build` to a host that supports Nuxt server-side routes.
2. Create a GitHub OAuth app for the final domain.
3. Use `https://your-domain/__nuxt_studio/auth/github` as its authorization callback URL.
4. Add the three `STUDIO_GITHUB_*` variables to the host, including Ivana's verified GitHub email in the moderator whitelist.
5. Give Ivana access to the private GitHub repository.
6. Open `https://your-domain/_studio`, sign in, edit, and publish.

Publishing creates Git commits. A connected host should redeploy the site automatically after each content commit.

## Netlify deployment

1. In Ivana's Netlify account, import the `crobiz499/crobiz` GitHub repository.
2. Keep the detected build command `npm run build` and publish directory `dist`.
3. Deploy from the `main` branch. The `.nvmrc` file pins builds to Node.js 22.
4. Add the `STUDIO_GITHUB_CLIENT_ID`, `STUDIO_GITHUB_CLIENT_SECRET`, and `STUDIO_GITHUB_MODERATORS` environment variables in Netlify.
5. Redeploy after saving the variables, then test `https://your-domain/_studio` and publish a small content change.

Do not store the OAuth client secret in this repository. Keep it only in Netlify's environment settings.

## Netlify Forms setup

1. In the Netlify project, open **Forms** and enable form detection.
2. Redeploy the site so Netlify detects the static `crobiz-contact` form definition.
3. Open **Project configuration → Notifications → Emails and webhooks → Form submission notifications**.
4. Add an email notification for the `crobiz-contact` form and set the recipient to `ivana.pisac@crobiz.info`.
5. Submit one realistic test enquiry from the deployed contact page and verify both the Netlify Forms inbox and Ivana's email.

The form uses same-origin HTTPS submission, browser validation, field-length limits, explicit privacy acknowledgement, Netlify's spam filtering and a honeypot. Netlify stores verified submissions in its protected dashboard; export or delete old enquiries regularly according to the privacy retention policy.

## Client instructions

The short Croatian handover guide is in [`docs/UPUTE-ZA-UREDIVANJE.md`](docs/UPUTE-ZA-UREDIVANJE.md).
