export function pad(num, n = 2, fillString = '0') {
  const _num = num.toString()
  if (_num.length < n)
    return fillString.repeat(n - _num.length) + n

  return _num
}
export function fmtDate(date) {
  const d = date instanceof Date ? date : new Date(date)
  return [
    [
      d.getFullYear(),
      pad(d.getMonth() + 1),
      pad(d.getDate()),
    ].join('-'), [
      pad(d.getHours()),
      pad(d.getMinutes()),
      pad(d.getSeconds()),
    ].join(':'),
  ].join(' ')
}

export function loadPages() {
  const pages = require.context('../pages', false, /\.vue$/)
  const pagesKeys = pages.keys()
  const PageComponents = {}
  const pageList = []
  pagesKeys.map(pages).forEach((pageComponent, i) => {
    const PageComponent = pageComponent.default
    const pagePath = pagesKeys[i]
    const temp_1 = pagePath.split('/')
    const filename = temp_1.pop()
    const temp_2 = filename.split('.')
    const componentName = temp_2[0]
    PageComponents[componentName] = PageComponent
    pageList.push({ zhName: PageComponent.zhName, name: componentName })
  })
  return { pageList, PageComponents }
}
