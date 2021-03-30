<template >
  <section class="crud-wrapper" >
    <slot v-if="login" v-bind:schema="schema">
      vazio
    </slot>
    <div  v-else class="col-12 col-md-4 offset-md-4">
        <h3 v-if="loading" class="text-center">Authenticating...</h3>
        <FormulateForm 
          v-else
          v-model="model"
          @submit="doAuth"
          #default="{ hasErrors }"
        >

          <h4 class="text-center">Project Authentication</h4>
          
          <FormulateInput type="text" name="username" placeholder="Username" /> 

          <FormulateInput type="text" name="secret"  placeholder="Password" /> 

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

  </section>
</template>

<script>
import { has, get } from 'lodash'
import SessionMixin from '../../services/session.mixin'

export default {
  mixins:[SessionMixin],
  props:{
      project:{
        type: Object,
        default: {}
      },
      schema:{
        type: Object,
        default: {}
      }
  },
  data(){return{
    loading: false,
    model: {},
    login: false
  }},
  methods:{
    doAuth(form){
      try{
        this.loading = true;
        return this.authenticate(form)
                  .then(this.success)
                  .catch(this.error)
      }catch(e){
        this.error(e)
        this.loading = false;
      }
    },
    success(res){
        let token = this.storageToken(res)
        let { data, headers } = res;

        if( !token ) {
          this.loading = false;
          return this.$emit('auth:failed', {message: 'token not found', config, data, headers})
        }
        let authRequest = this.authRequest(token)
                    
        return this.$emit('auth:logged', { logged: this.logged, request: authRequest })
    },
    error({ response, message }){
      console.log('Auth Error', message, response)
      this.loading = false;
      
      this.$emit('auth:failed', {message})
    },
    async checkLogged(token){
      try{
        let auth = await this.isLogged(token)

        console.log('checkLogged: token', auth)
        
        this.$emit('auth:logged', auth)

        return auth
      }catch(e){
        console.log('checkLogged failed: token', e)
        return this.$emit('auth:failed', {message: e.message})
      }
    }, 
  },
  beforeMount(){
    this.login = false
      console.log('caled before mount')
  },
  async mounted(){
    try{
      console.log('caled mounted auth')
      if( !this.hasAuth ) return this.login = true 

      let token = sessionStorage.getItem(`${this.project.code}_session`)

      this.loading = true;
      if( token && has(this.project, 'user') ){
        this.$emit('auth:logged', {token, user: get(this.project, 'user'), request: this.authRequest(token) })
        
        console.log('if user mounted', this.authRequest(token), this.session)
        this.schema.api = Object.assign(this.schema.api, this.authRequest(token))
      }else if( token ){
        let { request={}, ...data } = await this.checkLogged(token)
        console.log('if token mounted', request, data)
        this.schema.api = Object.assign(this.schema.api, request)
      }else{
        return this.$emit('auth:failed', {})
      } 
      
      this.login = true;
      this.loading = false;
    }catch(e){
      this.loading = false;
      console.log('erro mounted auth', e)
      this.$emit('auth:failed', e)
    } 
  }
}
</script>