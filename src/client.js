console.log('client.js')

const { ipcRenderer } = require('electron')

const form = document.querySelector('form')
const link = document.querySelector('input')
form.addEventListener('submit', (e) => {
  e.preventDefault()
  ipcRenderer.send('addLink', { link: link.value })
})
