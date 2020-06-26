const MenuBar = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Delete everything'
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
