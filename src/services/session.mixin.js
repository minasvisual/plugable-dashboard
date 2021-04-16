import { has, get } from 'lodash'
import { interpolate } from './helpers'
import { request } from './models'

export default {
  computed: {
    currentProject(){
      return this.$store.state.currentProject || null
    }, 
    config(){ 
      return this.project.auth || null 
    },
    hasAuth() {
      return has(this.currentProject, 'auth');
    },
    showCrud() {
      return (!this.hasAuth || (this.hasAuth && this.logged))
    },
    logged(){ 
      return get(this.$store, `state.auth.${this.currentProject.code}.logged`, false)
    },
    session(){ 
      return get(this.$store, `state.auth.${this.currentProject.code}`, false)
    }
  },
  methods: {
    authenticate({username, secret, remember}){
      try{
        if( !has(this.config, 'url_login') ) return new Error('url login doest exist');

        return request(this.config.url_login, {
                        method: get(this.config, 'url_method', 'post'),
                        data: {
                          [get(this.config, 'field_username', 'email')]: username,
                          [get(this.config, 'field_secret', 'password')]: secret,
                          [get(this.config, 'field_remember', 'remember')]: remember,
                        },
                        headers:{
                          [get(this.config, 'request_token', 'access-token')]: ''
                        }
                      }, false )
                .then((res) => {
                  let token = this.storageToken(res)
                  let reqAuthData = this.authRequest(token)

                  this.$store.commit('setAuth', [ this.currentProject.code, { request: reqAuthData, logged: true, token }])
                  return res
                })
      }catch(e){
        return new Error(e)
      }
    },
    storageToken({data, headers}){
      let token = null
      if( get(this.config, 'response_mode', 'body') === 'header' ){
        token = headers[ get(this.config, 'response_token', 'access-token') ];
      }else{
        token = get(data, get(this.config, 'response_token', 'access_token'), 'token')
      }

      if( !token ) {
        return new Error ({message: 'token not found', config: this.config, data, headers})
      }

      sessionStorage.setItem(`${this.project.code}_session`, token)
      return token
    },
    isLogged(token){
      try{
        
        if( !has(this.config, 'logged_url') ){
          return Promise.reject({message: 'Logged url not found'})
        }
        
        let reqAuthData = this.authRequest(token)
        let options = { method: 'get',  ...reqAuthData  }

        return request( get(this.config, 'logged_url'), options)
                .then((data) => {
                    let user = this.setUser(data)
                    
                    this.$store.commit('setAuth', [ this.currentProject.code, { user, request: reqAuthData, logged: true, token }])
                    return {token, user, request: reqAuthData }
                })
      }catch(e){
        return Promise.reject({message: e.message})
      }
    },
    authRequest(token){
      let tokenRequest = get(this.config, 'request_token_expression', '{token}')
      if( get(this.config, 'request_mode', 'header') == 'query' )
        return { 
          params:{
              [get(this.config, 'request_token', 'access-token')] : interpolate(tokenRequest, {token})
          }
        } 
      else 
        return {
          headers:{
            [get(this.config, 'request_token', 'access-token')] : interpolate(tokenRequest, {token})
          }
        }
    },
    setUser(data){
      if( !has(this.config, 'logged_model') ) return {};

      let { id, name, username, role } = get(this.config, 'logged_model')
      let user = {
        "id": get(data, id, "id"),
        "name": get(data, name, "name"),
        "username": get(data, username, "email"),
        "role": get(data, role, "level")
      }

      return user;
    }
  },
};