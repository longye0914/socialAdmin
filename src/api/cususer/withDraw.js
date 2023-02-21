import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/withdraw/list',
    method: 'get',
    params
  })
}

export function passWithDrawItem(id) {
  return request({
    url: '/withdraw/passWithDrawItem',
    method: 'post',
    params: {
      id: id
    }
  })
}

export function mulpassWithDraw(ids) {
  return request({
    url: '/withdraw/mulpassWithDraw',
    method: 'post',
    params: {
      ids: ids
    }
  })
}

export function refuseWithDrawItem(params) {
  return request({
    url: '/withdraw/refuseWithDrawItem',
    method: 'post',
    params
  })
}

export function passWithDrawItemWechat(id) {
  return request({
    url: '/withdraw/passWithDrawItemWechat',
    method: 'post',
    params: {
      id: id
    }
  })
}

export function mulpassWithDrawWechat(ids) {
  return request({
    url: '/withdraw/mulpassWithDrawWechat',
    method: 'post',
    params: {
      ids: ids
    }
  })
}

export function refuseWithDrawItemWechat(params) {
  return request({
    url: '/withdraw/refuseWithDrawItemWechat',
    method: 'post',
    params
  })
}
