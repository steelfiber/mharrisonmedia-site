# M. Harrison Media — Website

## Quick Deploy to Netlify (Drag & Drop)

### Option A: Drag & Drop (No coding required)
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. You need to build the site first — see "Build Locally" below
3. Drag the `dist` folder onto the Netlify drop zone
4. Done. Your site is live.

### Option B: Connect via Git (Auto-deploys on changes)
1. Push this folder to a GitHub/GitLab repo
2. Go to [app.netlify.com](https://app.netlify.com) → "Add new site" → "Import an existing project"
3. Connect your repo
4. Build settings are already configured in `netlify.toml`
5. Click Deploy. Every future push auto-deploys.

## Build Locally

```bash
# Install dependencies
npm install

# Run dev server (for previewing locally)
npm run dev

# Build for production (creates /dist folder)
npm run build
```

## Customizing Your Site

### Replace placeholder images
In `src/App.jsx`, search for "TODO" comments. You'll find placeholders for:
- Portfolio card images (the gray gradient boxes)
- About section photo (headshot or action photo)
- SmugMug URL
- Buy Me a Coffee URL
- Instagram URL (already set)

To add images, put them in the `public/` folder and reference like:
```jsx
<img src="/your-image.jpg" alt="Description" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
```

### Contact form
The form uses **Netlify Forms** — it works automatically when deployed to Netlify.
No backend needed. Submissions show up in your Netlify dashboard under Forms.
You can set up email notifications in Netlify → Site → Forms → Form notifications.

### Custom domain
1. In Netlify dashboard → Domain settings
2. Add your custom domain
3. Netlify handles SSL automatically

## Brand Reference
- **Fonts**: Barlow Condensed (headlines), DM Sans (body)
- **Colors**: #0D0D0D (black), #2A2D32 (steel), #D4600E (orange), #E8E4DE (dust)
- **Tagline**: "If it's worth doing, it's worth documenting."

## File Structure
```
mharrisonmedia-site/
├── public/
│   └── favicon.svg          # MH brand mark favicon
├── src/
│   ├── App.jsx               # Main website component
│   ├── main.jsx              # React entry point
│   └── styles.css            # Global styles & brand system
├── index.html                # HTML entry with SEO meta tags
├── netlify.toml              # Netlify build & routing config
├── package.json              # Dependencies & scripts
└── README.md                 # This file
```
