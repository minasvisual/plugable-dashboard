<template>
  <CRow>
    <CCol col>
      <Loading target="model">
        <CCard>
          <CCardHeader>
            <strong>{{ currentProject.name }} | {{ active.title }}</strong>
            
            <div class="card-header-actions d-flex justify-content-between" >
              <span v-if="session">Logged as {{  session.user.name ? session.user.name: 'anonimous' }} | </span>
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
    </Loading>
  </CCol>
</CRow>
</template>

<script>
import { has, get, set } from 'lodash'
import ControllerMixin from '../../services/controller.mixin'
import SessionMixin from '../../services/session.mixin'

import Auth from './auth'
import Grid from './grid' 
import Form from './form' 
import Loading  from '../../containers/Loading'

export default {
  name: 'Base',
  mixins:[ControllerMixin, SessionMixin],
  components:{
    Auth, Grid, Form, Loading
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
      }
    }
  },
  watch: {
    $route(to, from) {
        if( to.params.model != from.params.model )
          this.loadModel({cache: {ignoreCache: true}})
    },
    currentProject(newVal, oldVal){
      if( has(this.currentProject, 'code') && !oldVal.code ){
        this.loadModel()
      }else if( has(this.currentProject, 'code') && this.currentProject.code !== newVal.code ){
        let res = Object.keys(newVal.resources)
        this.$router.push(`/api/${newVal.code}/${res[0]}`) 
      }
    }
  },
  async mounted(){
    if( has(this.currentProject, 'code') )
      this.loadModel()
  },
  computed:{ 
    crud(){
      return this.$store.state.crud || {}
    }
  },
  methods:{ 
    closeForm({ refresh }){
        if( refresh )
          this.reloadData()
          
        this.formopen = false;
        this.$store.commit('set', ['crud', {...this.crud, row: null }] )
    }, 
    auth({ request={}, ...data }) {
      console.log('logged base api', request)
      this.active.api = Object.assign(this.active.api, request); 

      return request
    }, 
  }
}
</script>

<style lang="scss">
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