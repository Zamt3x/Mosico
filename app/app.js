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
ipcMain.on('get-storage-file', (e, path) => {
  // storage
  //   .get(path)
  //   .then(data => {
  //     mainWindow.webContents.send('file-request', data);
  //   })
  //   .catch(err => {
  //     console.error(err);
  //   });
});
// Functions that are not listening for events
function setup() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    minWidth: 320,
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
    // createNewUserFiles();
  });
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}
// Creates a new folder in users userData (location varies on every system)
function createNewUserFiles() {
  // Check for directory Mosico
  // storage.isPathExists('mosico').then(itDoes => {
  //   // If path already exists, return from function
  //   if (itDoes) {
  //     return;
  //   }
  //   storage
  //     .set('Mosico/')
  //     .then(() => {
  //       console.log('Successfully written to storage');
  //     })
  //     .catch(err => {
  //       console.error(err);
  //     });
  // });
}
