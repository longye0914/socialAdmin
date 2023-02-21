import { listForRouter } from '@/api/system/menu'
import { traverseRoutes } from '@/utils/route'
import { constantRoutes } from '@/router'
const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {

  getSideMenus({ commit, state }) {
    return new Promise((resolve, reject) => {
      listForRouter().then(response => {
        // debugger
        const menus = response.data
        const remoteroutes = traverseRoutes(menus)
        commit('SET_ROUTES', remoteroutes)
        resolve(remoteroutes)
      }).catch(error => {
        reject(error)
      })
      // getUserInfo().then(response => {
      //   const roleList = response.data.roleList
      //   // const remoteroutes = traverseRoutes(menus)
      //   commit('SET_ROLES', roleList)
      // }).catch(error => {
      //   reject(error)
      // })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
