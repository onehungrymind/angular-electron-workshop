const electron = require('electron')
const { Menu, Tray, globalShortcut, ipcMain, dialog } = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')
const fs = require('fs')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 1200, height: 900})

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
let tray = null;
app.on('ready', () => {
  // Use the Tray module to put the app in the system tray
  // Use the iconPath to create the image that should be used in the tray
  // The tray context menu should have a single control which quits the app
  let iconPath = path.join(__dirname, 'assets/camera.png')
  
})

app.on('ready', () => {
  // Register a globalShortcut (accelerator) so the user
  // can use a quick key to copy the image. When the quick key
  // is selected, send a message to the renderer process
  

  // use the .on method to listen for a saved file
  // message from the SelfieComponent and show a save dialog
  // when the message is received. After a name is given to the
  // image, write the image file to disk using fs

  ipcMain.on('save-file', (event, image) => {
    
  })
})
