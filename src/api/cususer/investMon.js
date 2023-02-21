import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/investmon/list',
    method: 'get',
    params
  })
}
