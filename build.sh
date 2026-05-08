#!/bin/bash
set -e

echo "Starting build process..."

# Clean install
echo "Cleaning previous installation..."
rm -rf node_modules package-lock.json

# Install dependencies
echo "Installing dependencies..."
npm install --no-fund --no-audit

# Verify vite installation
echo "Verifying Vite installation..."
npx vite --version

# Build the project
echo "Building project..."
npm run build

# Explicitly copy _redirects file to build output
echo "Copying _redirects file..."
if [ -f "public/_redirects" ]; then
  cp public/_redirects build/_redirects
  echo "✅ _redirects file copied to build/"
else
  echo "⚠️  Warning: public/_redirects not found"
fi

echo "Build completed successfully!"