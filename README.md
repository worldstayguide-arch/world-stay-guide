<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/6cc87980-9f1d-4c40-86ee-4ed3e7ebddd0

## Project structure

- `app/` - Next.js app routes, layout, global styles, and API handlers.
- `components/home/` - Homepage sections and cards.
- `components/layout/` - Site-level layout components like navigation and footer.
- `components/` - Reusable client UI, including the filter bar.
- `data/` - Static content for trips, landmarks, navigation, and footer links.
- `types/` - Shared TypeScript models for travel content.
- `public/` - Local image assets used by the site.

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
