import * as vscode from "vscode";
import { StampGroup, StampMetadata } from "./ranger";

export class Grouper {
    public group(stamps: Array<StampMetadata>, interval: Number) {
        stamps[0].group = StampGroup.groupA;
        let selectedGroup = StampGroup.groupA;

        for (let i = 1; i < stamps.length; i++) {
            let previousDate = Date.parse(stamps[i-1].timestamp.toString());
            let currentDate = Date.parse(stamps[i].timestamp.toString());
            if (Math.abs(previousDate-currentDate) > interval.valueOf()) {
                if (selectedGroup === StampGroup.groupA) {
                    selectedGroup = StampGroup.groupB;
                } else {
                    selectedGroup = StampGroup.groupA;
                }
            }
            stamps[i].group = selectedGroup;
        }
    }
}