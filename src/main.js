const { app, BrowserWindow, Tray, Menu, ipcMain, nativeImage } = require('electron');
const path = require('path');

let tray = null;
let mainWindow = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 380,
    height: 580,
    minWidth: 320,
    minHeight: 500,
    show: false,
    frame: true,
    resizable: true,
    skipTaskbar: false,
    alwaysOnTop: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  mainWindow.on('blur', () => {
    mainWindow.hide();
  });
}

function createTray() {
  // Create tray icon - use embedded base64 icon for reliability
  // This is a 16x16 green crescent moon icon
  const iconBase64 = 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAABLUlEQVQ4y6WTMUoDQRSGv5ndhGyxYKFgYSEIgo1gYyHYiFh4AG/gBTyBhYXgCTyBIHgAK0ux8QoewEYLixQWFoIgCBYhyc7zN5NVk10Tt/jgMTP/+9+8mXkGOqj7qGz0YMFQFKAD84BFREYxQNY3yXojgKYGwJiIvIjIW1xPKl8r8AhcA5MdADMisioil8CViHyLyFRE3oFb4C6bfq+5QEQ2gbOkP6XBwDqwBmwAp8CXqqaJrgOPqnqfBniLOAZmgAPgWET2RWQFOBKRJVX9VtWXOCaIIRLhF7CiqjtAVUQ2VPVVRFaAQ2BRVT9U9TEJSEsBFoEjEVkDDoF5EdlW1QcRWQaOgTlV/UgCstIA5oADEVkFjoA5EdlS1XsRWQJOgFlVfQG+gJ/BNv4Czt0Ij6M3jlMAAAAASUVORK5CYII=';

  const icon = nativeImage.createFromDataURL(`data:image/png;base64,${iconBase64}`);

  tray = new Tray(icon);
  tray.setToolTip('Takvimi per Evrope');

  tray.on('click', (event, bounds) => {
    if (mainWindow.isVisible()) {
      mainWindow.hide();
    } else {
      const { x, y } = bounds;
      const { width, height } = mainWindow.getBounds();

      // Position window near tray icon
      const yPosition = process.platform === 'darwin' ? y : y - height;
      mainWindow.setBounds({
        x: Math.round(x - width / 2),
        y: Math.round(yPosition),
        width,
        height
      });

      mainWindow.show();
    }
  });

  const contextMenu = Menu.buildFromTemplate([
    { label: 'Hap Takvimin', click: () => mainWindow.show() },
    { type: 'separator' },
    { label: 'Dil', click: () => app.quit() }
  ]);

  tray.setContextMenu(contextMenu);
}

// Update tray tooltip with countdown
ipcMain.on('update-tray', (event, text) => {
  if (tray) {
    tray.setToolTip(text);
  }
});

app.whenReady().then(() => {
  createWindow();
  createTray();
});

app.on('window-all-closed', () => {
  // Keep app running in tray
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
