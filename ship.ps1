# ship.ps1 — HeartSync release pipeline (adapted from Wall-ette)
# Verifies the build locally, then pushes to GitHub (Vercel deploys automatically).
# Usage:  .\ship.ps1            (from the repo root)

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

Write-Host "1/4 Installing dependencies..." -ForegroundColor Cyan
pnpm install
if ($LASTEXITCODE -ne 0) { Write-Host "pnpm install failed - ship aborted" -ForegroundColor Red; exit 1 }

Write-Host "2/4 Typecheck (aborts the ship on any error)..." -ForegroundColor Cyan
pnpm exec tsc --noEmit
if ($LASTEXITCODE -ne 0) { Write-Host "Typecheck failed - ship aborted" -ForegroundColor Red; exit 1 }

Write-Host "3/4 Production build..." -ForegroundColor Cyan
pnpm build
if ($LASTEXITCODE -ne 0) { Write-Host "Build failed - ship aborted" -ForegroundColor Red; exit 1 }

Write-Host "4/4 Pushing to GitHub..." -ForegroundColor Cyan
git push origin main
if ($LASTEXITCODE -ne 0) { Write-Host "Push failed - check your GitHub credentials/remote" -ForegroundColor Red; exit 1 }

Write-Host ""
Write-Host "Shipped. Vercel will pick up the push and deploy automatically." -ForegroundColor Green
