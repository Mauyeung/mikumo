const electron = require('electron');
const {app, BrowserWindow} = electron;

let mainWindow;

app.on('ready', () => {
	mainWindow = new BrowserWindow({
		height: 900,
		width: 1250,
	});
	mainWindow.loadURL(`file://${__dirname}/build/index.html`);
});