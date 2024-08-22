/** @format */

const { app, BrowserWindow, Menu, ipcMain } = require('electron');

const url = require('url');
const path = require('path');

const isDev = process.env.NODE_ENV !== 'production';
const isMac = process.platform === 'darwin';

if (isDev) {
	require('electron-reload')(__dirname, {
		electron: path.join(__dirname, './node_modules', '.bin', 'electron'),
	});
}

let mainWindow;

app.on('ready', () => {
	mainWindow = new BrowserWindow({
		width: isDev ? 1000 : 500,
		height: 600,
		icon: `${__dirname}/assets/icon.png`,
		resizable: isDev,
		// frame: false, // Desactiva la barra de título y la barra de menú nativa
		webPreferences: {
			nodeIntegration: true, // Asegúrate de que esto esté habilitado
			contextIsolation: true, // Si estás usando una versión más reciente de Electron
		},
	});
	mainWindow.loadURL(
		url.format({
			pathname: path.join(__dirname, 'src/views/index.html'),
			protocol: 'file',
			slashes: true,
		})
	);
	// Menu
	const mainMenu = Menu.buildFromTemplate(templateMenu);
	// Set The Menu to the Main Window
	Menu.setApplicationMenu(mainMenu);
	Menu.setApplicationMenu(mainMenu);
});

const templateMenu = [
	{
		label: 'File',
		submenu: [
			{
				label: 'New Product',
				accelerator: 'Ctrl+N',
				click() {
					mainWindow.webContents.send('product:new');
				},
			},
			{
				label: 'Remove All Products',
				click() {
					mainWindow.webContents.send('products:remove-all');
				},
			},
			{
				label: 'Exit',
				accelerator: process.platform == 'darwin' ? 'command+Q' : 'Ctrl+Q',
				click() {
					app.quit();
				},
			},
		],
	},
];

// Escuchar el evento en el proceso principal si es necesario
ipcMain.on('product:new', (event) => {
	console.log('Nuevo producto creado');
});
