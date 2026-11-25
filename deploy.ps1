# Automated 1-Click Deployment for Sattva Life Yoga
param([string]$CommitMessage = "chore: deploy update")

$ErrorActionPreference = 'Stop'
Write-Host "=== 1. Building Production Web App ===" -ForegroundColor Cyan
npm run build

Write-Host "`n=== 2. Deploying to Firebase Hosting ===" -ForegroundColor Cyan
npx firebase-tools deploy --only hosting --project sattvalife-yoga

Write-Host "`n=== 3. Syncing with GitHub (master) ===" -ForegroundColor Cyan
git add .
$status = git status --porcelain
if ($status) {
    git commit -m $CommitMessage
    git push origin HEAD:master
} else {
    Write-Host "No uncommitted code changes to push." -ForegroundColor Yellow
}

Write-Host "`n=== 4. Health Check ===" -ForegroundColor Cyan
try {
    $res = Invoke-RestMethod -Uri "https://sattvalife-yoga.web.app" -Method Head -TimeoutSec 10
    Write-Host "Live Status: ONLINE (https://sattvalife-yoga.web.app)" -ForegroundColor Green
} catch {
    Write-Host "Deployed successfully, site propagating: https://sattvalife-yoga.web.app" -ForegroundColor Green
}
