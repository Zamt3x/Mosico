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
// Functions that are not listening for events
function setup() {
  let obj = getWindowBounds();
  mainWindow = new BrowserWindow({
    show: false,
    minWidth: 320,
    minHeight: 150,
    width: obj.width,
    height: obj.height,
    backgroundColor: '#151515',
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
  const screenSize = electron.screen.getPrimaryDisplay().size;
  const dataPath = app.getPath('userData');
  if (fs.existsSync(dataPath + '/data')) {
    // If user settings exists, use daved dimensions
    const settingsFile = fs.readFileSync(dataPath + '/data/user-settings.json', 'utf8');
    if (settingsFile) {
      // Parse file as JSON and use dimensions stored in winBounds
      return JSON.parse(settingsFile).winBounds;
    } else {
      // Make new settings file, but not directory
      makeUserSettings(dataPath, screenSize, false);
    }
  } else {
    makeUserSettings(dataPath, screenSize, true);
  }
  // Return 'size' object containing width and height of screen
  return { width: screenSize.width - 200, height: screenSize.height - 100 };
}
// Takes path to users appData-folder and bool to determine if dir 'data' should
// be made (might already exist)
function makeUserSettings(dataPath, screenSize, makedir) {
  // Make a new direcotry 'data'
  if (makedir) {
    fs.mkdirSync(path.join(dataPath, 'data'));
  }
  // Make a new file in directory 'data' called 'settings.json' which contains the
  // object 'winBounds' with window dimensions
  const content = `{"winBounds": {"width": ${screenSize.width - 200},"height":${screenSize.height - 100}}}`;
  fs.writeFileSync(dataPath + '/data/user-settings.json', content);
}
