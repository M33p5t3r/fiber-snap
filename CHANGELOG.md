# Changelog

All notable changes to Fiber Snap will be documented in this file.

## [0.1.5] - 2026-06-27

### Fixed

- Fixed double-brace wrapping on light intensity props — `intensity={{Math.PI}}` now correctly renders as `intensity={Math.PI}`.
- Updated README examples to reflect new light intensity defaults.
- Added CHANGELOG.

## [0.1.4] - 2026-06-27

### Fixed

- Updated light intensity defaults for Three.js r155+ physical lighting model. `ambientLight` now uses `Math.PI / 2` and `directionalLight`, `pointLight`, `spotLight` use `Math.PI` to restore pre-r155 perceived brightness in physically-based scenes.

## [0.1.3] - 2026-03-19

### Fixed

- Fixed GitHub repo URLs pointing to correct `M33p5t3r` org.
- Added demo GIF to Marketplace listing.

## [0.1.2] - 2026-03-12

### Fixed

- Fixed double-brace wrapping bug in prop rendering — registry values no longer pre-wrap with `{}` since `renderProps` handles all wrapping.

## [0.1.0] - 2026-03-05

### Added

- Initial release.
- Emmet-style abbreviation expansion for React Three Fiber.
- Grammar operators: `.` (dot-access), `>` (nesting), `+` (siblings), `*N` (multiplication).
- 15 geometry shortcodes, 9 material shortcodes, 5 light shortcodes.
- drei component support: OrbitControls, Environment, Float, Text, Stars, and more.
- Structural shortcodes: `mesh`, `group`, `canvas`, `scene`.
