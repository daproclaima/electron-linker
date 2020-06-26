console.log('client.js')

const { ipcRenderer } = require('electron')

const form = document.querySelector('form')
const link = document.querySelector('input')
const list = document.querySelector('ul')

const render = (link) => {
  // console.log('log de link')
  // console.log(link)
  const li = document.createElement('li')
  li.className ='menu-item'
  const linkTag = document.createElement('a')
  linkTag.setAttribute('href', link)
  linkTag.innerHTML = link

  li.appendChild(linkTag)
  list.appendChild(li)

  form.reset()
}

window.addEventListener('load', () => {
  ipcRenderer.send('loadAll', { link: link.value })
})

ipcRenderer.on('loaded', (e, links) => {
  links.forEach(({ link })=> render(link))
})

form.addEventListener('submit', (e) => {
  e.preventDefault()
  ipcRenderer.send('addLink', { link: link.value })
})
ipcRenderer.on('added', (_, link) => render(link))
