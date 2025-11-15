# Deploying to GitHub Pages

This repository uses Vite with the `public` folder as the site root and builds into `dist/public` (see `vite.config.ts`). The GitHub Actions workflow added at `.github/workflows/deploy.yml` will:

- Run `npm ci` and `npm run build` on pushes to `main` (or manual runs).
- Publish the `dist/public` folder to the `gh-pages` branch using `peaceiris/actions-gh-pages`.

How to use:
- Push changes to `main` (or run the workflow manually from the Actions tab).
- The action will build and publish the static files to the `gh-pages` branch. GitHub Pages will serve the site from that branch.

What to check in your repository settings:
- Go to **Settings → Pages** and ensure the Source is set to **GitHub Actions** (the Pages site will be updated automatically when the workflow runs).
- No additional secrets are required; the workflow uses the repository `GITHUB_TOKEN`.

Local test steps:
```powershell
npm ci
npm run build
# Serve the built files for a quick check (install a simple static server if needed)
npx serve dist/public -p 5000
```

If you want a workflow to deploy the full server (the Node backend) to a hosting provider (e.g. Render, Fly, Heroku) or to deploy directly to Replit, tell me which provider and I will add that workflow as well.

Full redeploy (commit all files & push)
-------------------------------------

To push all current workspace files to the GitHub repository and trigger the GitHub Actions workflow that deploys to GitHub Pages, run the included PowerShell script from the repository root:

```powershell
# Make sure you are in the project root
.\scripts\deploy_github.ps1

# If you need to supply a different remote or branch:
.\scripts\deploy_github.ps1 -remoteUrl 'https://github.com/JustMaxCoder/perfectrrw-new.git' -branch 'main'
```

Notes about authentication and workflow trigger:
- Pushing requires that Git has credentials available (HTTPS PAT or SSH key). If using HTTPS, set up a personal access token (PAT) with `repo` permissions and either use credential manager or supply it when prompted.
- To automatically trigger the workflow from the script you can install and authenticate the GitHub CLI (`gh`). After `gh auth login` the script will dispatch the `deploy.yml` workflow. Alternatively, run the workflow manually from GitHub Actions UI.
- If you prefer, you can trigger the workflow via the REST API with a PAT having `repo` and `workflow` scopes. Example (PowerShell + env var `GITHUB_TOKEN` containing a PAT):

```powershell
$repo = 'JustMaxCoder/perfectrrw-new'
$workflow_id = 'deploy.yml'
$ref = 'main'

$headers = @{ Authorization = "Bearer $env:GITHUB_TOKEN"; "User-Agent" = "redeploy-script" }
$body = @{ ref = $ref } | ConvertTo-Json

Invoke-RestMethod -Method Post -Uri "https://api.github.com/repos/$repo/actions/workflows/$workflow_id/dispatches" -Headers $headers -Body $body -ContentType 'application/json'
```

