import Vue from 'vue'
import Vuex from 'vuex'
import Router from './router'
import { get } from 'lodash'
import { request, getUserData, getAuthHeaders } from './services/models'

Vue.use(Vuex)

const state = {
  sidebarShow: 'responsive',
  sidebarMinimize: true,
  projects:[],
  currentProject: {},
  auth:{},
  loading: {},
  cache:{},
  crud:{}
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
  },
  setLoader (state, [session, value]) {
    console.log('setLoader called', session, value)
    return state.loading[session] = value
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
  login (ctx, { username, password, remember }) {
      let headers = process.env.VUE_APP_DEFAULT_HEADERS ? JSON.parse(process.env.VUE_APP_DEFAULT_HEADERS) : {}
      return request( 
        process.env.VUE_APP_LOGIN_URL , {
          method: 'POST',
          data: { 
            [process.env.VUE_APP_LOGIN_USER_FIELD]: username, 
            [process.env.VUE_APP_LOGIN_PASS_FIELD]: password,
            remember
          },
          headers
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
      let headers = getAuthHeaders({ 
        "request_mode": process.env.VUE_APP_LOGIN_TOKEN_MODE || 'header',
        "request_token": process.env.VUE_APP_LOGIN_TOKEN_HEADER || 'access-token',
        "request_token_expression": process.env.VUE_APP_LOGIN_TOKEN_HEADER_EXPRESSION || '{token}', 
      }, token)

      return getUserData({ method: 'get', ...headers })
          .then( data => {
              ctx.commit('setAuth', ['dash', {isLogged: true, token, user: data }])
              if( !window.location.includes('dashboard') ) Router.push('/dashboard')
              return data
          })
          .catch(({response, message, statusCode }) => {
            if( statusCode > 400 && statusCoode < 410 )
              ctx.dispatch('logout')

            return { response, message, statusCode }
          })
    }else{
      ctx.dispatch('logout')
      return Promise.reject({isLogged: false})
    }
  },
  logout(ctx){
    let auth = { isLogged: false }
    let token = localStorage.getItem('dash_session')
    if( token ){   
        localStorage.removeItem('dash_session')
    }
    ctx.commit('setAuth', ['dash', auth]) 
    Router.push('/pages/login')
  },
  requestFail(ctx, { response }){
    let current = ctx.state.currentProject || {}
    console.log('request fail', response)
    if( get(response, 'config.url', '').includes(current.url) ){
      if( response.status == get(current, 'auth.request_expiration_status') || response.data.includes("expired") )
        ctx.dispatch('setAuth', [ current.code, {logged: false} ])
    }
    else if( get(response, 'config.url', '').includes( process.env.VUE_APP_LOGGED_URL ) ){
      ctx.dispatch('logout')
    }

  }
}
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})