import * as vscode from 'vscode';
export class Ranger {
    constructor() {}
    
    public findStamps(input: String): Map<Number, StampMetadata> {
        let foundStamps = new Map<Number, StampMetadata>();
        input.split("\n").forEach((line, lineIndex) => {
            let stamp = this.findSingleStamp(line, lineIndex);
            if (stamp !== null) {
                foundStamps.set(lineIndex, stamp);
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
            new vscode.Position(lineIndex.valueOf(), regexResult.index + (regexResult[0].length-1))
        );
        return new StampMetadata(range);
    }
}

export class StampMetadata {
    private stampPosition: vscode.Range;

    constructor(range: vscode.Range) {
        this.stampPosition = range;
    }
    
    public get range() : vscode.Range {
        return this.stampPosition;
    }
    
    
}