const {
  app,
  BrowserWindow,
  Menu,
  ipcMain
} = require('electron')
const Datastore = require('nedb')
const MenuBar = require('./components/MenuBar')

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

  win.loadFile('../view/index.html')

  const menu = Menu.buildFromTemplate(MenuBar)
  Menu.setApplicationMenu(menu)
})

// DB connection
const db = new Datastore({
  filename: './collections/links.db',
  autoload: true
})
// add link
ipcMain.on('addLink', (_, link) => {
  db.insert(link, err => {
    if (err) throw new Error(err)
  })
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
