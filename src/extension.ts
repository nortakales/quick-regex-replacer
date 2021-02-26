import * as vscode from 'vscode';
import RegexReplacer from './RegexReplacer'

export function activate(context: vscode.ExtensionContext) {

	const letters = ["alpha", "beta", "gamma", "delta", "epsilon"];
	const regexReplacer = new RegexReplacer();

	for(const greek of letters) {
		
		let disposable = vscode.commands.registerCommand('quickRegexReplacer.replace.' + greek, () => {
			regexReplacer.triggerReplacement(greek);
		});
	
		context.subscriptions.push(disposable);
	}
}

export function deactivate() {}
