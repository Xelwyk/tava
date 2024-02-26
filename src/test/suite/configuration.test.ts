import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
 import ConfigurationController = require('../../configurator');


suite('Configuration Test Suite', () => {
	vscode.window.showInformationMessage('Start configuration test.');

	test('ConfigurationController set/get test', async () => {
		const configController = new ConfigurationController();
		await configController.setInterval(10000);
		assert.strictEqual(configController.getInterval(), 10000);

		await configController.setInterval(2592000000);
		assert.strictEqual(configController.getInterval(), 2592000000);

		await configController.setInterval(0);
		assert.strictEqual(configController.getInterval(), 0);

		await configController.setInterval(1000);
		let success = await configController.setInterval(-10);
		assert.strictEqual(success, false);
		assert.strictEqual(configController.getInterval(), 1000);

		success = await configController.setInterval(-10.5);
		assert.strictEqual(success, false);
		assert.strictEqual(configController.getInterval(), 1000);

		success = await configController.setInterval(10.5);
		assert.strictEqual(success, false);
		assert.strictEqual(configController.getInterval(), 1000);

		//hex number
		//binary number
		//octal number
	});
});
