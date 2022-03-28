import * as vscode from "vscode";

class ConfigurationController {
    private configuration: vscode.WorkspaceConfiguration;
    private targetInterval: Number;
    
    constructor() {
        this.configuration = vscode.workspace.getConfiguration("tava");
        this.targetInterval = this.configuration.get("targetInterval") || 60000;
    }

    public setInterval(interval: Number) {
        this.configuration.update("targetInterval", interval, true);
    }

    public interval(): Number {
        return this.targetInterval;
    }
}

export = ConfigurationController;