import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import { ConfigurationController } from '../../configurator';


suite('Configuration Test Suite', () => {
	//TODO: remove
	return;
	vscode.window.showInformationMessage('Start configuration tests.');

	test('ConfigurationController correct interval test', async () => {
		const configController = new ConfigurationController();
		let success = await configController.setInterval(10000);
		assert.strictEqual(success, true);
		assert.strictEqual(configController.getInterval(), 10000);

		success = await configController.setInterval(2592000000);
		assert.strictEqual(success, true);
		assert.strictEqual(configController.getInterval(), 2592000000);

		success = await configController.setInterval(0);
		assert.strictEqual(success, true);
		assert.strictEqual(configController.getInterval(), 0);

		success = await configController.setInterval(-0);
		assert.strictEqual(success, true);
		assert.strictEqual(configController.getInterval(), 0);

		success = await configController.setInterval(0xC350); // 50s
		assert.strictEqual(success, true);
		assert.strictEqual(configController.getInterval(), 50000);

		success = await configController.setInterval(0b00011000011010100000); // 100s
		assert.strictEqual(success, true);
		assert.strictEqual(configController.getInterval(), 100000);

		success = await configController.setInterval(0o234200); // 80s
		assert.strictEqual(success, true);
		assert.strictEqual(configController.getInterval(), 80000);
	});
	test('ConfigurationController incorrect interval test', async () => {
		const configController = new ConfigurationController();
		let success = await configController.setInterval(1000);

		success = await configController.setInterval(-10);
		assert.strictEqual(success, false);
		assert.strictEqual(configController.getInterval(), 1000);

		success = await configController.setInterval(-10.5);
		assert.strictEqual(success, false);
		assert.strictEqual(configController.getInterval(), 1000);

		success = await configController.setInterval(10.5);
		assert.strictEqual(success, false);
		assert.strictEqual(configController.getInterval(), 1000);
	});
});
