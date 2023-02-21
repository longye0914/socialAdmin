import request from '@/utils/request'

export function getCallList(params) {
  return request({
    url: '/call/anthorCalllist',
    method: 'get',
    params
  })
}
