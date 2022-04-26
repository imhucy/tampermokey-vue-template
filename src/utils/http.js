// GM_xmlhttpRequest
// method one of GET, HEAD, POST
// url the destination URL
// headers ie. user-agent, referer, ... (some special headers are not supported by Safari and Android browsers)
// data some string to send via a POST request
// cookie a cookie to be patched into the sent cookie set
// binary send the data string in binary mode
// nocache don't cache the resource
// revalidate revalidate maybe cached content
// timeout a timeout in ms
// context a property which will be added to the response object
// responseType one of arraybuffer, blob, json
// overrideMimeType a MIME type for the request
// anonymous don't send cookies with the requests (please see the fetch notes)
// fetch (beta) use a fetch instead of a xhr request
// (at Chrome this causes xhr.abort, details.timeout and xhr.onprogress to not work and makes xhr.onreadystatechange receive only readyState 4 events)
// username a username for authentication
// password a password
// onabort callback to be executed if the request was aborted
// onerror callback to be executed if the request ended up with an error
// onloadstart callback to be executed if the request started to load
// onprogress callback to be executed if the request made some progress
// onreadystatechange callback to be executed if the request's ready state changed
// ontimeout callback to be executed if the request failed due to a timeout
// onload callback to be executed if the request was loaded.
// It gets one argument with the following attributes:
// finalUrl - the final URL after all redirects from where the data was loaded
// readyState - the ready state
// status - the request status
// statusText - the request status text
// responseHeaders - the request response headers
// response - the response data as object if details.responseType was set
// responseXML - the response data as XML document
// responseText - the response data as plain string
// Returns an object with the following property:
// abort - function to be called to cancel this request

// Note: the synchronous flag at details is not supported

// Important: if you want to use this method then please also check the documentation about @connect.
import qs from 'qs'
const http = {
  get(url, params = {}, config) {
    return new Promise((resolve, reject) => {
      const query = qs.stringify(params)
      const detail = {
        url: `${url}?${query}`,
        method: 'GET',
        // timeout a timeout in ms
        timeout: 60000,
        nocache: true,
        // responseType one of arraybuffer, blob, json
        onloadstart(...args) {
          console.log('onloadstart', args)
        },
        onreadystatechange(a, ...args) {
          console.log('onreadystatechange', a)
          console.log('onreadystatechange', args)
        },
        onprogress(detail) {
          console.log('onprogress', detail)
        },
        ontimeout() {
          reject(new Error('请求超时'))
        },
        onerror(err) {
          console.log('onerror', err)
          reject(err)
        },
        onload(response) {
          // finalUrl - 最终地址, 在数据载入后重定向的最后地址
          // readyState - the ready state
          // status - the request status
          // statusText - the request status text
          // responseHeaders - the request response headers
          // response - the response data as object if details.responseType was set
          // responseXML - the response data as XML document
          // responseText - the response data as plain string
          console.log('onload', response)
          resolve(response.responseText || response.response || response.responseXML)
        },
        ...config,
      }
      GM_xmlhttpRequest(detail)
    })
  },
  download(url, name, config) {
    return new Promise((resolve, reject) => {
      GM_download({
        saveAs: false,
        url,
        name,
        ...config,
        onprogress(res) {
          console.log('onprogress', res)
          const percent1 = (res.done / res.total) * 100
          const percent2 = (res.loaded / res.total) * 100
          const percent3 = (res.position / res.total) * 100
          console.log('done', percent1.toFixed(2))
          console.log('loaded', percent2.toFixed(2))
          console.log('position', percent3.toFixed(2))
        },
        onerror(err) {
          reject(err)
        },
        ontimeout() {
          reject(new Error('请求超时'))
        },
        onload(res) {
          resolve(res)
        },
      })
    })
  },
}
export default http
export function install() {
  Vue.prototype.$http = http
}
