const { app, BrowserWindow } = require('electron');

// Force la désactivation du GPU pour éviter la page blanche sous Windows 8.0
app.commandLine.appendSwitch('disable-gpu');

let splashWindow;
let mainWindow;

function createWindows() {
    // 1. Fenêtre du Splash Screen
    splashWindow = new BrowserWindow({
        width: 360,
        height: 460,
        frame: false,
        backgroundColor: '#0c0d12',
        resizable: false,
        center: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    splashWindow.loadFile('splash.html');

    // 2. Fenêtre principale du Launcher (masquée au démarrage)
    mainWindow = new BrowserWindow({
        width: 1100,
        height: 650,
        show: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    mainWindow.loadFile('index.html');

    // Transition : quand le launcher est prêt, on ferme le splash screen et on l'affiche
    mainWindow.once('ready-to-show', () => {
        setTimeout(() => {
            if (splashWindow && !splashWindow.isDestroyed()) {
                splashWindow.close();
            }
            mainWindow.show();
        }, 1500);
    });
}

app.whenReady().then(createWindows);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
