const electron = require('electron')
const {ipcMain} = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

let mainWindow;

function createWindow () {
  mainWindow = new BrowserWindow({width: 1024, height: 728, 'minHeight': 350, 'minWidth': 780, show: false, frame: false})
  //mainWindow.maximize();
  mainWindow.setMenu(null);

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })


 mainWindow.webContents.openDevTools()

  mainWindow.on('closed', function () {
    mainWindow = null;
    app.quit();
  })
}


app.on('ready', createWindow);
