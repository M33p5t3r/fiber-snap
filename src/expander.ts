import { ASTNode } from './parser';
import { lookupComponent, getCategory, getDefaultMeshChildren, ComponentDef } from './registry';

/**
 * Tracks the next available tab-stop index across an entire expansion.
 * This ensures tab stops are sequential across the whole snippet.
 */
interface TabStopCounter {
    value: number;
}

/**
 * Reindex tab stops in a props string so they're globally sequential.
 * e.g. "${1:0}" becomes "${5:0}" if counter is at 5.
 */
function reindexTabStops(propsStr: string, counter: TabStopCounter): string {
    return propsStr.replace(/\$\{(\d+):([^}]*)}/g, (_match, _index, defaultVal) => {
        return `\${${counter.value++}:${defaultVal}}`;
    });
}

/**
 * Render a single ComponentDef to a JSX string.
 */
function renderComponentDef(def: ComponentDef, indent: string, counter: TabStopCounter): string {
    const propsStr = renderProps(def.props, counter);

    if (def.selfClosing) {
        return `${indent}<${def.tag}${propsStr} />`;
    }
    return `${indent}<${def.tag}${propsStr}>\n${indent}</${def.tag}>`;
}

/**
 * Render props object to a JSX props string.
 */
function renderProps(props: Record<string, string> | undefined, counter: TabStopCounter): string {
    if (!props || Object.keys(props).length === 0) return '';

    const parts = Object.entries(props).map(([key, value]) => {
        const reindexed = reindexTabStops(value, counter);
        // String literals (wrapped in quotes) render as attribute="value"
        // Everything else (objects, arrays, expressions) render as prop={value}
        if (reindexed.startsWith('"') && reindexed.endsWith('"')) {
            return ` ${key}=${reindexed}`;
        }
        return ` ${key}={${reindexed}}`;
    });

    return parts.join('');
}

/**
 * Expand a single ASTNode into a JSX snippet string.
 */
function expandNode(node: ASTNode, indent: string, counter: TabStopCounter): string {
    const lines: string[] = [];
    const category = getCategory(node.shortcode);
    const def = lookupComponent(node.shortcode);

    // --- Handle mesh.geometry pattern ---
    if (node.shortcode === 'mesh' && node.dotModifier) {
        const meshDef = def!;
        const meshProps = renderProps(meshDef.props, counter);

        // Check if there's an explicit material override in children
        const explicitMatChild = node.children.find(
            c => getCategory(c.shortcode) === 'materials' || (c.shortcode === 'mat' && c.dotModifier)
        );
        const matShortcode = explicitMatChild
            ? (explicitMatChild.dotModifier ?? explicitMatChild.shortcode)
            : undefined;

        // Get geometry + material
        const meshChildren = getDefaultMeshChildren(node.dotModifier, matShortcode);

        lines.push(`${indent}<mesh${meshProps}>`);
        for (const child of meshChildren) {
            lines.push(renderComponentDef(child, indent + '  ', counter));
        }

        // Expand any remaining (non-material) children
        const otherChildren = node.children.filter(c => {
            if (c === explicitMatChild) return false;
            return true;
        });
        for (const child of otherChildren) {
            lines.push(expandNode(child, indent + '  ', counter));
        }

        lines.push(`${indent}</mesh>`);
        return lines.join('\n');
    }

    // --- Handle mat.type pattern (standalone material override) ---
    if (node.shortcode === 'mat' && node.dotModifier) {
        const matDef = lookupComponent(node.dotModifier);
        if (matDef) {
            return renderComponentDef(matDef, indent, counter);
        }
    }

    // --- Handle known components ---
    if (def) {
        if (def.selfClosing && node.children.length === 0) {
            return renderComponentDef(def, indent, counter);
        }

        const propsStr = renderProps(def.props, counter);
        lines.push(`${indent}<${def.tag}${propsStr}>`);
        for (const child of node.children) {
            lines.push(expandNode(child, indent + '  ', counter));
        }
        lines.push(`${indent}</${def.tag}>`);
        return lines.join('\n');
    }

    // --- Unknown shortcode: render as-is (passthrough) ---
    const tag = node.shortcode;
    if (node.children.length === 0) {
        return `${indent}<${tag} />`;
    }
    lines.push(`${indent}<${tag}>`);
    for (const child of node.children) {
        lines.push(expandNode(child, indent + '  ', counter));
    }
    lines.push(`${indent}</${tag}>`);
    return lines.join('\n');
}

/**
 * Main expansion entry point.
 * Takes an array of sibling ASTNodes and produces a complete JSX snippet.
 */
export function expand(nodes: ASTNode[], indent: string = ''): string {
    const counter: TabStopCounter = { value: 1 };
    const results: string[] = [];

    for (const node of nodes) {
        // Handle multiplier: mesh.box*3 → three copies
        for (let i = 0; i < node.multiplier; i++) {
            results.push(expandNode(node, indent, counter));
        }
    }

    // Add a final tab stop at the end (standard snippet behavior)
    results.push(`\${${counter.value}}`);

    return results.join('\n');
}