#!/bin/bash
cd /offline/src/desktop
rm -rf app_dist
cd ../app/client
npm install husky

npm install --ignore-engines
npm cache clean --force
npm run prod-desktop
cd ..
npm install
npm run  resource-bundles
cd ../desktop/OpenRAP
npm install
npm run pack 
cd ..
npm --update-checksums
npm install
npm run build-ts
node scripts/copy.js
npm install fs-extra


# Tar the generic build files
tar -czvf app_dist.tar.gz app_dist