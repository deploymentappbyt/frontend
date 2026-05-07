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

echo "Build completed successfully!"