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
                :project="currentProject" 
                :schema="active"
                @auth:logged="auth"
                @auth:failed="errors"
                
            >
              <template v-slot="{ schema }">
                {{ JSON.stringify(schema.api) }}
                <Table 
                  ref="tables" 
                  v-if="schema.api"
                  :schema="schema"
                  @actions:create="actions('FORM_CREATE', $event)"
                  @actions:edit="actions('FORM_EDIT', $event)"
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
                  @model:saved="reloadData"
                  @close="reloadData"
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

export default {
  name: 'Base',
  mixins:[ControllerMixin, SessionMixin],
  components:{
    Auth,
    Table,
    Forms
  },
  data(){
    return{
      models: {},
      row:{},
      formopen:false,
      formLogin:true, 
    }
  },
  watch: {
    $route(to, from) {
        if( to.params.model != from.params.model )
          this.loadModel()
    },
    currentProject(newVal, oldVal){
        console.log('watched current project', newVal, oldVal)
      if( has(this.currentProject, 'code') && !oldVal.code ){
        console.log('watched current project if', has(this.currentProject, 'code'), !oldVal)
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
        else
          this.formopen = false;
    },
    actions(action, data){
      if( action == 'FORM_CREATE'){
        this.formopen = true;
        this.row = {}
      }else if(action == 'FORM_EDIT'){
        this.formopen = true;
        this.row = { ...data }
      }else if(action == 'FORM_DELETE'){
          this.deleteData(data).then(() => {
            this.$message('Successfully deleted!')
            this.reloadData()
          })
      }else if(action == 'FORM_DELETEBATCH'){
          let proms = data && data.map(i => this.deleteData(row))
          
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
  }
}
</script>
