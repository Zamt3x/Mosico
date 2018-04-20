import { app, BrowserWindow } from 'electron';
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
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    minWidth: 300,
    minHeight: 150,
    backgroundColor: '#111',
    title: 'Mosico - Just play your music'
  });
  mainWindow.loadURL(`file://${__dirname}/index.html`);
  // mainWindow initialized to show: false to avoid showing window before
  // content has loaded
  mainWindow.on('ready-to-show', () => {
    mainWindow.maximize();
    mainWindow.show();
  });
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}
