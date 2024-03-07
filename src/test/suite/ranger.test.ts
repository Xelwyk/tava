import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import { Ranger } from '../../ranger';

suite('Ranger Test Suite', () => {
    vscode.window.showInformationMessage('Start ranger test.');

    test("Ranger line inspect test", () => {
        const ranger = new Ranger();
        const noStamp = "this is not timestamp";
        const stampStart = "2023-11-10T14:00:55.416759+01:00 this has stamp at start";
        const stampMiddle = "this has 2023-11-10T14:01:55.416759+01:00 stamp in the middle";
        const stampEnd = "this has stamp at the end 2023-11-10T14:02:55.416759+01:00";
        const stampNoSpace = "thereisatimestamp2023-11-10T14:03:55.416759+01:00somewherehere";
        
        assert.strictEqual(ranger.findStamps(noStamp).length, 0);
        assert.strictEqual(ranger.findStamps(stampStart).length, 1);
        assert.strictEqual(ranger.findStamps(stampMiddle).length, 1);
        assert.strictEqual(ranger.findStamps(stampEnd).length, 1);
        assert.strictEqual(ranger.findStamps(stampNoSpace).length, 1);

        let stamp = ranger.findSingleStamp(noStamp);
        assert.strictEqual(stamp, null);

        stamp = ranger.findSingleStamp(stampStart);
        assert.strictEqual(stamp?.range.start.character, 0);
        assert.strictEqual(stamp?.range.end.character, 32);
        assert.strictEqual(stamp.timestamp, "2023-11-10T14:00:55.416759+01:00");

        stamp = ranger.findSingleStamp(stampMiddle);
        assert.strictEqual(stamp?.range.start.character, 9);
        assert.strictEqual(stamp?.range.end.character, 41);
        assert.strictEqual(stamp.timestamp, "2023-11-10T14:01:55.416759+01:00");

        stamp = ranger.findSingleStamp(stampEnd);
        assert.strictEqual(stamp?.range.start.character, 26);
        assert.strictEqual(stamp?.range.end.character, 58);
        assert.strictEqual(stamp.timestamp, "2023-11-10T14:02:55.416759+01:00");
        
        stamp = ranger.findSingleStamp(stampNoSpace);
        assert.strictEqual(stamp?.range.start.character, 17);
        assert.strictEqual(stamp?.range.end.character, 49);
        assert.strictEqual(stamp.timestamp, "2023-11-10T14:03:55.416759+01:00");

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