# Changelog

All notable changes to Fiber Snap will be documented in this file.

## [0.2.0] - 2026-06-27

### Added

- **26 new drei shortcodes** across 5 categories:
  - **Controls**: `mapcontrols`, `cameracontrols`, `presentation`, `pivot`, `scrollcontrols`, `keyboard`, `firstperson`
  - **Staging & Lighting**: `center`, `stage`, `contactshadows`, `softshadows`, `lightformer`, `loader`, `preload`
  - **Materials**: `reflector`, `transmission`, `distort`, `wobble`
  - **Shapes & Geometry**: `roundedbox`, `text3d`, `line`, `image`
  - **Performance**: `bake`, `adaptdpr`, `adaptevents`, `perfmon`, `instances`, `lod`
- Registry reorganized into subcategories for maintainability.
- Updated README with full shortcode reference and new examples.

## [0.1.6] - 2026-06-27

### Fixed

- Fixed double-brace wrapping on light intensity props — `intensity={{Math.PI}}` now correctly renders as `intensity={Math.PI}`.
- Updated README examples to reflect new light intensity defaults.
- Added CHANGELOG.

### Changed

- Bumped esbuild from 0.25.0 to 0.28.1 (security fix).

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
