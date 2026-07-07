# ship.ps1 — HeartSync release pipeline (adapted from Wall-ette)
# Verifies the build locally, then pushes to GitHub (Vercel deploys automatically).
# Usage:  .\ship.ps1            (from the repo root)

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

# ── Guard: this repo is pnpm-managed. A stray package-lock.json from an npm
# attempt causes drift, so clear it. ─────────────────────────────────────────
if (Test-Path package-lock.json) {
    Remove-Item package-lock.json
    Write-Host "Removed stray package-lock.json — pnpm-lock.yaml is the source of truth." -ForegroundColor Yellow
}

# ── Resolve pnpm (self-heals machines that don't have it) ────────────────────
if (-not (Get-Command pnpm -ErrorAction SilentlyContinue)) {
    Write-Host "pnpm not found — trying to enable it via corepack..." -ForegroundColor Yellow
    try { corepack enable 2>$null } catch {}
}
$script:UseNpx = -not (Get-Command pnpm -ErrorAction SilentlyContinue)
if ($script:UseNpx) {
    Write-Host "Falling back to 'npx pnpm@9' (tip: run 'npm install -g pnpm' once to speed this up)." -ForegroundColor Yellow
}

function Invoke-Pnpm {
    if ($script:UseNpx) { & npx --yes pnpm@9 @args } else { & pnpm @args }
}

Write-Host "1/4 Installing dependencies..." -ForegroundColor Cyan
Invoke-Pnpm install
if ($LASTEXITCODE -ne 0) { Write-Host "pnpm install failed - ship aborted" -ForegroundColor Red; exit 1 }

Write-Host "2/4 Typecheck (aborts the ship on any error)..." -ForegroundColor Cyan
Invoke-Pnpm exec tsc --noEmit
if ($LASTEXITCODE -ne 0) { Write-Host "Typecheck failed - ship aborted" -ForegroundColor Red; exit 1 }

Write-Host "3/4 Production build..." -ForegroundColor Cyan
Invoke-Pnpm run build
if ($LASTEXITCODE -ne 0) { Write-Host "Build failed - ship aborted" -ForegroundColor Red; exit 1 }

Write-Host "4/4 Pushing to GitHub..." -ForegroundColor Cyan
git push origin main
if ($LASTEXITCODE -ne 0) { Write-Host "Push failed - check your GitHub credentials/remote" -ForegroundColor Red; exit 1 }

Write-Host ""
Write-Host "Shipped. Vercel will pick up the push and deploy automatically." -ForegroundColor Green
