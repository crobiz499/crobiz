# CROBIZ website

Multilingual Nuxt website for CROBIZ, with Czech, Slovak, Croatian, and English content, a Git-backed Nuxt Studio editor, and a Netlify Forms contact form.

## Local development

```bash
npm install
npm run dev
```

The website opens at `http://localhost:3000`. In development, use the floating Nuxt Studio button to edit content locally.

Run the production checks with:

```bash
npm run security:audit
npm run build
```

## Editable content

- `content/site/*.yml` — page copy and SEO metadata in all four languages
- `content/blog/{cs,sk,hr,en}/*.md` — blog articles
- `content/settings.yml` — contact details, shared images, and Ivana's portrait
- `public/images` — uploaded and generated raster media

Legal pages remain in `app/pages/privacy.vue` and `app/pages/cookies.vue` so they are not changed accidentally in the editor.

## Environment variables

Copy `.env.example` to `.env` for local secrets. Production values belong in the hosting provider's environment settings and must never be committed.

- `NUXT_PUBLIC_GA_MEASUREMENT_ID` — optional GA4 measurement ID
- `STUDIO_GOOGLE_CLIENT_ID` — Google OAuth web client ID
- `STUDIO_GOOGLE_CLIENT_SECRET` — Google OAuth client secret
- `STUDIO_GITHUB_TOKEN` — fine-grained GitHub token limited to this repository and Contents read/write
- `STUDIO_GOOGLE_MODERATORS` — comma-separated allowlist of Google accounts permitted to enter Studio
- `STUDIO_GOOGLE_REDIRECT_URL` — optional explicit OAuth callback URL for the production domain

## Production editor setup

Nuxt Studio is configured for the private `crobiz499/crobiz` GitHub repository and the `main` branch.

Before giving the editor to the client:

1. Deploy with `npm run build` to a host that supports Nuxt server-side routes.
2. Create a Google OAuth web client for the final domain.
3. Use `https://your-domain/__nuxt_studio/auth/google` as its authorization callback URL.
4. Add the four Studio variables to Netlify and keep Ivana's exact Google email as the only moderator unless another editor is intentionally approved.
5. Keep the repository private and limit the fine-grained GitHub token to `crobiz499/crobiz`, with only Contents read/write permission.
6. Open `https://your-domain/_studio`, sign in, edit, and publish.

Publishing creates Git commits. A connected host should redeploy the site automatically after each content commit.

## Netlify deployment

1. In Ivana's Netlify account, import the `crobiz499/crobiz` GitHub repository.
2. Keep the detected build command `npm run build`; let Netlify's Nuxt integration configure the server output.
3. Deploy from the `main` branch. The `.nvmrc` file pins builds to Node.js 22.
4. Add `STUDIO_GOOGLE_CLIENT_ID`, `STUDIO_GOOGLE_CLIENT_SECRET`, `STUDIO_GITHUB_TOKEN`, and `STUDIO_GOOGLE_MODERATORS` in Netlify.
5. Redeploy after saving the variables, then test `https://your-domain/_studio` and publish a small content change.

Do not store the OAuth client secret or repository token in this repository. Keep them only in Netlify's environment settings.

## Netlify Forms setup

1. In the Netlify project, open **Forms** and enable form detection.
2. Redeploy the site so Netlify detects the static `crobiz-contact` form definition.
3. Open **Project configuration → Notifications → Emails and webhooks → Form submission notifications**.
4. Add an email notification for the `crobiz-contact` form and set the recipient to `ivana.pisac@crobiz.info`.
5. Submit one realistic test enquiry from the deployed contact page and verify both the Netlify Forms inbox and Ivana's email.

The form uses same-origin HTTPS submission, browser validation, field-length limits, explicit privacy acknowledgement, Netlify's spam filtering and a honeypot. Netlify stores verified submissions in its protected dashboard; export or delete old enquiries regularly according to the privacy retention policy.

## Security maintenance

- Require two-factor authentication on the Google, GitHub, and Netlify owner accounts.
- Never paste OAuth secrets or GitHub tokens into content, commits, screenshots, support chats, or browser JavaScript.
- Rotate the Studio GitHub token at least yearly and immediately after suspected exposure. A token without an expiry does not rotate itself.
- Keep Ivana's Google address as the only Studio moderator unless another editor is deliberately authorized.
- Review Netlify deploy logs, form submissions, and GitHub commits regularly. Revoke unexpected sessions and tokens immediately.
- Run `npm run security:audit` and `npm run build` before deployment. Dependabot checks npm dependencies monthly.
- Studio accepts raster images only, up to 5 MB. Raw HTML and arbitrary embedded components are disabled in CMS-authored articles.

These controls reduce the main OWASP risks but do not make the site invulnerable. A stolen authorized Google session or compromised Netlify/GitHub account can still affect content, so account security and token rotation remain essential.

## Client instructions

The short Croatian handover guide is in [`docs/UPUTE-ZA-UREDIVANJE.md`](docs/UPUTE-ZA-UREDIVANJE.md).
