<template >
    <div >
      <h3 v-if="!loading" class="text-center">Authenticating...</h3>
      <FormulateForm 
        v-else
        v-model="model"
        @submit="authenticate"
        #default="{ hasErrors }"
      >

        <h4 class="text-center">Project Authentication</h4>
        
        <FormulateInput type="text" name="username" /> 

        <FormulateInput type="text" name="secret" /> 

        <FormulateInput type="checkbox" name="remember" label="remember" /> 

        <div class="action-buttons mt-3">
          <CButton
              type="button"
              color="danger"
              class="mr-2"
              @click="$emit('close', { refresh: false })"
            >
                Cancel
          </CButton>
          <CButton
              type="submit"
              color="success"
              :disabled="hasErrors"
            >
                Save
          </CButton>
        </div>
    </FormulateForm>
    </div>
</template>

<script>
import { has, get } from 'lodash'
import { interpolate } from '../../services/helpers'
import { request } from '../../services/models'
export default {
  props:{
      project:{
        type: Object,
        default: {}
      }
  },
  data(){return{
    loading: false,
    model: {}
  }},
  computed:{
    config(){ return this.project.auth || null },
  },
  methods:{
    authenticate({username, secret, remember}){
      try{
        if( !has(this.config, 'url_login') ) return false;

        this.loading = true;
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
        }, false)
        .then(this.success)
        .catch(this.error)
      }catch(e){
        this.error(e)
        this.loading = false;
      }
    },
    success({ data, headers }){
        let token = null
        if( get(this.config, 'response_mode', 'body') === 'header' ){
          token = headers[ get(this.config, 'response_token', 'access-token') ];
        }else{
          token = get(data, get(this.config, 'response_token', 'access_token'), 'token')
        }

        if( !token ) {
          this.loading = false;
          return this.$emit('auth:failed', {message: 'token not found', config, data, headers})
        }

        sessionStorage.setItem(`${this.project.code}_session`, token)
        this.logged(token)
    },
    error({ response, message }){
      console.log('Auth Error', message, response.data)
      this.loading = false;
      
      this.$emit('auth:failed', {message})
    },
    logged(token){
      try{
        if( !has(this.config, 'logged_url') ){
          this.loading = false;
          return this.$emit('auth:failed', {message: 'Logged url not found', config})
        }
        
        let reqAuthData = this.authRequest(token)
        let options = { method: 'get',  ...reqAuthData  }

        return request( get(this.config, 'logged_url'), options)
                .then((data) => {
                    let user = this.setUser(data)
                    this.loading = false;
                    this.$emit('auth:logged', {token, user, authRequest: reqAuthData })
                })
      }catch(e){
        this.loading = false;
        return this.$emit('auth:failed', {message: e.message})
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

        this.$store.commit('set', ['currentProject', {...this.project, user }])

        return user;
    }
  },
  mounted(){
    try{
      let token = sessionStorage.getItem(`${this.project.code}_session`)

      if( token && has(this.project, 'user') )
        this.$emit('auth:logged', {token, user: get(this.project, 'user'), authRequest: this.authRequest(token) })
      else if( token )
        this.logged(token)
    }catch(e){
        this.$emit('auth:failed', e)
    } 
  }
}
</script>