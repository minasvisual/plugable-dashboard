<template>
  <CRow>
    <CCol col>
      <Loading target="model">
        <CCard>
          <CCardHeader>
            <strong>{{ currentProject.name }} | {{ active.title }}</strong>
            
            <div class="card-header-actions d-flex justify-content-between" >
              <span v-if="session">Logged as {{  session.user.name ? session.user.name: 'anonimous' }} | </span>
              <FormulateInput type="select" :outer-class="['card-header-action p-0 m-0 mr-2']" input-class="p-1"  :options="views" v-model="layout" />  
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
                  
                  <Table 
                    ref="tables" 
                    v-if="schema.api"
                    :schema="schema"
                    :layout="layout"
                    @actions:create="actions('FORM_CREATE', $event)"
                    @actions:edit="actions('FORM_EDIT', $event)"
                    @actions:delete="actions('FORM_DELETE', $event)"
                    @actions:deleteBatch="actions('FORM_DELETEBATCH', $event)" 
                  />

                  <CModal
                    :title="formTitle"
                    :show.sync="formopen"
                    size="lg"
                    :closeOnBackdrop="false"
                  >
                      <Forms 
                        v-if="formopen"
                        :formopen="formopen"
                        :schema="schema" 
                        :data="row"
                        @model:saved="formHook"
                        @close="closeForm"
                      /> 
                      <template slot="footer"><span></span></template>
                  </CModal>

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
import Table from './table'
import Forms  from './formulate'
import Loading  from '../../containers/Loading'

export default {
  name: 'Base',
  mixins:[ControllerMixin, SessionMixin],
  components:{
    Auth,
    Table,
    Forms,
    Loading
  },
  data(){
    return{
      models: {},
      row:{},
      formopen:false,
      formLogin:true, 
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
    formTitle(){ 
      return this.row && this.row.id ? `Update ${this.active.title} | ID: ${this.row.id}`: `New ${this.active.title}`
    },
    crud(){
      return this.$store.state.crud || {}
    }
  },
  methods:{
    reloadData() {
      this.$refs.tables.fetchData({ type: "pageChange" });
      this.formopen = false;
    },
    closeForm({ refresh }){
        if( refresh )
          this.reloadData()
          
        this.formopen = false;
        this.$store.commit('set', ['crud', {...this.crud, row: null }] )
    },
    actions(action, data){
      if( action == 'FORM_CREATE'){
        this.formopen = true;
        this.row = {}
        this.$store.commit('set', ['crud', {...this.crud, row: {} }] )
      }else if(action == 'FORM_EDIT'){
        this.formopen = true;
        this.row = { ...data }
        this.$store.commit('set', ['crud', {...this.crud, row: this.row }] )
      }else if(action == 'FORM_DELETE'){
          this.deleteData(this.active, data).then(() => {
            this.$message('Successfully deleted!')
            this.reloadData()
          })
      }else if(action == 'FORM_DELETEBATCH'){
          let proms = data && data.map(i => this.deleteData(i))
          
          Promise.all(proms)
              .catch( err => this.$message(err.message, 'danger'))
              .then( res => this.$message('All rows delete successfully'))
      }
    },
    auth({ request={}, ...data }) {
      console.log('logged base api', request)
      this.active.api = Object.assign(this.active.api, request); 

      return request
    },
    async formHook(data){
      try{
        return await this.saveData(this.active, data)
          .then((res) => {
              this.closeForm({ refresh: true })
              return res
          })
      }catch(err){
        console.debug('Form submit error', err)
      }
    }
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