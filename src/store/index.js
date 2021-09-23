import Vue from 'vue'
import Vuex from 'vuex'
import {loginOut,whoAmI} from '../api/user'
import {get_access_token} from '../api/get_access_token'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    access: '',
    user:whoAmI(),
    menuRoutes:[]
  },
  mutations: {
    setAccess(state,access){
      state.access = access;
    },
    setUser(state,user){
      state.user = user;
    },
    setMenuRoutes(state,routes){
      state.menuRoutes = routes;
    }
  },
  actions: {
    async accessChange(ctx){
      const access = await get_access_token();
      ctx.commit('setAccess',access.data.access_token)
      console.log(access.data)
    },
    async loginOut(ctx){
      ctx.commit('setUser','');
      loginOut()
    },
    async menuRoutesChange(ctx,routes) {
      ctx.commit('setMenuRoutes',routes)
    }
  },
  modules: {
  }
})
