#!/bin/bash

echo "Starting Firebase Deployment Script..."

# 1. firebase init hosting
# Pipe the answers directly to the interactive prompts:
# - What do you want to use as your public directory? (build)
# - Configure as a single-page app (rewrite all urls to /index.html)? (Y)
# - Set up automatic builds and deploys with GitHub? (n)
# - File build/index.html already exists. Overwrite? (Y)
echo -e "build\nY\nn\nY\n" | firebase init hosting

# 2. npm run build
echo "Building the React project..."
npm run build

# 3. firebase deploy
echo "Deploying to Firebase..."
firebase deploy

echo "Deployment completed!"
