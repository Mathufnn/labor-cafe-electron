import { app, BrowserWindow, ipcMain, dialog } from 'electron'
import fs from 'fs'

/**
* Set `__static` path to static files in production
* https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
*/
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
? `http://localhost:9080`
: `file://${__dirname}/index.html`

function createWindow () {
  /**
  * Initial window options
  */
  mainWindow = new BrowserWindow({
    height: 650,
    useContentSize: true,
    width: 1324,
    'minHeight': 550,
    'minWidth': 900
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
* Auto Updater
*
* Uncomment the following code below and install `electron-updater` to
* support auto updating. Code Signing with a valid certificate is required.
* https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
*/

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
autoUpdater.quitAndInstall()
})

app.on('ready', () => {
if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
*/

let __PRINT_WINDOW__;

ipcMain.on('print-pdf', (event, arg) => {
  if(typeof __PRINT_WINDOW__ !== "undefined" && __PRINT_WINDOW__ !== null) __PRINT_WINDOW__.close();

  __PRINT_WINDOW__ = new BrowserWindow({show: false});

  __PRINT_WINDOW__.setMenu(null);
  __PRINT_WINDOW__.loadURL("data:text/html;charset=utf-8," + encodeURI(arg));

  __PRINT_WINDOW__.once('ready-to-show', () => {
    //__PRINT_WINDOW__.show();
    dialog.showSaveDialog({title: 'Selecione local para salvar o arquivo pdf',filters:[{name: 'Arquivo PDF', extensions: ['pdf']}]}, (filename) => {
      if(typeof filename == 'undefined') return;
      __PRINT_WINDOW__.webContents.printToPDF({}, (error, data) => {
        if (error) dialog.showErrorBox('Erro ao gravar o arquivo!', 'Não foi possível criar o arquivo no local.');
        fs.writeFile(filename, data, (error) => {
          if (error)  dialog.showErrorBox('Erro ao gravar o arquivo!', 'Não foi possível criar o arquivo no local.');
          dialog.showMessageBox({type:'info', title:'Arquivo pdf criado com sucesso!', message: 'O arquivo pdf foi salvo no local escolhido com sucesso!'});
          __PRINT_WINDOW__.close();
        })
      });
    });
  })

  __PRINT_WINDOW__.on('closed', () => {
    __PRINT_WINDOW__ = null;
  });

});
