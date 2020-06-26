const {
  app,
  BrowserWindow,
  Menu
} = require('electron')
const MenuBar = require('./src/components/MenuBar')

let win

app.on('ready', () => {
  win = new BrowserWindow({
    width: 1080,
    height: 720,
    webPreferences: {
      nodeIntegration: true
    }
  })
  win.on('close', () => { app.quit() })

  win.loadFile('./view/index.html')

  const menu = Menu.buildFromTemplate(MenuBar)
  Menu.setApplicationMenu(menu)
})

// If dev env
if (!app.isPackaged) {
  MenuBar.push({
    label: 'Dev Tools',
    submenu: [
      {
        role: 'reload',
        label: 'Recharger'
      },
      {
        label: 'Show Dev Tools',
        accelerator: process.platform === 'darwin' ? 'F12' : 'F12',
        click (_, win) {
          win.toggleDevTools()
        }
      }
    ]

  })
}
