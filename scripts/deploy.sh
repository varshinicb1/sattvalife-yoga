#!/bin/bash
# deploy.sh - Deployment script for Cloudflare Pages
# Usage: ./deploy.sh [preview|production]

set -e

ENVIRONMENT=${1:-preview}
PROJECT_NAME="sattvalife-yoga"

echo "🚀 Starting deployment to Cloudflare Pages ($ENVIRONMENT)..."

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Check prerequisites
check_prerequisites() {
    echo "🔍 Checking prerequisites..."
    
    if ! command -v pnpm &> /dev/null; then
        echo -e "${RED}❌ pnpm not found. Install with: npm install -g pnpm${NC}"
        exit 1
    fi
    
    if ! command -v wrangler &> /dev/null; then
        echo -e "${YELLOW}⚠️  wrangler not found. Installing...${NC}"
        pnpm add -g wrangler
    fi
    
    if ! command -v git &> /dev/null; then
        echo -e "${RED}❌ git not found${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}✅ Prerequisites OK${NC}"
}

# Install dependencies
install_deps() {
    echo "📦 Installing dependencies..."
    pnpm install --frozen-lockfile
    echo -e "${GREEN}✅ Dependencies installed${NC}"
}

# Generate database types
generate_db() {
    echo "🗄️  Generating database types..."
    pnpm db:generate
    echo -e "${GREEN}✅ Database types generated${NC}"
}

# Run tests
run_tests() {
    echo "🧪 Running tests..."
    pnpm test
    echo -e "${GREEN}✅ Tests passed${NC}"
}

# Build application
build_app() {
    echo "🏗️  Building Next.js application..."
    
    # Set environment variables for build
    export NEXT_PUBLIC_APP_URL="https://sattvalife.yoga"
    export NODE_ENV="production"
    
    pnpm build
    
    echo -e "${GREEN}✅ Build complete${NC}"
}

# Deploy to Cloudflare Pages
deploy_cf() {
    echo "☁️  Deploying to Cloudflare Pages..."
    
    if [ "$ENVIRONMENT" = "production" ]; then
        wrangler pages deploy .vercel/output/static \
            --project-name="$PROJECT_NAME" \
            --branch=main \
            --commit-dirty=true
    else
        # Generate preview branch name
        BRANCH=$(git rev-parse --abbrev-ref HEAD)
        COMMIT=$(git rev-parse --short HEAD)
        PREVIEW_BRANCH="preview-${BRANCH//\//-}-${COMMIT}"
        
        wrangler pages deploy .vercel/output/static \
            --project-name="$PROJECT_NAME" \
            --branch="$PREVIEW_BRANCH" \
            --commit-dirty=true
    fi
    
    echo -e "${GREEN}✅ Deployment complete!${NC}"
}

# Verify deployment
verify_deployment() {
    echo "🔍 Verifying deployment..."
    
    if [ "$ENVIRONMENT" = "production" ]; then
        URL="https://sattvalife.yoga"
    else
        # Get preview URL from wrangler output
        URL="https://$PREVIEW_BRANCH.$PROJECT_NAME.pages.dev"
    fi
    
    echo "🌐 Checking $URL..."
    
    # Wait a bit for propagation
    sleep 10
    
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$URL" || echo "000")
    
    if [ "$HTTP_CODE" = "200" ]; then
        echo -e "${GREEN}✅ Deployment verified: $URL (HTTP $HTTP_CODE)${NC}"
    else
        echo -e "${YELLOW}⚠️  Deployment may still be propagating: $URL (HTTP $HTTP_CODE)${NC}"
    fi
}

# Main execution
main() {
    echo "=========================================="
    echo "  Sattvalife Yoga - Cloudflare Deploy"
    echo "  Environment: $ENVIRONMENT"
    echo "=========================================="
    
    check_prerequisites
    install_deps
    generate_db
    run_tests
    build_app
    deploy_cf
    verify_deployment
    
    echo ""
    echo "=========================================="
    echo -e "${GREEN}🎉 Deployment successful!${NC}"
    echo "=========================================="
    
    if [ "$ENVIRONMENT" = "production" ]; then
        echo "🌐 Live at: https://sattvalife.yoga"
    else
        echo "🌐 Preview at: https://$PREVIEW_BRANCH.$PROJECT_NAME.pages.dev"
    fi
}

# Run main
main