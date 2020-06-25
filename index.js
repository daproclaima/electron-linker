const {
  app,
  BrowserWindow
} = require('electron')
let win

app.on('ready', () => {
  win = new BrowserWindow({
    width: 1080,
    height: 720,
    webPreferences: {
      nodeIntegration: true
    }
  })
  win.loadFile('./index.html')

  win.on('close', () => { app.quit() })
  return win
})
