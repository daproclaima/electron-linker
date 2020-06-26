const MenuBar = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Delete everything',
        click (_, win) {
          win.webContents.send('clearAll')
        }
      },
      {
        label: 'Exit',
        accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
        click (_, win) {
          win.close()
        }
      }
    ]
  }
]
module.exports = MenuBar
