import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import { Ranger, StampMetadata } from '../../ranger';
import { Sorter } from '../../sorter';

suite('Sorter Test Suite', () => {
    vscode.window.showInformationMessage('Start sorter test.');

    test("Sorter sorting test", () => {
        const ranger = new Ranger();
        const sorter = new Sorter();
        const stampStart = "2023-11-10T14:00:55.416759+01:00 this has stamp at start";
        const stampMiddle = "this has 2023-11-10T14:00:55.416759+01:00 stamp in the middle";
        const stampEnd = "this has stamp at the end 2023-11-10T14:00:55.416759+01:00";
        const stampNoSpace = "thereisatimestamp2023-11-10T14:00:55.416759+01:00somewherehere";

        let unsortedArr: Array<StampMetadata | null> = [];
        unsortedArr.push(
            ranger.findSingleStamp(stampEnd, 2),
            ranger.findSingleStamp(stampStart, 0),
            ranger.findSingleStamp(stampNoSpace, 3),
            ranger.findSingleStamp(stampMiddle, 1),
        );
        
        let sortedArr = sorter.sort(unsortedArr);
        for (let i = 0; i < unsortedArr.length; i++) {
            const stamp = sortedArr[i];
            assert.strictEqual(stamp.range.start.line.valueOf(), i);
        }
    });
});