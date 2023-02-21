import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/officenotice/list',
    method: 'get',
    params
  })
}

export function addOfficeNotice(params) {
  return request({
    url: '/officenotice/addOfficeNotice',
    method: 'post',
    params
  })
}

export function modifyOfficeNotice(params) {
  return request({
    url: '/officenotice/modifyOfficeNotice',
    method: 'post',
    params
  })
}

export function deleteChatWords(id) {
  return request({
    url: '/officenotice/deleteChatWords',
    method: 'delete',
    params: {
      id
    }
  })
}
