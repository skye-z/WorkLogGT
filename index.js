const {
    BrowserWindow,
    ipcMain,
    app
} = require('electron')
var Config = require("./package.json");
var MainWindow = null;

app.on('ready', () => {
    MainWindow = new BrowserWindow({
        show: false,
        width: 500,
        height: 500,
        frame: false,
        resizable: false,
        maximizable: false,
        fullscreenable: false,
        title: 'Work Log Generation Tool v' + Config.version,
    });

    MainWindow.loadURL('file://' + __dirname + '/page.html');
    MainWindow.webContents.openDevTools();

    MainWindow.once('ready-to-show', () => {
        MainWindow.show()
    });

    MainWindow.on('closed', () => {
        MainWindow = null;
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin')
        app.quit();
})

ipcMain.on('main-window-close', () => {
    MainWindow.close();
})