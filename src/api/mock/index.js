import axios from '../http'
import MockAdapter from 'axios-mock-adapter'
// 设置模拟调试器实例
const mock = new MockAdapter(axios)
// 模拟任意GET请求到 /users
// reply的参数为 (status, data, headers)
mock.onPost('/api/authenticate').reply(200, {
  'token': 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ6aGFuZ2ppbmdsMDJAZ21haWwuY29tIiwiYXV0aCI6IkFETUlOIiwiZXhwIjoxNTMwNjg0OTg2fQ.mfZwJEEA4PUbfSRPpiUxDZpL3t9BqcuC_5a587eU8o9wQcJHxXWtp2r9_YAIr9VQxMAP1f0TKEFTAsD-6iAlJQ',
  type: 'Bearer'
})
mock.onGet('/api/resources/menus').reply(200, {
  root: [
    {
      data: {
        id: 1,
        name: 'SETTING',
        url: '/settings',
        code: 'app.setting',
        parentId: 0,
        type: 'MENU',
        createAt: '2018-05-03T08:53:35Z',
        createBy: 0,
        extensions: {
          component: 'Layout',
          redirect: '/settings/resources'
        },
        root: true
      },
      children: [
        {
          data: {
            id: 2,
            name: 'setting.resource',
            url: '/settings/resources',
            code: 'app.setting.resource',
            parentId: 1,
            type: 'MENU',
            createAt: '2018-05-03T08:53:52Z',
            createBy: 0,
            extensions: {
              component: 'pages/resource/resourceList',
            },
            root: false
          },
          children: null,
          root: false
        },
        {
          data: {
            id: 3,
            name: 'setting.organization',
            url: '/settings/organizations',
            code: 'app.setting.organization',
            parentId: 1,
            type: 'MENU',
            createAt: '2018-05-03T08:54:31Z',
            createBy: 0,
            extensions: {
              component: 'pages/index',
            },
            root: false
          },
          children: null,
          root: false
        },
      ],
      root: true
    },
    {
      data: {
        id: 5,
        name: 'user',
        url: '/users',
        code: 'app.user',
        parentId: 0,
        type: 'MENU',
        createAt: '2018-05-03T08:55:29Z',
        createBy: 0,
        extensions: null,
        root: true
      },
      children: null,
      root: true
    }
  ]
})
