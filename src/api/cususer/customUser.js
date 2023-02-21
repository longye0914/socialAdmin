import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/shop/user/list',
    method: 'get',
    params
  })
}

export function getRegList(params) {
  return request({
    url: '/shop/user/reglist',
    method: 'get',
    params
  })
}

export function modifyUserinfo(params) {
  return request({
    url: '/shop/user/modifyUserinfo',
    method: 'post',
    params
  })
}

// export function remove(id) {
//   return request({
//     url: '/shop/user',
//     method: 'delete',
//     params: {
//       id: id
//     }
//   })
// }

export function getUserInfo(id) {
  return request({
    url: '/shop/user/getUserInfo',
    method: 'get',
    params: {
      id: id
    }
  })
}

export function getCustomDatelist(params) {
  return request({
    url: '/shop/user/getCustomDatelist',
    method: 'get',
    params
  })
}

export function hiddenUser(id) {
  return request({
    url: '/shop/user/hiddenUser',
    method: 'delete',
    params: {
      id: id
    }
  })
}

export function cancelHiddenUser(id) {
  return request({
    url: '/shop/user/cancelHiddenUser',
    method: 'delete',
    params: {
      id: id
    }
  })
}

export function hiddenUserOrder(id) {
  return request({
    url: '/shop/user/hiddenUserOrder',
    method: 'delete',
    params: {
      id: id
    }
  })
}

export function cancelHiddenUserOrder(id) {
  return request({
    url: '/shop/user/cancelHiddenUserOrder',
    method: 'delete',
    params: {
      id: id
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

export function addUser(params) {
  return request({
    url: '/shop/user/addUser',
    method: 'post',
    params
  })
}

export function addUserVoices(params) {
  return request({
    url: '/shop/user/addUserVoices',
    method: 'post',
    params
  })
}

export function addUserPictures(params) {
  return request({
    url: '/shop/user/addUserPictures',
    method: 'post',
    params
  })
}

export function modifyMainUser(id) {
  return request({
    url: '/shop/user/modifyMainUser',
    method: 'post',
    params: {
      id
    }
  })
}

export function removeMainUser(id) {
  return request({
    url: '/shop/user/removeMainUser',
    method: 'post',
    params: {
      id
    }
  })
}

export function modifyThresholdUser(id) {
  return request({
    url: '/shop/user/modifyThresholdUser',
    method: 'post',
    params: {
      id
    }
  })
}

export function removeThresholdUser(id) {
  return request({
    url: '/shop/user/removeThresholdUser',
    method: 'post',
    params: {
      id
    }
  })
}

export function getMainRecommendUser(params) {
  return request({
    url: '/shop/user/getMainRecommendUser',
    method: 'get',
    params
  })
}

export function getThresholdRealUser(params) {
  return request({
    url: '/shop/user/getThresholdRealUser',
    method: 'get',
    params
  })
}

export function getThresholdRebotUser(params) {
  return request({
    url: '/shop/user/getThresholdRebotUser',
    method: 'get',
    params
  })
}

export function getConfigMainUser(keyVal) {
  return request({
    url: '/shop/user/getConfigMainUser',
    method: 'get',
    params: {
      keyVal
    }
  })
}

export function getConfigRobotUser(id) {
  return request({
    url: '/shop/user/getConfigRobotUser',
    method: 'get',
    params: {
      id
    }
  })
}

export function getUserDealDetail(user_id) {
  return request({
    url: '/shop/user/getUserDealDetail',
    method: 'get',
    params: {
      user_id
    }
  })
}

export function getUserVoicelist(user_id) {
  return request({
    url: '/shop/user/getUserVoicelist',
    method: 'get',
    params: {
      user_id
    }
  })
}

export function getUserPicturelist(user_id) {
  return request({
    url: '/shop/user/getUserPicturelist',
    method: 'get',
    params: {
      user_id
    }
  })
}

export function modifyUserBaseinfo(params) {
  return request({
    url: '/shop/user/modifyUserBaseinfo',
    method: 'post',
    params
  })
}

export function modifyUserSetinfo(params) {
  return request({
    url: '/shop/user/modifyUserSetinfo',
    method: 'post',
    params
  })
}
