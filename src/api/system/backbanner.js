import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/backbanner/list',
    method: 'get',
    params
  })
}

export function addBanner(params) {
  return request({
    url: '/backbanner/addBanner',
    method: 'post',
    params
  })
}

export function modifyBanner(params) {
  return request({
    url: '/backbanner/modifyBanner',
    method: 'post',
    params
  })
}

export function setBanner(params) {
  return request({
    url: '/backbanner/setBanner',
    method: 'post',
    params
  })
}

export function deleteBanner(id) {
  return request({
    url: '/backbanner/deleteBanner',
    method: 'delete',
    params: {
      id
    }
  })
}

export function uploadImage(data, item) {
  return request({
    url: '/qiniu/image',
    method: 'post',
    Headers: item,
    data: data
  })
}

export function pushUpBanner(id) {
  return request({
    url: '/backbanner/pushUpBanner',
    method: 'post',
    params: {
      id
    }
  })
}

export function pushDownBanner(id) {
  return request({
    url: '/backbanner/pushDownBanner',
    method: 'post',
    params: {
      id
    }
  })
}
