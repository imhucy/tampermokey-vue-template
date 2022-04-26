import App from './views/App.vue'
import components from './components'
import './scss/index.scss'
GM_addStyle(require('./scss/index.scss').default.toString())
$('<div id="tampermokey-app"></div>').appendTo($('body'))
Vue.use(components)
new Vue({
  el: '#tampermokey-app',
  render: h => h(App),
})

if (process.env.NODE_ENV === 'development') {
  let ws = new WebSocket('ws://localhost:8888')
  ws.onmessage = function (e) {
    const a = e.data
    if (a === 'reload')
      location.reload()
  }
  ws.onclose = function () {
    ws = null
    setTimeout(() => {
      console.log('重连 hot update websocket')
      ws = new WebSocket('ws://localhost:8888')
    }, 3000)
  }
  setInterval(
    () => { ws && ws.send('h') },
    3000,
  )
}
