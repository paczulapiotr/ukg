# Prerequisites

- .NET 8.0
- nodejs 20.10.0
- rust 1.79.0
- npm 8.19.2

# Development

GUI is created using tauri v1 + react + ts in `./gui` folder. Backend logic is created using AspNetCore 8.0. In order to run development version use `./scripts/dev.sh` and attach to `UKG.Api` .NET process in order to debug it.

# Production build

Run `./scripts/builld.sh` and installers will be created in `./gui/src-tauri/target/release/bundle/` folder
