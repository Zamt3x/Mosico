import fs from 'fs';
import path from 'path';
import electron from 'electron';
import { app, BrowserWindow, ipcMain } from 'electron';
// Keep a global reference of the window object, omission leads to the window
// closing automatically when the JavaScript object is garbage collected
let mainWindow = null;
/* This method will be called when Electron has finished initialization and is
 * ready to create browser windows. Some APIs can only be used after this event
 * occurs */
app.on('ready', setup);
// Quit when all windows are closed
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar to stay active
  // until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
// On macOS it's common to re-create a window in the app when the dock icon
// is clicked and there are no other windows open
app.on('activate', () => {
  if (!mainWindow) {
    setup();
  }
});
// ipcMain-events coming from renderer
// ipcMain.on('get-storage-file', (e, fileName) => {
//   const dataPath = app.getPath('userData');
//   const filePath = path.join(dataPath, 'data/' + fileName + '.json');
//   try {
//     const file = fs.readFileSync(filePath, 'utf8');
//     if (file) {
//       mainWindow.webContents.send('file-request', JSON.parse(file));
//     } else {
//       mainWindow.webContents.send('file-request', null);
//     }
//   } catch (err) {
//     // If there was some kind of error, return the passed in defaults instead
//     console.error(err, ' NO-FILE-FOUND');
//   }
// });
// Functions that are not listening for events
function setup() {
  let obj = getWindowBounds();
  mainWindow = new BrowserWindow({
    show: false,
    minWidth: 320,
    minHeight: 150,
    width: obj.width,
    height: obj.height,
    backgroundColor: '#111',
    title: 'Mosico - Just play your music'
  });
  mainWindow.loadURL(`file://${__dirname}/index.html`);
  // mainWindow initialized to show: false to avoid showing window before
  // content has loaded
  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}
// Attempts to get window bounds saved in user-settings. If the user is new, file
// with default values will be made
function getWindowBounds() {
  const dataPath = app.getPath('userData');
  if (fs.existsSync(dataPath + '/data')) {
    // If user settings exists, use daved dimensions
    const settingsFile = fs.readFileSync(dataPath + '/data/user-settings.json', 'utf8');
    // Parse file as JSON and use dimensions stored in winBounds
    return JSON.parse(settingsFile).winBounds;
  } else {
    const screenSize = electron.screen.getPrimaryDisplay().size;
    // Make a new direcotry called 'data'
    fs.mkdirSync(path.join(dataPath, 'data'));
    // Make a new file in folder 'data' called 'settings.json' which contains
    // the object 'winBounds' with window dimensions
    const content = `{"winBounds": {"width": ${screenSize.width - 200},"height":${screenSize.height - 100}}}`;
    fs.writeFileSync(dataPath + '/data/user-settings.json', content);
    // Return 'size' object containing width and height of screen
    return { width: screenSize.width - 200, height: screenSize.height - 100 };
  }
}
