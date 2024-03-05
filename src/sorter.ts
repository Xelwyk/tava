import * as vscode from "vscode";
import { StampMetadata } from "./ranger";

class Sorter {
    /**
     * sort
     */
    public sort(unsorted: Array<StampMetadata | null>) : Array<StampMetadata> {
        let sorted = new Array<StampMetadata>();
        unsorted.forEach((a) => {
            if (a === null) {
                
            }
        });
        unsorted.sort((a, b) => {
            a?.range.start.line.valueOf() - b?.range.start.line.valueOf();
        });
        return sorted;
    }
}

export = Sorter;