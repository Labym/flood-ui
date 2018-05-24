/* eslint-disable */

let baseUrl = ''
let iconfontVersion = ['567566_r22zi6t8noas8aor', '599693_0b5sleso3f1j1yvi']
let iconfontUrl = `//at.alicdn.com/t/font_$key.css`
let codeUrl = `/admin/code`
if (process.env.NODE_ENV == 'development') {
  baseUrl = `http://127.0.0.1:8088/`
} else if (process.env.NODE_ENV == 'production') {
  baseUrl = `http://218.70.11.118`
}

export {
  baseUrl,
  iconfontUrl,
  iconfontVersion,
  codeUrl
}
