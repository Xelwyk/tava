import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import { Ranger, StampGroup } from '../../ranger';
import { Sorter } from '../../sorter';
import { Grouper } from '../../grouper';
import { Painter } from '../../painter';

suite('Painter Test Suite', () => {
    vscode.window.showInformationMessage('Start painter test.');

    let multiline = `
        2024-03-01T11:28:32.572624+01:00 device Service[937]: 2024-03-01 11:28:32,569 ERROR
        2024-03-01T11:28:37.570281+01:00 device Service[937]: 2024-03-01 11:28:37,568 ERROR
        2024-03-01T11:28:41.603951+01:00 device Service[937]: 2024-03-01 11:28:41,602 ERROR
        2024-03-01T11:28:43.171987+01:00 device Service[937]: 2024-03-01 11:28:43,168 ERROR
        2024-03-01T11:28:51.775749+01:00 device Service[937]: 2024-03-01 11:28:51,774 ERROR
        2024-03-01T11:28:51.813422+01:00 device Service[937]: 2024-03-01 11:28:51,813 ERROR
        2024-03-01T11:28:57.608707+01:00 device Service[937]: 2024-03-01 11:28:57,607 INFO
        2024-03-01T11:28:58.126115+01:00 device Service[937]: 2024-03-01 11:28:58,125 INFO
        `;

    test("Painter test", () => {
        let ranger = new Ranger();
        let sorter = new Sorter();
        let grouper = new Grouper();
        let painter = new Painter();

        let stamps = sorter.sort(ranger.findStamps(multiline));
        grouper.group(stamps, 1000);
        painter.prepareTextDecoration(stamps);

        assert.notStrictEqual(stamps[0].decorationType, undefined);
        assert.notStrictEqual(stamps[1].decorationType, undefined);
        assert.notStrictEqual(stamps[stamps.length-1].decorationType, undefined);
    });
});