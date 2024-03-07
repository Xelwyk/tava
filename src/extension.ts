// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { ConfigurationController } from './configurator';
import { Ranger, StampGroup } from './ranger';
import { Grouper } from './grouper';
import { Painter } from './painter';
import { Sorter } from './sorter';

let decoration1 = vscode.window.createTextEditorDecorationType({
	backgroundColor: "#ffc20080",
	color: "#000000"
});
let decoration2 = vscode.window.createTextEditorDecorationType({
	backgroundColor: "#0078ff80",
	color: "#ffffff"
});

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	console.log('extension "tava" is now active!');

	//note to self: timeout executes function after specified time
	var timeoutId: NodeJS.Timeout;

	let disposableOpenAction = vscode.workspace.onDidOpenTextDocument(painting);
	let disposableChangeActiveAction = vscode.window.onDidChangeActiveTextEditor(painting);
	let disposableChangeAction = vscode.workspace.onDidChangeTextDocument( event => {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => {
			painting(event);
		}, 500);
	});
	let disposableSetIntervalCommand = vscode.commands.registerCommand("tava.setTargetInterval", onSetIntervalCommand);

	context.subscriptions.push(disposableOpenAction);
	context.subscriptions.push(disposableChangeAction);
	context.subscriptions.push(disposableSetIntervalCommand);
	context.subscriptions.push(disposableChangeActiveAction);

	painting(undefined);
}

async function onSetIntervalCommand() {
	const config = new ConfigurationController();
	let opts: vscode.InputBoxOptions = {};
	opts.ignoreFocusOut = true;
	opts.placeHolder = "Input milliseconds";
	opts.prompt = "save";
	opts.value = config.getInterval().toString();
	opts.title = "Target interval (ms)";
	opts.validateInput = (text) => {
		if (isNaN(parseInt(text))){
			return "not a number, write only milliseconds";
		}
		return null;
	};
	let newInterval = await vscode.window.showInputBox(opts);
	config.setInterval(parseInt(newInterval!));
}

function painting(event: vscode.TextDocumentChangeEvent | vscode.TextDocument | vscode.TextEditor | undefined) {
	console.log("looking for holes in timestamps");
	
	const config = new ConfigurationController();
	
	let editor = vscode.window.activeTextEditor;
	if (editor === undefined) {
		return;
	}
	
	let document = editor.document;
	if (event !== undefined && "lineCount" in event) {
		document = event;
	}

	let text = editor.document.getText();
	if (text === undefined || text === null) {
		return;
	}

	let interval = config.getInterval().valueOf();
	let ranger = new Ranger();
	let sorter = new Sorter();
	let grouper = new Grouper();
	let painter = new Painter();
	let decorArray1: vscode.DecorationOptions[] = [];
	let decorArray2: vscode.DecorationOptions[] = [];

	let stamps = sorter.sort(ranger.findStamps(text));
	grouper.group(stamps, interval);
	painter.prepareTextDecoration(stamps);

	/*stamps.forEach(stamp => {
		let range = stamp.range;
		if (stamp.group === StampGroup.groupA) {
			decorArray1.push({range});
			editor?.setDecorations(decoration1, decorArray1);
		} else {
			decorArray2.push({range});
			editor?.setDecorations(decoration2, decorArray2);
		}
	});*/
	editor.setDecorations(decoration1, stamps.filter(stamp => stamp.group === StampGroup.groupA));
	editor.setDecorations(decoration2, stamps.filter(stamp => stamp.group === StampGroup.groupB));
}

// this method is called when your extension is deactivated
export function deactivate() {}

