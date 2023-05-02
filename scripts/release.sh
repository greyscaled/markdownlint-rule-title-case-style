#!/bin/bash

#
# release.sh
#
# Simple script for building a dist directory and releasing it to npm
#
# Note: must be run from root directory
#
# usage: release.sh <tag>
#     <tag> - semver tag, must match package.json version

usage() {
  echo "Usage: $0 <tag>"
  echo ""
  echo "Arguments:"
  echo "    <tag> semver tag, must match package.json version"
  exit 1
}

# Check <tag> required argument
if [ -z "$1" ]; then
  echo "missing <tag>"
  usage
fi

# Check package.json version is up to date
isPackageJSONUpdated=$(cat package.json | grep "\"version\": \"${1}\"")
if [ -z "$isPackageJSONUpdated" ]; then
  echo "package.json version not up to date"
  cat package.json | grep "version"
  exit 1
fi

# Check git tag is up to date
isGitUpdated=$(git tag --list --contains HEAD | grep "v${1}")
if [ -z "$isGitUpdated" ]; then
  echo "git tag not up to date OR tag is not for current HEAD"
  git tag --list
  exit 1
fi

./scripts/build.sh
cd dist || exit 1
npm publish
