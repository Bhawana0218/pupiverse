# TeddyPups U.A.E. website recreation

A React/Vite recreation of the TeddyPups U.A.E. reference site. It includes separate routes for Home, Puppies, 42 puppy profiles linked throughout the site, Happy families, Gone home, How it works, FAQ, and Visit & contact. The saved page captures and matching stylesheet preserve the reference layouts, imagery, typography, and colors.

## Run locally

```powershell
npm install
npm run dev
```

Use the local URL printed by Vite. To verify a production build and lint the code:

```powershell
npm run build
npm run lint
```

## Assets and integrations

- The rendered pages are saved in `public/reference-pages/`; puppy profile snapshots are in `public/reference-pages/puppies/`.
- The matching page and font stylesheets are in `src/reference-site.css` and `src/reference-fonts.css`. Latin font files are also stored locally in `public/fonts/`.
- The page captures preserve the reference content and layout at capture time. Referenced photos, video, logo, and paw cursor assets are stored locally in `public/reference-assets/`.
- Page navigation, the mobile menu, listing filters, puppy journey tabs, FAQ search and accordions, and family photo viewer are wired locally. On Home, the puppy follows the scroll path, walks across the pinned horizontal puppy hallway, and settles into the footer basket. The enquiry form validates the required name and phone fields, then opens WhatsApp; there is no connected form backend or email service.
- Puppy listings and availability reflect the reference when captured and should be checked against current availability before use.
