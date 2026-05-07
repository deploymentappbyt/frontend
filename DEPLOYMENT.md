# Frontend Deployment Guide

## Render Deployment

This frontend is configured for deployment on Render with the following setup:

### Configuration Files
- `render.yaml` - Render service configuration
- `build.sh` - Custom build script for reliable deployment
- `.nvmrc` - Node.js version specification (v20)

### Build Process
1. Clean previous installation
2. Install dependencies with `npm install --no-fund --no-audit`
3. Verify Vite installation
4. Build project with `npm run build`
5. Serve with `npm run preview`

### Environment Variables
- `NODE_VERSION=20`
- `NPM_CONFIG_PRODUCTION=false`
- `NPM_CONFIG_FUND=false`
- `NPM_CONFIG_AUDIT=false`

### Troubleshooting
If deployment fails:
1. Check Node.js version compatibility
2. Verify all dependencies are compatible
3. Clear npm cache if needed
4. Use the build script for consistent builds

### Local Testing
```bash
# Test the build process locally
./build.sh

# Test the preview server
npm run preview
```