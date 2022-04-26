const common = require.context('./', true, /\.(js|vue)$/)
const keys = common.keys()

export default {
  install(Vue) {
    keys.map(common).forEach((common, i) => {
      const Component = common.default
      const filename = keys[i].split('/')[1].split('.')[0]
      if (filename !== 'index')
        Vue.component(filename, Component)
    })
  },
}
