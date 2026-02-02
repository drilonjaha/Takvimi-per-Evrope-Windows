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
  // Load tray icon from file - check both dev and production paths
  let iconPath = path.join(__dirname, '..', 'assets', 'tray-icon.png');

  // In production, assets are in extraResources
  if (!require('fs').existsSync(iconPath)) {
    iconPath = path.join(process.resourcesPath, 'assets', 'tray-icon.png');
  }

  const icon = nativeImage.createFromPath(iconPath);

  // Resize for Windows tray (16x16 works best)
  const resizedIcon = icon.resize({ width: 16, height: 16 });

  tray = new Tray(resizedIcon);
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
