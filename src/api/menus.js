import request from './http'

export const currentUserMenus = () => {
  return request({
    url: '/api/resources/menus',
    method: 'get'
  })
}
