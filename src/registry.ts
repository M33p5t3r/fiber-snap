// ============================================================
// R3F Component Registry
// Maps shortcodes → component names, default props, and children
//
// IMPORTANT: Registry prop values must NEVER include {} wrapping.
// renderProps in expander.ts handles all {} wrapping automatically.
// ============================================================

export interface ComponentDef {
    tag: string;
    props?: Record<string, string>;    // Default props with tab-stop placeholders
    children?: ComponentDef[];          // Default children (e.g. geometry + material inside mesh)
    selfClosing?: boolean;
    importFrom?: string;                // For drei components that need imports
}

// --- Geometries ---
const geometries: Record<string, ComponentDef> = {
    box:           { tag: 'boxGeometry',           props: { args: '[${1:1}, ${2:1}, ${3:1}]' },           selfClosing: true },
    sphere:        { tag: 'sphereGeometry',        props: { args: '[${1:1}, ${2:32}, ${3:32}]' },         selfClosing: true },
    plane:         { tag: 'planeGeometry',         props: { args: '[${1:1}, ${2:1}]' },                   selfClosing: true },
    cylinder:      { tag: 'cylinderGeometry',      props: { args: '[${1:0.5}, ${2:0.5}, ${3:1}, ${4:32}]' }, selfClosing: true },
    cone:          { tag: 'coneGeometry',          props: { args: '[${1:0.5}, ${2:1}, ${3:32}]' },        selfClosing: true },
    torus:         { tag: 'torusGeometry',         props: { args: '[${1:1}, ${2:0.4}, ${3:16}, ${4:100}]' }, selfClosing: true },
    ring:          { tag: 'ringGeometry',          props: { args: '[${1:0.5}, ${2:1}, ${3:32}]' },        selfClosing: true },
    circle:        { tag: 'circleGeometry',        props: { args: '[${1:1}, ${2:32}]' },                  selfClosing: true },
    tube:          { tag: 'tubeGeometry',          selfClosing: true },
    extrude:       { tag: 'extrudeGeometry',       selfClosing: true },
    lathe:         { tag: 'latheGeometry',         selfClosing: true },
    dodecahedron:  { tag: 'dodecahedronGeometry',  props: { args: '[${1:1}, ${2:0}]' },                  selfClosing: true },
    icosahedron:   { tag: 'icosahedronGeometry',   props: { args: '[${1:1}, ${2:0}]' },                  selfClosing: true },
    octahedron:    { tag: 'octahedronGeometry',    props: { args: '[${1:1}, ${2:0}]' },                   selfClosing: true },
    tetrahedron:   { tag: 'tetrahedronGeometry',   props: { args: '[${1:1}, ${2:0}]' },                  selfClosing: true },
};

// --- Materials ---
const materials: Record<string, ComponentDef> = {
    std:      { tag: 'meshStandardMaterial',  props: { color: '"${1:#ffffff}"' }, selfClosing: true },
    basic:    { tag: 'meshBasicMaterial',     props: { color: '"${1:#ffffff}"' }, selfClosing: true },
    phong:    { tag: 'meshPhongMaterial',     props: { color: '"${1:#ffffff}"' }, selfClosing: true },
    lambert:  { tag: 'meshLambertMaterial',   props: { color: '"${1:#ffffff}"' }, selfClosing: true },
    normal:   { tag: 'meshNormalMaterial',    selfClosing: true },
    toon:     { tag: 'meshToonMaterial',      props: { color: '"${1:#ffffff}"' }, selfClosing: true },
    physical: { tag: 'meshPhysicalMaterial',  props: { color: '"${1:#ffffff}"', roughness: '${2:0.5}', metalness: '${3:0.5}' }, selfClosing: true },
    depth:    { tag: 'meshDepthMaterial',     selfClosing: true },
    matcap:   { tag: 'meshMatcapMaterial',    selfClosing: true },
};

