import * as vscode from 'vscode';

class RegexReplacer {

    getConfiguration() {
        return vscode.workspace.getConfiguration("quickRegexReplacer");
    }

    getRegex(greekLetter: string): string | undefined {
        return this.getConfiguration().get<string>(greekLetter + ".regex");
    }

    getReplacement(greekLetter: string): string {
        return this.getConfiguration().get<string>(greekLetter + ".replacement", "");
    }

    triggerReplacement(greekLetter: string) {

        let regex = this.getRegex(greekLetter);
        let replacement = this.getReplacement(greekLetter);
        replacement = replacement.replace("\\n", "\n");

        if(!regex) {
            vscode.window.showWarningMessage("You have not configured a Regex for \"" + this.capitalize(greekLetter) + "\"");
            return;
        }
        regex = regex as string;

        const editor = vscode.window.activeTextEditor;
        if(!editor) {
            return;
        }

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
    }

    capitalize(str: string) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}

export default RegexReplacer;