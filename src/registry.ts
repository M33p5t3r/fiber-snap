// ============================================================
// R3F Component Registry
// Maps shortcodes → component names, default props, and children
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
const lights: Record<string, ComponentDef> = {
    alight:  { tag: 'ambientLight',     props: { intensity: '${1:0.5}' },                                        selfClosing: true },
    plight:  { tag: 'pointLight',       props: { position: '[${1:10}, ${2:10}, ${3:10}]', intensity: '${4:1}' },  selfClosing: true },
    dlight:  { tag: 'directionalLight', props: { position: '[${1:5}, ${2:5}, ${3:5}]', intensity: '${4:1}' },     selfClosing: true },
    slight:  { tag: 'spotLight',        props: { position: '[${1:5}, ${2:5}, ${3:5}]', angle: '${4:0.3}', intensity: '${5:1}' }, selfClosing: true },
    hlight:  { tag: 'hemisphereLight',  props: { args: '["${1:#ffffff}", "${2:#444444}", ${3:1}]' },              selfClosing: true },
};

// --- Controls (drei) ---
const controls: Record<string, ComponentDef> = {
    orbit:       { tag: 'OrbitControls',       selfClosing: true, importFrom: '@react-three/drei' },
    trackball:   { tag: 'TrackballControls',   selfClosing: true, importFrom: '@react-three/drei' },
    fly:         { tag: 'FlyControls',         selfClosing: true, importFrom: '@react-three/drei' },
    pointerlock: { tag: 'PointerLockControls', selfClosing: true, importFrom: '@react-three/drei' },
    transform:   { tag: 'TransformControls',   selfClosing: true, importFrom: '@react-three/drei' },
};

// --- Helpers ---
const helpers: Record<string, ComponentDef> = {
    axes:  { tag: 'axesHelper',    props: { args: '[${1:5}]' },  selfClosing: true },
    grid:  { tag: 'gridHelper',    props: { args: '[${1:10}, ${2:10}]' }, selfClosing: true },
    arrow: { tag: 'arrowHelper',   selfClosing: true },
};

// --- Drei Components ---
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