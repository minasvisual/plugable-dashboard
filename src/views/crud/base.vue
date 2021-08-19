<template>
  <CRow>
    <CCol col class="base"> 
        <CCard>
          <CCardHeader>
            <strong>{{ currentProject.name }} | {{ active.title }}</strong>
            
            <div class="card-header-actions d-flex justify-content-between" v-if="renderComponent" > 
              <CDropdown
                v-if="logged" 
                color="white"
                :toggler-text="get(session, 'user.name', 'anonimous')"  
              >
                <CDropdownItem disabled></CDropdownItem>
                <CDropdownItem @click="logout">Logout</CDropdownItem>
              </CDropdown>  
              <FormulateInput v-if="active.type != 'form'" 
                type="select" 
                :outer-class="['card-header-action p-0 m-0 mr-2']" input-class="p-1"  
                :options="views" v-model="layout" 
              />  
              <CButton size="sm" class="card-header-action d-flex"  @click="loadModel({ cache:{ ignoreCache: true } })"> 
                <CIcon name="cil-reload" /> Model
              </CButton>
            </div>
          </CCardHeader>
          <CCardBody >
            <section v-if="renderComponent">
              <Auth
                  ref="Auth"
                  :project="currentProject" 
                  :schema="active"
                  @auth:logged="auth"
                  @auth:failed="errors"
              >
                <template v-slot="{ schema }"> 
                    <Form   
                      v-if="schema.type == 'form'"
                      :schema="schema"   
                    />  
                    <Grid  
                      v-else
                      :schema="schema"
                      :layout="layout" 
                    />  
                </template>
              </Auth>
            </section>
            <h4 v-else class="text-center">
              <CSpinner color="info"/>
            </h4>
          </CCardBody>
      </CCard> 
  </CCol>

  <CModal 
    :show.sync="!!action.schema"
    size="lg"
    :closeOnBackdrop="false"
  >
    <Crud 
      v-if="action.schema"
      :context="action"
    />
  </CModal>
</CRow>
</template>

<script>
import { has, } from 'lodash'
import ControllerMixin from '../../services/controller.mixin'
import SessionMixin from '../../services/session.mixin'
import ActionsMixin from '../../services/actions.mixin'

import Auth from './auth'
import Grid from './crud' 
import Form from './form'

export default {
  name: 'Base',
  mixins:[ControllerMixin, SessionMixin, ActionsMixin],
  components:{
    Auth, Grid, Form
  },
  data(){
    return{
      models: {}, 
      formLogin:true, 
      formopen: false,
      layout: 'table',
      views:{
        'table': 'Table' ,
        'card': 'Card View',
      },
      action:{}
    }
  },
  watch: {
    $route: async function(to, from) {
        if( to.params.model != from.params.model )
          await this.loadModel({cache: {ignoreCache: true}})
    },
    currentProject: async function (newVal, oldVal){
      if( has(this.currentProject, 'code') && !oldVal.code ){
        await this.loadModel()
      }else if( has(this.currentProject, 'code') && this.currentProject.code !== newVal.code ){
        let res = Object.keys(newVal.resources)
        this.$router.push(`/api/${newVal.code}/${res[0]}`) 
      }
    }
  },
  async mounted(){
    if( has(this.currentProject, 'code') )
      await this.loadModel()

    if( this.active.layout )
      this.layout = this.active.layout
  },
  computed:{ 
    crud(){
      return this.$store.state.crud || {}
    }, 
  },
  methods:{ 
    closeForm({ refresh }){
        if( refresh )
          this.reloadData()
          
        this.formopen = false;
        this.$store.commit('set', ['crud', {...this.crud, row: null }] )
    }, 
    auth({ request={}, ...data }) {
      this.logged = true
      console.log('logged base api', request)
      this.active.api = Object.assign(this.active.api, request); 

      return request
    }, 
    logout(){
      return this.doLogout().then(function(){
        this.logged = false
        this.forceRerender()
      })
    }
  },
  beforeMount(){
    this.$bus.$on("model:redirect", this.redirect)
    this.$bus.$on("model:open", this.openModel)
  },
  beforeDestroy(){
    this.$bus.$off("model:redirect", this.redirect)
    this.$bus.$off("model:open", this.openModel)
  }
}
</script>

<style lang="scss">
.base{
  .card-header{
    .dropdown{
      button{
        padding: 0 10px !important;
      }
    }
  }
}
@media (max-width: 728px) {
  .c-body .c-main{
    padding-top: .6em;
    .container-fluid{
      overflow: hidden;
      padding: 0px 0;
    }
  }
  .card-body, .card-header{
    padding: 5px;
  }
}
</style>