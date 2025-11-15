<#
Full redeploy script for Windows PowerShell.

Usage:
  - Open PowerShell in the repo root and run:
      .\scripts\deploy_github.ps1
  - To provide a different remote or branch:
      .\scripts\deploy_github.ps1 -remoteUrl 'https://github.com/JustMaxCoder/perfectrrw-new.git' -branch 'main'

Notes:
  - This script will `git add -A`, commit (if changes exist), set the `origin` remote to the provided URL if missing/different, and push the branch.
  - If `gh` CLI is installed and authenticated, it will trigger the `deploy.yml` workflow.
  - To trigger the workflow via API instead of `gh`, set a `GITHUB_TOKEN` (PAT with `repo` + `workflow` scopes) and use the curl example in `DEPLOY.md`.
#>

param(
  [string]$remoteUrl = 'https://github.com/JustMaxCoder/perfectrrw-new.git',
  [string]$branch = 'main',
  [string]$commitMessage = 'Full redeploy: update site'
)

Write-Host "Repository root: $(Resolve-Path .)"

Write-Host "Checking git status..."
git status --porcelain

Write-Host "Staging all changes..."
git add -A

$staged = git diff --cached --name-only
if (-not $staged) {
  Write-Host "No staged changes to commit."
} else {
  Write-Host "Committing changes..."
  git commit -m "$commitMessage"
}

Write-Host "Detecting origin remote..."
try {
  $originUrl = git remote get-url origin 2>$null
} catch {
  $originUrl = $null
}

if (-not $originUrl) {
  Write-Host "No origin remote found. Adding origin -> $remoteUrl"
  git remote add origin $remoteUrl
} elseif ($originUrl -ne $remoteUrl) {
  Write-Host "Origin remote differs. Updating origin from '$originUrl' to '$remoteUrl'"
  git remote set-url origin $remoteUrl
} else {
  Write-Host "Origin remote matches target: $originUrl"
}

Write-Host "Pushing to origin/$branch..."
git push origin $branch

if ($LASTEXITCODE -ne 0) {
  Write-Host "Push failed. Check credentials and that branch '$branch' exists locally." -ForegroundColor Red
  exit 1
}

if (Get-Command gh -ErrorAction SilentlyContinue) {
  Write-Host "Found GitHub CLI 'gh' — triggering workflow 'deploy.yml'..."
  gh workflow run deploy.yml --ref $branch
  Write-Host "Workflow dispatched. Open Actions tab to view run status."
} else {
  Write-Host "GitHub CLI 'gh' not found. To trigger the workflow manually, either:"
  Write-Host "  - Install and authenticate 'gh' and run: gh workflow run deploy.yml --ref $branch" -ForegroundColor Yellow
  Write-Host "  - Or go to the repository Actions tab in GitHub and run the workflow manually." -ForegroundColor Yellow
}

Write-Host "Done."
