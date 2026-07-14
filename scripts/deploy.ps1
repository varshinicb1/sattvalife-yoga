<#
.SYNOPSIS
    Deploy Sattvalife Yoga to Cloudflare Pages

.DESCRIPTION
    Builds and deploys the Next.js application to Cloudflare Pages.
    Supports both preview and production deployments.

.PARAMETER Environment
    Deployment environment: "preview" or "production". Default is "preview".

.EXAMPLE
    .\scripts\deploy.ps1 -Environment production
    .\scripts\deploy.ps1 -Environment preview
#>

param(
    [ValidateSet("preview", "production")]
    [string]$Environment = "preview"
)

$ErrorActionPreference = "Stop"

# Colors
$Green = [ConsoleColor]::Green
$Yellow = [ConsoleColor]::Yellow
$Red = [ConsoleColor]::Red
$Blue = [ConsoleColor]::Blue
$Cyan = [ConsoleColor]::Cyan

function Write-Color($Message, $Color) {
    Write-Host $Message -ForegroundColor $Color
}

function Check-Prerequisites {
    Write-Color "📋 Checking prerequisites..." $Yellow
    
    # Check if wrangler is installed
    if (-not (Get-Command wrangler -ErrorAction SilentlyContinue)) {
        Write-Color "❌ Wrangler CLI not found. Installing..." $Red
        npm install -g wrangler
    }
    
    # Check Cloudflare login
    try {
        $user = wrangler whoami 2>$null
        if (-not $user) {
            Write-Color "❌ Not logged in to Cloudflare. Please run: wrangler login" $Red
            exit 1
        }
        Write-Color "✅ Logged in as: $user" $Green
    } catch {
        Write-Color "❌ Not logged in to Cloudflare. Please run: wrangler login" $Red
        exit 1
    }
    
    Write-Color "✅ Prerequisites check passed" $Green
}

function Build-Application {
    Write-Color "🔨 Building application..." $Yellow
    
    # Install dependencies
    Write-Host "Installing dependencies..."
    pnpm install --frozen-lockfile
    
    # Generate database types
    Write-Host "Generating database types..."
    pnpm db:generate
    
    # Build Next.js application
    Write-Host "Building Next.js application..."
    pnpm build
    
    Write-Color "✅ Build completed" $Green
}

function Deploy-ToCloudflare {
    Write-Color "☁️ Deploying to Cloudflare Pages..." $Yellow
    
    $projectName = "sattvalife-yoga"
    $buildDir = ".vercel/output/static"
    
    if ($Environment -eq "production") {
        Write-Host "Deploying to PRODUCTION..."
        wrangler pages deploy $buildDir --project-name=$projectName --env=production
    } else {
        Write-Host "Deploying to PREVIEW..."
        $previewBranch = "preview-$(Get-Date -Format 'yyyyMMddHHmmss')"
        wrangler pages deploy $buildDir --project-name=$projectName --branch=$previewBranch
    }
    
    Write-Color "✅ Deployment completed" $Green
}

function Post-DeployTasks {
    Write-Color "🔧 Running post-deployment tasks..." $Yellow
    
    if ($Environment -eq "production") {
        Write-Host "Running database migrations..."
        pnpm db:migrate
        
        Write-Host "Seeding database..."
        pnpm db:seed
    }
    
    Write-Color "✅ Post-deployment tasks completed" $Green
}

# Main execution
Write-Color "========================================" $Blue
Write-Color "  Sattvalife Yoga - Cloudflare Deploy   " $Blue
Write-Color "========================================" $Blue
Write-Host ""

Check-Prerequisites
Build-Application
Deploy-ToCloudflare
Post-DeployTasks

Write-Host ""
Write-Color "🎉 Deployment successful!" $Green
Write-Color "Your site is live at: https://sattvalife.yoga" $Blue