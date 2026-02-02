const { app, BrowserWindow, Tray, Menu, ipcMain, nativeImage } = require('electron');
const path = require('path');

let tray = null;
let mainWindow = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 380,
    height: 520,
    show: false,
    frame: false,
    resizable: false,
    skipTaskbar: true,
    alwaysOnTop: true,
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
  // Create a simple tray icon (moon/crescent symbol)
  const iconPath = path.join(__dirname, '..', 'assets', 'tray-icon.png');

  // Try to load icon, fall back to default if not exists
  let icon;
  try {
    icon = nativeImage.createFromPath(iconPath);
    if (icon.isEmpty()) {
      // Create a simple colored icon as fallback
      icon = nativeImage.createEmpty();
    }
  } catch (e) {
    icon = nativeImage.createEmpty();
  }

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
