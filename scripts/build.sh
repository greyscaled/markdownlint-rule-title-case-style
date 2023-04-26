#!/bin/bash

yarn check:all
rm -rf dist
yarn build
cp package.json dist
cp README.md dist
