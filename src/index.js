const {
  app,
  BrowserWindow,
  Menu,
  ipcMain
} = require('electron')
const Datastore = require('nedb')
const MenuBar = require('./components/MenuBar')
const path = require('path')
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

  win.loadFile(path.join(__dirname, '../view/index.html'))

  const menu = Menu.buildFromTemplate(MenuBar)
  Menu.setApplicationMenu(menu)
})

// DB connection
const db = new Datastore({
  filename: path.join(__dirname, '../collections/links.db'),
  autoload: true
})
// add link
ipcMain.on('addLink', (_, link) => {
  db.insert(link, err => {
    if (err) throw new Error(err)
  })
  win.webContents.send('added', link.link)
})

// Load all links
ipcMain.on('loadAll', () => {
  db.find({}, (err, links) => {
    try {
      if (err) {
        return Error(err)
      }

      if (links !== '') {
        win.webContents.send('loaded', links)
      } else {
        win.webContents.send('loaded', '')
      }
    } catch (error) {
      throw new Error(err)
    }
  })
})

// Deletes all link
ipcMain.on('clearAll', () => {
  db.remove({}, { multi: true }, err => {
    if (err) throw new Error(err)
  })
  win.webContents.send('cleared')
})
// If dev env
// if (!app.isPackaged) {
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
// }
