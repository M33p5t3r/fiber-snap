// ============================================================
// Abbreviation Parser
// Parses strings like "mesh.box>mat.phong" into an AST
// ============================================================

export interface ASTNode {
    shortcode: string;       // e.g. "mesh", "box", "phong"
    dotModifier?: string;    // e.g. "box" in "mesh.box"
    children: ASTNode[];     // From '>' nesting
    multiplier: number;      // From '*N', default 1
}

/**
 * Tokenize the abbreviation string.
 * Splits on operators while preserving them.
 * Handles: > (child), + (sibling), *N (multiply), . (dot modifier)
 */
function tokenize(input: string): string[] {
    const tokens: string[] = [];
    let current = '';

    for (let i = 0; i < input.length; i++) {
        const char = input[i];

        if (char === '>' || char === '+') {
            if (current) tokens.push(current);
            tokens.push(char);
            current = '';
        } else {
            current += char;
        }
    }

    if (current) tokens.push(current);
    return tokens;
}

/**
 * Parse a single component token like "mesh.box", "mat.phong", "mesh.box*3"
 * Returns an ASTNode (without children — those are wired by the tree parser).
 */
function parseComponent(token: string): ASTNode {
    let multiplier = 1;
    let body = token;

    // Extract multiplier: "mesh.box*3" → body="mesh.box", multiplier=3
    const multMatch = body.match(/^(.+)\*(\d+)$/);
    if (multMatch) {
        body = multMatch[1];
        multiplier = parseInt(multMatch[2], 10);
    }

    // Extract dot modifier: "mesh.box" → shortcode="mesh", dotModifier="box"
    const dotIndex = body.indexOf('.');
    if (dotIndex !== -1) {
        return {
            shortcode: body.substring(0, dotIndex),
            dotModifier: body.substring(dotIndex + 1),
            children: [],
            multiplier,
        };
    }

    return {
        shortcode: body,
        children: [],
        multiplier,
    };
}

/**
 * Parse a full abbreviation string into an array of sibling ASTNodes.
 *
 * Grammar:
 *   expression = component ( ('>' expression) | ('+' expression) )*
 *   component  = shortcode ['.' modifier] ['*' number]
 *
 * Examples:
 *   "mesh.box"                → [{ shortcode: "mesh", dotModifier: "box" }]
 *   "alight+plight"           → [{ shortcode: "alight" }, { shortcode: "plight" }]
 *   "group>mesh.box*3"        → [{ shortcode: "group", children: [{ shortcode: "mesh", dotModifier: "box", multiplier: 3 }] }]
 *   "canvas>alight+plight+mesh.box"
 *     → [{ shortcode: "canvas", children: [{ shortcode: "alight" }, { shortcode: "plight" }, { shortcode: "mesh", dotModifier: "box" }] }]
 */
export function parse(input: string): ASTNode[] {
    const trimmed = input.trim();
    if (!trimmed) return [];

    const tokens = tokenize(trimmed);
    const siblings: ASTNode[] = [];
    let i = 0;

    while (i < tokens.length) {
        const token = tokens[i];

        // Skip bare operators (shouldn't happen but defensive)
        if (token === '>' || token === '+') {
            i++;
            continue;
        }

        const node = parseComponent(token);
        i++;

        // Look ahead: is the next token a '>' (child)?
        if (i < tokens.length && tokens[i] === '>') {
            i++; // consume '>'
            // Everything after '>' until a '+' at this nesting level becomes children
            // We need to collect the rest of the tokens and recursively parse
            const remaining = tokens.slice(i).join('');
            node.children = parse(remaining);
            // Since we consumed everything into children, we're done at this level
            siblings.push(node);
            return siblings;
        }

        siblings.push(node);

        // If next token is '+', skip it and continue to next sibling
        if (i < tokens.length && tokens[i] === '+') {
            i++;
        }
    }

    return siblings;
}