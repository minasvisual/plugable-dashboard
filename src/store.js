import Vue from 'vue'
import Vuex from 'vuex'
import Router from './router'
import { get } from 'lodash'
import { request, getUserData } from './services/models'

Vue.use(Vuex)

const state = {
  sidebarShow: 'responsive',
  sidebarMinimize: true,
  projects:[],
  currentProject: {},
  auth:{}
}

const mutations = {
  toggleSidebarDesktop (state) {
    const sidebarOpened = [true, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarOpened ? false : 'responsive'
  },
  toggleSidebarMobile (state) {
    const sidebarClosed = [false, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarClosed ? true : 'responsive'
  },
  set (state, [variable, value]) {
    return state[variable] = value
  },
  setAuth (state, [session, value]) {
    console.log('setauth called', state.auth[session], value)
    return state.auth[session] = value
  }
}

const getters = {
  logged(state){
    return state.auth
  },
  dashLogged(state){
    return state.auth.dash
  }
}

const actions = {
  login (ctx, { username, password }) {
      return request( 
        process.env.VUE_APP_LOGIN_URL , {
          method: 'POST',
          data: { 
            [process.env.VUE_APP_LOGIN_USER_FIELD]: username, 
            [process.env.VUE_APP_LOGIN_PASS_FIELD]: password
          }
        }
      ).then( data => {
        let token =  get(data, process.env.VUE_APP_LOGIN_TOKEN_PATH, 'access_token' )
        localStorage.setItem('dash_session', token)
        ctx.commit('setAuth', ['dash', { isLogged: true, token }])
        Router.push('/dashboard')
      }).catch( err => {
        alert('Login Error: '+ err.message)
      })
  },
  isLogged(ctx){
    let token = localStorage.getItem('dash_session')
    if( token ){
      return getUserData()
          .then( data => {
              ctx.commit('setAuth', ['dash', {isLogged: true, token, user: data }])
              Router.push('/dashboard')
          })
          .catch(({response, message, statusCode }) => {
            if( statusCode > 400 && statusCoode < 410 )
              ctx.commit('setAuth', ['dash', {isLogged: false}])
              ctx.dispatch('logout')
          })
    }else{
      ctx.commit('setAuth', ['dash', { isLogged: false }])
      ctx.dispatch('logout')
    }
  },
  logout(ctx){
    let token = localStorage.getItem('dash_session')
    if( token ){   
        ctx.commit('setAuth', ['dash', { isLogged: false }]) 
        localStorage.removeItem('dash_session')
        Router.push('/pages/login')
    }
  }
}
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})