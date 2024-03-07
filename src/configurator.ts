import * as vscode from "vscode";

export class ConfigurationController {
    
    private configuration: vscode.WorkspaceConfiguration;
    
    constructor() {
        this.configuration = vscode.workspace.getConfiguration("tava");
    }

    public async setInterval(interval: Number) {
        let result = false;
        if (interval.valueOf() < 0 || !Number.isInteger(interval) || Number.isNaN(interval)) {
            return result;
        }
        await this.configuration.update("targetInterval", interval, true).then(
            (() => result = true),
            (() => result = false)
        );
        return result;
    }

    public getInterval(): Number {
        this.configuration = vscode.workspace.getConfiguration("tava");
        let interval = this.configuration.get<Number>("targetInterval");
        if (interval === undefined || interval === null) {
            this.setInterval(60000);
            interval = 60000;
        }
        return interval;
    }
}