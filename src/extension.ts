// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { defaultCachePath } from '@vscode/test-electron/out/download';
import * as vscode from 'vscode';

let decoration1 = vscode.window.createTextEditorDecorationType({
	backgroundColor: "#098A0080",
	opacity: "100%"
});
let decoration2 = vscode.window.createTextEditorDecorationType({
	backgroundColor: "#8A000080",
	opacity: "100%"
});

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	console.log('Congratulations, your extension "tava" is now active!');

	let disposableOpenAction = vscode.workspace.onDidOpenTextDocument(doTheMagic);
	let disposableChangeAction = vscode.workspace.onDidChangeTextDocument(doTheMagic);

	context.subscriptions.push(disposableOpenAction);
	context.subscriptions.push(disposableChangeAction);
}

function doTheMagic(event: vscode.TextDocumentChangeEvent | vscode.TextDocument) {
	console.log("magic happening");
	
	let editor = vscode.window.activeTextEditor;
	let doc = editor?.document;
	let anchor = new vscode.Position(0,0);
	let date1 = 0;
	let date2 = 0;
	
	let flipflag = true;
	let decorArray1: vscode.DecorationOptions[] = [];
	let decorArray2: vscode.DecorationOptions[] = [];

	for (let i = 1; i < doc?.lineCount!; i++) {
		date2 = Date.parse(doc?.lineAt(i).text.split(' ', 1)[0]!);
		date1 = Date.parse(doc?.lineAt(i-1).text.split(' ', 1)[0]!);
		if (Math.abs(date2-date1) > 60000) {
			for (let j = anchor.line; j < i; j++) {
				let range = new vscode.Range(new vscode.Position(j,0), new vscode.Position(j,doc?.lineAt(i-1).text.split(' ', 1)[0].length!));
				flipflag?decorArray1.push({range}):decorArray2.push({range});
			}
			anchor = new vscode.Position(i,0);
			flipflag = !flipflag;
		}
	}

	//go through last timestamp block
	for (let i = anchor.line; i < doc?.lineCount!; i++) {
		let range = new vscode.Range(new vscode.Position(i,0), new vscode.Position(i,doc?.lineAt(i-1).text.split(' ', 1)[0].length!));
		flipflag?decorArray1.push({range}):decorArray2.push({range});
	}

	editor?.setDecorations(decoration1, decorArray1);
	editor?.setDecorations(decoration2, decorArray2);
}

// this method is called when your extension is deactivated
export function deactivate() {}
