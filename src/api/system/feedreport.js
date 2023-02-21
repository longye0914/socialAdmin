import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/feedreport/list',
    method: 'get',
    params
  })
}

export function removeReport(id) {
  return request({
    url: '/feedreport/removeReport',
    method: 'delete',
    params: {
      id
    }
  })
}

export function ignoreReport(id) {
  return request({
    url: '/feedreport/ignoreReport',
    method: 'delete',
    params: {
      id
    }
  })
}
