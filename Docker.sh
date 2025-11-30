#!/bin/zsh

set -e

# npm ci --omit=dev
npx next build
docker build --platform linux/amd64 -t leonardosantino/grocerymanagement:0.0.2 .