// --- Lights ---
// NOTE: Three.js r155+ uses a physical lighting model (useLegacyLights defaults to false).
// Raw values like 0.5 or 1 now render much dimmer than in older projects.
// Math.PI / 2 for ambient and Math.PI for directional/point/spot restores
// the pre-r155 perceived brightness in physically-based scenes.
const lights: Record<string, ComponentDef> = {
    alight:  { tag: 'ambientLight',     props: { intensity: 'Math.PI / 2' },                                                         selfClosing: true },
    plight:  { tag: 'pointLight',       props: { position: '[${1:10}, ${2:10}, ${3:10}]', intensity: 'Math.PI' },                      selfClosing: true },
    dlight:  { tag: 'directionalLight', props: { position: '[${1:5}, ${2:5}, ${3:5}]', intensity: 'Math.PI' },                         selfClosing: true },
    slight:  { tag: 'spotLight',        props: { position: '[${1:5}, ${2:5}, ${3:5}]', angle: '${4:0.3}', intensity: 'Math.PI' },      selfClosing: true },
    hlight:  { tag: 'hemisphereLight',  props: { args: '["${1:#ffffff}", "${2:#444444}", ${3:Math.PI / 2}]' },                          selfClosing: true },
};

// --- Controls (drei) ---
const controls: Record<string, ComponentDef> = {
    orbit:          { tag: 'OrbitControls',          selfClosing: true, importFrom: '@react-three/drei' },
    trackball:      { tag: 'TrackballControls',      selfClosing: true, importFrom: '@react-three/drei' },
    fly:            { tag: 'FlyControls',            selfClosing: true, importFrom: '@react-three/drei' },
    pointerlock:    { tag: 'PointerLockControls',    selfClosing: true, importFrom: '@react-three/drei' },
    transform:      { tag: 'TransformControls',      selfClosing: true, importFrom: '@react-three/drei' },
    mapcontrols:    { tag: 'MapControls',            selfClosing: true, importFrom: '@react-three/drei' },
    cameracontrols: { tag: 'CameraControls',         selfClosing: true, importFrom: '@react-three/drei' },
    presentation:   { tag: 'PresentationControls',   importFrom: '@react-three/drei' },
    pivot:          { tag: 'PivotControls',           importFrom: '@react-three/drei' },
    scrollcontrols: { tag: 'ScrollControls',          props: { pages: '${1:3}' }, importFrom: '@react-three/drei' },
    keyboard:       { tag: 'KeyboardControls',        importFrom: '@react-three/drei' },
    firstperson:    { tag: 'FirstPersonControls',     selfClosing: true, importFrom: '@react-three/drei' },
};

// --- Helpers ---
const helpers: Record<string, ComponentDef> = {
    axes:  { tag: 'axesHelper',    props: { args: '[${1:5}]' },  selfClosing: true },
    grid:  { tag: 'gridHelper',    props: { args: '[${1:10}, ${2:10}]' }, selfClosing: true },
    arrow: { tag: 'arrowHelper',   selfClosing: true },
};

// --- Drei: Scene & Decorative ---
const drei: Record<string, ComponentDef> = {
    text:        { tag: 'Text',        props: { fontSize: '${1:1}' },      importFrom: '@react-three/drei' },
    html:        { tag: 'Html',        importFrom: '@react-three/drei' },
    billboard:   { tag: 'Billboard',   importFrom: '@react-three/drei' },
    float:       { tag: 'Float',       props: { speed: '${1:1}' },         importFrom: '@react-three/drei' },
    sparkles:    { tag: 'Sparkles',    props: { count: '${1:100}' },       selfClosing: true, importFrom: '@react-three/drei' },
    stars:       { tag: 'Stars',       selfClosing: true, importFrom: '@react-three/drei' },
    cloud:       { tag: 'Cloud',       selfClosing: true, importFrom: '@react-three/drei' },
    sky:         { tag: 'Sky',         selfClosing: true, importFrom: '@react-three/drei' },
    environment: { tag: 'Environment', props: { preset: '"${1:studio}"' }, selfClosing: true, importFrom: '@react-three/drei' },
};

// --- Drei: Staging & Lighting ---
const dreiStaging: Record<string, ComponentDef> = {
    center:         { tag: 'Center',         importFrom: '@react-three/drei' },
    stage:          { tag: 'Stage',          importFrom: '@react-three/drei' },
    contactshadows: { tag: 'ContactShadows', props: { position: '[${1:0}, ${2:-0.5}, ${3:0}]', opacity: '${4:0.5}', blur: '${5:2}' }, selfClosing: true, importFrom: '@react-three/drei' },
    softshadows:    { tag: 'SoftShadows',    selfClosing: true, importFrom: '@react-three/drei' },
    lightformer:    { tag: 'Lightformer',    props: { intensity: '${1:1}', position: '[${2:0}, ${3:5}, ${4:0}]' }, selfClosing: true, importFrom: '@react-three/drei' },
    loader:         { tag: 'Loader',         selfClosing: true, importFrom: '@react-three/drei' },
    preload:        { tag: 'Preload',        selfClosing: true, importFrom: '@react-three/drei' },
};

