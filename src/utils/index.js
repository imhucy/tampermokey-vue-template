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
