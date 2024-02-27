import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import Ranger = require('../../ranger');
import { inspect } from 'util';

suite('Ranger Test Suite', () => {
    vscode.window.showInformationMessage('Start ranger test.');

    test("Ranger line inspect test", () => {
        const ranger = new Ranger();
        const noStamp = "this is not timestamp";
        const stampStart = "2023-11-10T14:00:55.416759+01:00 this has stamp at start";
        const stampMiddle = "this has 2023-11-10T14:00:55.416759+01:00 stamp in the middle";
        const stampEnd = "this has stamp at the end 2023-11-10T14:00:55.416759+01:00";
        const stampNoSpace = "thereisatimestamp2023-11-10T14:00:55.416759+01:00somewherehere";

        assert.strictEqual(ranger.inspect(""), );
    });
});