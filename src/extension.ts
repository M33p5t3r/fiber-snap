import * as vscode from 'vscode';
import { R3FCompletionProvider } from './completionProvider';

export function activate(context: vscode.ExtensionContext) {
   vscode.window.showInformationMessage('Fiber Snap is active!');

    const provider = vscode.languages.registerCompletionItemProvider(
        [
            { scheme: 'file', language: 'javascriptreact' },
            { scheme: 'file', language: 'typescriptreact' },
        ],
        new R3FCompletionProvider(),
        '.', '>', '+', '*'
    );

    context.subscriptions.push(provider);
}

export function deactivate() {}