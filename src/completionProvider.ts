import * as vscode from 'vscode';
import { parse } from './parser';
import { expand } from './expander';
import { getAllShortcodes, lookupComponent, getCategory } from './registry';

export class R3FCompletionProvider implements vscode.CompletionItemProvider {

    provideCompletionItems(
        document: vscode.TextDocument,
        position: vscode.Position,
        _token: vscode.CancellationToken,
        _context: vscode.CompletionContext
    ): vscode.ProviderResult<vscode.CompletionItem[]> {

        // Get the text from the start of the line to the cursor
        const lineText = document.lineAt(position).text;
        const textBeforeCursor = lineText.substring(0, position.character);

        // Extract the abbreviation: grab the last "word" which may contain . > + *
        const abbrevMatch = textBeforeCursor.match(/([a-zA-Z][a-zA-Z0-9.*>+]*?)$/);
        if (!abbrevMatch) return [];

        const abbreviation = abbrevMatch[1];
        if (!abbreviation || abbreviation.length < 2) return [];

        const items: vscode.CompletionItem[] = [];

        // --- 1. Try to expand the full abbreviation as-is ---
        const fullExpansion = this.tryExpand(abbreviation);
        if (fullExpansion) {
            const item = new vscode.CompletionItem(
                `r3f: ${abbreviation}`,
                vscode.CompletionItemKind.Snippet
            );
            item.insertText = new vscode.SnippetString(fullExpansion);
            item.detail = 'R3F Emmet expansion';
            item.documentation = new vscode.MarkdownString(
                '```jsx\n' + this.stripTabStops(fullExpansion) + '\n```'
            );
            item.sortText = '0'; // Push to top of suggestions
            item.filterText = abbreviation;

            // Replace the entire abbreviation text when accepting
            const range = new vscode.Range(
                position.translate(0, -abbreviation.length),
                position
            );
            item.range = range;

            items.push(item);
        }

        // --- 2. Suggest matching shortcodes if typing a partial ---
        const lastSegment = this.getLastSegment(abbreviation);
        if (lastSegment) {
            const shortcodes = getAllShortcodes();
            const matches = shortcodes.filter(s => s.startsWith(lastSegment) && s !== lastSegment);

            for (const match of matches.slice(0, 10)) {
                // Build the completed abbreviation by replacing the last segment
                const completed = abbreviation.slice(0, abbreviation.length - lastSegment.length) + match;
                const expansion = this.tryExpand(completed);

                if (expansion) {
                    const item = new vscode.CompletionItem(
                        `r3f: ${completed}`,
                        vscode.CompletionItemKind.Snippet
                    );
                    item.insertText = new vscode.SnippetString(expansion);
                    item.detail = this.getComponentDetail(match);
                    item.documentation = new vscode.MarkdownString(
                        '```jsx\n' + this.stripTabStops(expansion) + '\n```'
                    );
                    item.sortText = `1-${match}`;
                    item.filterText = abbreviation;

                    const range = new vscode.Range(
                        position.translate(0, -abbreviation.length),
                        position
                    );
                    item.range = range;

                    items.push(item);
                }
            }
        }

        return items;
    }

    /**
     * Attempt to parse and expand an abbreviation.
     * Returns the expanded JSX string, or null if it fails.
     */
    private tryExpand(abbreviation: string): string | null {
        try {
            const ast = parse(abbreviation);
            if (ast.length === 0) return null;

            // Validate: at least one known shortcode in the AST
            if (!this.hasKnownShortcode(ast)) return null;

            // Get the current indentation context
            const expanded = expand(ast, '');
            return expanded;
        } catch {
            return null;
        }
    }

    /**
     * Check if any node in the AST tree contains a known shortcode.
     */
    private hasKnownShortcode(nodes: ReturnType<typeof parse>): boolean {
        for (const node of nodes) {
            if (lookupComponent(node.shortcode)) return true;
            if (node.dotModifier && lookupComponent(node.dotModifier)) return true;
            if (node.children.length > 0 && this.hasKnownShortcode(node.children)) return true;
        }
        return false;
    }

    /**
     * Extract the last segment of an abbreviation for partial matching.
     * "canvas>alight+pl" → "pl"
     * "mesh." → "" (after dot, geometry expected)
     */
    private getLastSegment(abbreviation: string): string {
        const parts = abbreviation.split(/[>+]/);
        const last = parts[parts.length - 1] || '';
        // If it ends with a dot, the user is picking a modifier
        const dotParts = last.split('.');
        return dotParts[dotParts.length - 1] || '';
    }

    /**
     * Get a human-readable detail string for a shortcode.
     */
    private getComponentDetail(shortcode: string): string {
        const def = lookupComponent(shortcode);
        const category = getCategory(shortcode);
        if (!def) return 'R3F component';
        return `<${def.tag}> (${category})`;
    }

    /**
     * Strip tab-stop markers for the documentation preview.
     * "${1:0.5}" → "0.5"
     */
    private stripTabStops(snippet: string): string {
        return snippet
            .replace(/\$\{(\d+):([^}]*)}/g, '$2')
            .replace(/\$\{\d+}/g, '');
    }
}