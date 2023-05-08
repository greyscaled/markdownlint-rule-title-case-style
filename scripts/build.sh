#!/bin/bash

#
# build.sh
#
# Simple script for building a dist directory suitable for release
#
# Note: must be run from root directory
#
# usage: build.sh
#

yarn check:all
rm -rf dist
yarn build
cp LICENSE dist
cp package.json dist
cp README.md dist
