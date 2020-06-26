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

  win.loadFile('./index.html')

  const menu = Menu.buildFromTemplate(MenuBar)
  Menu.setApplicationMenu(menu)
})