// --- Drei: Materials ---
const dreiMaterials: Record<string, ComponentDef> = {
    reflector:    { tag: 'MeshReflectorMaterial',     props: { mirror: '${1:0.5}', resolution: '${2:1024}' },                        selfClosing: true, importFrom: '@react-three/drei' },
    transmission: { tag: 'MeshTransmissionMaterial',  props: { thickness: '${1:0.5}', roughness: '${2:0}' },                         selfClosing: true, importFrom: '@react-three/drei' },
    distort:      { tag: 'MeshDistortMaterial',       props: { color: '"${1:#ffffff}"', distort: '${2:0.5}', speed: '${3:2}' },       selfClosing: true, importFrom: '@react-three/drei' },
    wobble:       { tag: 'MeshWobbleMaterial',        props: { color: '"${1:#ffffff}"', factor: '${2:1}', speed: '${3:2}' },          selfClosing: true, importFrom: '@react-three/drei' },
};

// --- Drei: Shapes & Geometry ---
const dreiShapes: Record<string, ComponentDef> = {
    roundedbox: { tag: 'RoundedBox',  props: { args: '[${1:1}, ${2:1}, ${3:1}]', radius: '${4:0.1}' }, importFrom: '@react-three/drei' },
    text3d:     { tag: 'Text3D',      props: { font: '"${1:/fonts/inter.json}"', size: '${2:1}' },     importFrom: '@react-three/drei' },
    line:       { tag: 'Line',        props: { points: '[[${1:0}, ${2:0}, ${3:0}], [${4:1}, ${5:1}, ${6:1}]]', color: '"${7:#ffffff}"' }, selfClosing: true, importFrom: '@react-three/drei' },
    image:      { tag: 'Image',       props: { url: '"${1:/path/to/image.jpg}"' },                      selfClosing: true, importFrom: '@react-three/drei' },
};

// --- Drei: Performance ---
const dreiPerformance: Record<string, ComponentDef> = {
    bake:        { tag: 'BakeShadows',        selfClosing: true, importFrom: '@react-three/drei' },
    adaptdpr:    { tag: 'AdaptiveDpr',        selfClosing: true, importFrom: '@react-three/drei' },
    adaptevents: { tag: 'AdaptiveEvents',     selfClosing: true, importFrom: '@react-three/drei' },
    perfmon:     { tag: 'PerformanceMonitor',  importFrom: '@react-three/drei' },
    instances:   { tag: 'Instances',           importFrom: '@react-three/drei' },
    lod:         { tag: 'Detailed',            props: { distances: '[${1:0}, ${2:50}, ${3:100}]' }, importFrom: '@react-three/drei' },
};

// --- Structural ---
const structural: Record<string, ComponentDef> = {
    mesh:   { tag: 'mesh',   props: { position: '[${1:0}, ${2:0}, ${3:0}]' } },
    group:  { tag: 'group',  props: { position: '[${1:0}, ${2:0}, ${3:0}]' } },
    canvas: { tag: 'Canvas', props: { camera: '{ position: [${1:0}, ${2:0}, ${3:5}] }' } },
    scene:  { tag: 'scene' },
};

// ============================================================
// Unified lookup
// ============================================================

const allCategories: Record<string, Record<string, ComponentDef>> = {
    geometries,
    materials,
    lights,
    controls,
    helpers,
    drei,
    dreiStaging,
    dreiMaterials,
    dreiShapes,
    dreiPerformance,
    structural,
};

export function lookupComponent(shortcode: string): ComponentDef | undefined {
    for (const category of Object.values(allCategories)) {
        if (shortcode in category) {
            return category[shortcode];
        }
    }
    return undefined;
}

export function getCategory(shortcode: string): string | undefined {
    for (const [name, category] of Object.entries(allCategories)) {
        if (shortcode in category) {
            return name;
        }
    }
    return undefined;
}

export function getAllShortcodes(): string[] {
    const codes: string[] = [];
    for (const category of Object.values(allCategories)) {
        codes.push(...Object.keys(category));
    }
    return codes;
}

export function getDefaultMeshChildren(geoShortcode: string, matShortcode?: string): ComponentDef[] {
    const geo = geometries[geoShortcode];
    const mat = materials[matShortcode ?? 'std'];
    const children: ComponentDef[] = [];
    if (geo) children.push(geo);
    if (mat) children.push(mat);
    return children;
}
