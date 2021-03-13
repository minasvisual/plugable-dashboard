<template>
  <CRow>
    <CCol col>
      <CCard>
        <CCardHeader>
          <strong>{{ currentProject.name }} | {{ active.title }}</strong>
          
          <div class="card-header-actions" >
            <CButton v-if="hasAuth" size="sm" class="card-header-action"  @click="loadModel"> 
              <CIcon name="cil-key" /> Login
            </CButton>
            <CButton size="sm" class="card-header-action"  @click="loadModel"> 
              <CIcon name="cil-reload" /> Model
            </CButton>
          </div>
        </CCardHeader>
        <CCardBody >
          <section v-if="renderComponent">
            <Auth
                v-if="!logged && hasAuth && !!currentProject" 
                :project="currentProject" 
                :schema="active"
                @auth:logged="auth"
                @auth:failed="errors"
            />

            <Table 
              ref="tables" 
              v-if="showCrud"
              :schema="active"
              @actions:create="actions('FORM_CREATE', $event)"
              @actions:edit="actions('FORM_EDIT', $event)"
            />
          </section>
          <h4 v-else class="text-center">Loading...</h4>
        </CCardBody>
    </CCard>
  </CCol>
    
  <CModal
    :title="formTitle"
    :show.sync="formopen"
    size="lg"
    :closeOnBackdrop="false"
  >
    <Forms 
      v-if="formopen"
      :formopen="formopen"
      :schema="active" 
      :data="row"
      @model:saved="reloadData"
      @close="reloadData"
    /> 
    <template slot="footer"><span></span></template>
  </CModal>

</CRow>
</template>

<script>
import { has, get, set } from 'lodash'
import { loadModel } from '../../services/models'

import Auth from './auth'
import Table from './table'
import Forms  from './formulate'

export default {
  name: 'Base',
  components:{
    Auth,
    Table,
    Forms
  },
  data(){
    return{
      logged: false,
      models: {},
      active:{},
      row:{},
      formopen:false,
      formLogin:true, 
      renderComponent: false
    }
  },
  watch: {
    $route(to, from) {
        if( to.params.model != from.params.model )
          this.loadModel()
    },
    currentProject(newVal, oldVal){
      if( !has(this.currentProject, 'code') && newVal )
        this.loadModel()
      else if( has(this.currentProject, 'code') && newVal ){
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
    currentProject(){
      return this.$store.state.currentProject || null
    },
    hasAuth(){ 
      return !!this.currentProject.auth 
    },
    showCrud(){
      return (!this.hasAuth || (this.hasAuth && this.logged)) && this.active.title
    },
    formTitle(){ 
      return this.row && this.row.id ? `Update ${this.active.title} | ID: ${this.row.id}`: `New ${this.active.title}`
    }
  },
  methods:{
    closeForm({ refresh }){
        if( refresh)
          this.reloadData
        else
          this.formopen = false;
    },
    reloadData(){
        this.$refs.tables.fetchData({ type: 'pageChange'})
        this.formopen = false;
    },
    actions(action, data){
      if( action == 'FORM_CREATE'){
        this.formopen = true;
        this.row = {}
      }else if(action == 'FORM_EDIT'){
        this.formopen = true;
        this.row = { ...data }
      }
    },
    async loadModel(){
      if( !has(this.currentProject, 'resources') ) return false;

      if( has(this.$route, 'params.model') && has(this.currentProject, `resources[${this.$route.params.model}]`) ){
        this.loading = true
        let url = this.currentProject.resources_path + get(this.currentProject, `resources[${this.$route.params.model}.resource]`)
        this.active = await loadModel( url )

        if( this.active && this.renderComponent === true ) 
          this.forceRerender()
        else if(this.active)
          this.renderComponent = true
      }else{
        this.$message('Model '+this.$route.params.model+' doesnt exist')
        this.$router.push('/dashboard')
      }
    },
    forceRerender() {
        this.renderComponent = false;

        this.$nextTick(() => {
          // Add the component back in
          this.renderComponent = true;
        });
    },
    auth({authRequest}){
        this.active.api = Object.assign(this.active.api, authRequest)
        this.logged = true
        console.log('chamado auth')
        this.forceRerender()
    },
    errors(data){
      this.$message(data.message || data)

      console.log('error', data)
    }
  }
}
</script>
