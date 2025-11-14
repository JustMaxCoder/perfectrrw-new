# Deploying to GitHub Pages

This repository builds a Vite site whose public root is `public` and Vite's build output is `dist/public` (see `vite.config.ts`). The included GitHub Actions workflow will build the project and publish the `dist/public` folder to GitHub Pages on pushes to `main`.

How it works:
- Push to `main` or create a commit and push; GitHub Actions runs the `redeploy.yml` workflow.
- The workflow runs `npm ci` and then `npm run build`.
- The workflow uploads `dist/public` and then deploys it to GitHub Pages using the official `deploy-pages` action.

What you may need to check:
- In your repository **Settings → Pages**, ensure the source is set to "GitHub Actions" (the workflow sets Pages automatically, but you may want to check the URL).
- No extra secrets are required; the action uses the repository's `GITHUB_TOKEN` automatically.

Manual trigger (optional):
- You can run the workflow manually from the Actions tab by selecting the workflow and clicking "Run workflow" (choose `main` branch).

If you want the full server deployed (not just the static frontend), tell me the target (SSH host, Docker registry, Render, Vercel, Fly, etc.) and I will add a deploy workflow for that.
