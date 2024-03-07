import * as vscode from "vscode";
import { StampMetadata } from "./ranger";

export class Sorter {
    
    public sort(unsorted: Array<StampMetadata | null>) : Array<StampMetadata> {
        let sorted = new Array<StampMetadata>();
        unsorted.forEach((a) => {
            if (a !== null) {
                sorted.push(a);
            }
        });
        sorted.sort((a, b) => a.range.start.line.valueOf() - b.range.start.line.valueOf());
        return sorted;
    }
}