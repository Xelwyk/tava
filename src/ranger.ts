import * as vscode from 'vscode';
export class Ranger {

    public findStamps(input: String): Array<StampMetadata> {
        let foundStamps = new Array<StampMetadata>();
        input.split("\n").forEach((line, lineIndex) => {
            let stamp = this.findSingleStamp(line, lineIndex);
            if (stamp !== null) {
                foundStamps.push(stamp);
            }
        });
        return foundStamps;
    }

    public findSingleStamp(input: String, lineIndex?: Number): StampMetadata | null {
        if (lineIndex === undefined) {
            lineIndex = 0;
        }
        if (lineIndex.valueOf() < 0) {
            return null;
        }

        let regex = new RegExp(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d+\+\d{2}:\d{2}/, "d");
        let regexResult = regex.exec(input.toString());
        if (regexResult === undefined || regexResult === null || regexResult.length <= 0) {
            return null;
        }

        let range = new vscode.Range(
            new vscode.Position(lineIndex.valueOf(), regexResult.index),
            new vscode.Position(lineIndex.valueOf(), regexResult.index + (regexResult[0].length))
        );
        return new StampMetadata(regexResult[0], range);
    }
}

export enum StampGroup {
    groupA,
    groupB,
}

export class StampMetadata {
    private stampPosition: vscode.Range;
    private stamp: String;
    public group: StampGroup | undefined;
    public decorationType: vscode.TextEditorDecorationType | undefined;

    constructor(stamp: String, range: vscode.Range) {
        this.stampPosition = range;
        this.stamp = stamp;
    }
    
    public get range() : vscode.Range {
        return this.stampPosition;
    }
    
    public get timestamp() : String {
        return this.stamp;
    }
}