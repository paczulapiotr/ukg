#!/bin/bash

# Get the absolute path of the project root directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

# Remove all files in gui/src-tauri/server
rm -rf "$SCRIPT_DIR/gui/src-tauri/server"/*

# Publish UKG.Api/UKG.Api.csproj in debug mode to gui/src-tauri/server
dotnet publish "$SCRIPT_DIR/UKG.Api/UKG.Api.csproj" -c Release --self-contained -o "$SCRIPT_DIR/gui/src-tauri/server"

# Change directory to gui/ukg-frontend using pushd
pushd "$SCRIPT_DIR/gui"

# Install dependencies
npm install

# Run "npm run tauri build" command
npm run tauri build

# Return to the previous directory using popd
popd
