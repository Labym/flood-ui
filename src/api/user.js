import request from './http'

export const authenticate = (username, password, captcha, rememberMe) => {
  return request({
    url: '/api/authenticate',
    method: 'post',
    data: {username, password, captcha, rememberMe}
  })
}
