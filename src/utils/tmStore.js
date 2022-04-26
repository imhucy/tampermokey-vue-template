const store = Vue.observable({})
const api = {
  get(groupName, tableName) {
    let data = store[groupName]
    if (tableName) {
      return data[tableName]
    }
    return data
  },
  set(groupName, tableName, value) {
    Vue.set(store[groupName], tableName, value)
    GM_setValue(groupName, store[groupName])
  },
  add(groupName, tableName, value) {
    if (!store[groupName][tableName]) {
      Vue.set(store[groupName], tableName, [])
    }
    let id = _.max(_.map(store[groupName][tableName], (item) => item.id)) || 0
    id += 1
    store[groupName][tableName].push({ id, ...value })
    GM_setValue(groupName, store[groupName])
  },
  clear(groupName, tableName) {
    if (groupName && tableName) {
      while (store[groupName][tableName].length) {
        store[groupName][tableName].pop()
      }
      GM_setValue(groupName, store[groupName])
    }
  }
}
// GM_setValue('basic', { tasks: [] })
let basic = GM_getValue('basic', { tasks: [] })
let table = GM_getValue('table', {})
let keyValue = GM_getValue('key-value', {})

store.basic = basic
store.table = table
store['key-value'] = keyValue

export default api
