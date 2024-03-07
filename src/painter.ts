import * as vscode from "vscode";
import { StampGroup, StampMetadata } from "./ranger";

export class Painter {
    private decoration1;
    private decoration2;
    constructor() {
        this.decoration1 = vscode.window.createTextEditorDecorationType({
            backgroundColor: "#ffc20080",
            color: "#000000"
        });
        this.decoration2 = vscode.window.createTextEditorDecorationType({
            backgroundColor: "#0078ff80",
            color: "#ffffff"
        });    
    }

    /**
     * prepare
     */
    public prepareTextDecoration(stamps: Array<StampMetadata>) {
        let colorMapping: Map<StampGroup, vscode.TextEditorDecorationType> = new Map;
        colorMapping.set(StampGroup.groupA, this.decoration1);
        colorMapping.set(StampGroup.groupB, this.decoration2);

        stamps.forEach((stamp) => {
            if (stamp.group !== undefined) {
                stamp.decorationType = colorMapping.get(stamp.group);
            }
        });
    }
}