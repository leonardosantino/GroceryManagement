#!/bin/zsh

set -e

npx next build
docker build --platform linux/amd64 -t leonardosantino/grocerymanagement:0.0.12 .