import * as vscode from 'vscode';

function capitalize(str: string) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

export function activate(context: vscode.ExtensionContext) {

	const letters = ["alpha", "beta", "gamma", "delta", "epsilon"];

	for(const greek of letters) {
		
		let disposable = vscode.commands.registerCommand('quickRegexReplacer.replace.' + greek, () => {

			const editor = vscode.window.activeTextEditor;
	
			if(editor) {
	
				const configuration = vscode.workspace.getConfiguration("quickRegexReplacer")
				const regex = configuration.get(greek + ".regex");
				let replacement = configuration.get(greek + ".replacement");
	
				if(regex && replacement) {

					replacement = (replacement as string).replace("\\n", "\n");

					const document = editor.document;
					const selection = editor.selection;

					let affectedTextRange: vscode.Range;
					let textReplacement: string;
					let setCursorToEnd: boolean = false;
					
					if(selection && !selection.isEmpty) {
						
						affectedTextRange = new vscode.Range(selection.start, selection.end);

						const documentText = document.getText(affectedTextRange);
		
						textReplacement = documentText.replace(new RegExp(regex as string, "g"), replacement as string);

					} else {

						const documentText = document.getText();
		
						textReplacement = documentText.replace(new RegExp(regex as string, "g"), replacement as string);
						
						var firstLine = document.lineAt(0);
						var lastLine = document.lineAt(document.lineCount - 1);
						affectedTextRange = new vscode.Range(firstLine.range.start, lastLine.range.end);
						
						if(selection.end.isEqual(lastLine.range.end)) {
							setCursorToEnd = true;
						}
					}
					
					editor.edit(editBuilder => {
						editBuilder.replace(affectedTextRange, textReplacement)
					})
					.then(success => {
						if(success && setCursorToEnd) {
							var postion = editor.selection.end; 
							editor.selection = new vscode.Selection(postion, postion);
						}
					});
				} else {
					vscode.window.showWarningMessage("You have not configured a Regex and/or Replacement for \"" + capitalize(greek) + "\"");
				}
			}
		});
	
		context.subscriptions.push(disposable);
	}
}

export function deactivate() {}
