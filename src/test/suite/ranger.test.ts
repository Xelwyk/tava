import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import { Ranger } from '../../ranger';

suite('Ranger Test Suite', () => {
    return;
    vscode.window.showInformationMessage('Start ranger test.');

    test("Ranger line inspect test", () => {
        const ranger = new Ranger();
        const noStamp = "this is not timestamp";
        const stampStart = "2023-11-10T14:00:55.416759+01:00 this has stamp at start";
        const stampMiddle = "this has 2023-11-10T14:00:55.416759+01:00 stamp in the middle";
        const stampEnd = "this has stamp at the end 2023-11-10T14:00:55.416759+01:00";
        const stampNoSpace = "thereisatimestamp2023-11-10T14:00:55.416759+01:00somewherehere";
        
        assert.strictEqual(ranger.findStamps(noStamp).size, 0);
        assert.strictEqual(ranger.findStamps(stampStart).size, 1);
        assert.strictEqual(ranger.findStamps(stampMiddle).size, 1);
        assert.strictEqual(ranger.findStamps(stampEnd).size, 1);
        assert.strictEqual(ranger.findStamps(stampNoSpace).size, 1);

        let stamp = ranger.findSingleStamp(noStamp);
        assert.strictEqual(stamp, null);

        stamp = ranger.findSingleStamp(stampStart);
        assert.strictEqual(stamp?.range.start.character, 0);
        assert.strictEqual(stamp?.range.end.character, 31);

        stamp = ranger.findSingleStamp(stampMiddle);
        assert.strictEqual(stamp?.range.start.character, 9);
        assert.strictEqual(stamp?.range.end.character, 40);

        stamp = ranger.findSingleStamp(stampEnd);
        assert.strictEqual(stamp?.range.start.character, 26);
        assert.strictEqual(stamp?.range.end.character, 57);

        stamp = ranger.findSingleStamp(stampNoSpace);
        assert.strictEqual(stamp?.range.start.character, 17);
        assert.strictEqual(stamp?.range.end.character, 48);

        stamp = ranger.findSingleStamp(stampStart, 0);
        assert.strictEqual(stamp?.range.start.line, 0);
        stamp = ranger.findSingleStamp(stampStart, 1);
        assert.strictEqual(stamp?.range.start.line, 1);
        stamp = ranger.findSingleStamp(stampStart, 500);
        assert.strictEqual(stamp?.range.start.line, 500);
        stamp = ranger.findSingleStamp(stampStart, -1);
        assert.strictEqual(stamp, null);
    });
});