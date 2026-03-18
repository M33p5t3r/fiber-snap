# Fiber Snap

> Emmet-style abbreviation expansion for [React Three Fiber](https://docs.pmnd.rs/react-three-fiber).

Type a shorthand abbreviation in any `.jsx` or `.tsx` file, accept the `r3f:` suggestion from autocomplete, and it expands into a full R3F JSX tree with tab stops — exactly like Emmet, but for 3D.

---

## Demo

<!-- Replace with your actual GIF -->
![Fiber Snap demo](https://raw.githubusercontent.com/abram-manaka/fiber-snap/main/demo.gif)

---

## Install

Search **Fiber Snap** in the VS Code Extensions panel, or install from the command line:

```
ext install abram-manaka.fiber-snap
```

---

## Usage

Type an abbreviation in a `.jsx` or `.tsx` file and accept the `r3f:` suggestion from IntelliSense.

### Quick examples

| You type | Expands to |
|---|---|
| `mesh.box` | `<mesh>` with `<boxGeometry />` + `<meshStandardMaterial />` |
| `mesh.sphere>mat.phong` | Sphere mesh with Phong material |
| `alight` | `<ambientLight intensity={0.5} />` |
| `plight` | `<pointLight position={[10, 10, 10]} intensity={1} />` |
| `canvas>alight+plight+mesh.box` | Full Canvas setup with lights and a mesh |
| `group>mesh.box*3` | Group containing 3 box meshes |
| `orbit` | `<OrbitControls />` (from `@react-three/drei`) |
| `environment` | `<Environment preset="studio" />` |
| `stars` | `<Stars />` |
| `float>mesh.sphere` | Floating sphere with drei's `<Float>` |

---

## Abbreviation Grammar

| Operator | Meaning | Example |
|---|---|---|
| `.` | Attach geometry or material | `mesh.sphere`, `mat.phong` |
| `>` | Nest as child | `group>mesh.box` |
| `+` | Add as sibling | `alight+plight` |
| `*N` | Repeat N times | `mesh.box*3` |

---

## Supported Shortcodes

### Geometries
`box` `sphere` `plane` `cylinder` `cone` `torus` `ring` `circle` `tube` `extrude` `lathe` `dodecahedron` `icosahedron` `octahedron` `tetrahedron`

### Materials
`std` `basic` `phong` `lambert` `normal` `toon` `physical` `depth` `matcap`

### Lights
`alight` `plight` `dlight` `slight` `hlight`

### Controls (drei)
`orbit` `trackball` `fly` `pointerlock` `transform`

### Helpers
`axes` `grid` `arrow`

### Drei Components
`text` `html` `billboard` `float` `sparkles` `stars` `cloud` `sky` `environment`

### Structural
`mesh` `group` `canvas` `scene`

---

## Settings

| Setting | Default | Description |
|---|---|---|
| `r3fEmmet.enable` | `true` | Enable or disable Fiber Snap |

---

## Requirements

- VS Code `^1.85.0`
- A project using `@react-three/fiber` (the extension works on any `.jsx`/`.tsx` file)

---

## Contributing

Pull requests welcome. The shortcode registry lives in `src/registry.ts` — adding new components is straightforward.

[GitHub →](https://github.com/abram-manaka/fiber-snap)

---

## License

MIT
