<template>
  <div>
    <CCard>
      <CCardHeader>
          <CIcon name="cil-drop"/> 
          <span>  Playground</span>
          
          <div class="card-header-actions" >
            <select v-model="project" >
              <option :value="null" selected readonly>Select model</option>
              <option v-for="row of optionfy(projects, 'name', 'code')" :key="row.value" :value="row.value" v-text="row.label"></option>
            </select>

            <select v-if="project" v-model="model">
              <option v-for="row of optionfy(models, 'label', 'resource')" :key="row.value" :value="row.value" v-text="row.label"></option>
            </select>

            <CButton type="button" @click="reloadProjects"><CIcon name="cil-reload" /> Projects</CButton>
          </div>
      </CCardHeader>
      <CCardBody>
        <CRow>
          <CCol lg="7"> 
            <CButton class="float-right" @click="forceRerender"><CIcon name="cil-reload" /> Reload Schema</CButton>
            <CTabs variant="pills" :active-tab="0">
              <CTab title="Auth" v-if="hasAuth">
                  <Auth
                      v-if="hasAuth && !!currentProject" 
                      :project="currentProject" 
                      @auth:logged="auth"
                      @auth:failed="errors"
                  />
              </CTab>
              <CTab title="Form" v-if="active">
                  <Forms 
                    v-if="active.properties && render"
                    :schema="active" 
                    :data="row"
                  /> 
              </CTab>
              <CTab title="Table" v-if="active">
                <Table 
                  ref="tables" 
                  v-if="((hasAuth && logged) || !hasAuth) && render"
                  :schema="active"
                  @actions:create="actions('FORM_CREATE', $event)"
                  @actions:edit="actions('FORM_EDIT', $event)"
                />
                <span v-else>Login required</span>
              </CTab>
              
            </CTabs>            
          </CCol>
          <CCol lg="5" style="min-height: 500px">
            <select v-model="jsonEditorData">
              <option value="project">Project</option>
              <option value="model">Model</option>
              <option value="row">Form values</option>
            </select>
            <CButton type="button" @click="newJson(jsonEditorData)"><CIcon name="cil-plus" /> New {{ jsonEditorData }}</CButton>

            <VJsoneditor v-if="jsonEditorData == 'projects'" v-model="projects" height="100%" :options="{mode: 'code'}" ></VJsoneditor>
            <VJsoneditor v-else-if="jsonEditorData == 'project'" v-model="currentProject" height="100%" :options="{mode: 'code'}" ></VJsoneditor>
            <VJsoneditor v-else-if="jsonEditorData == 'model'" v-model="active" height="100%" :options="{mode: 'code'}" ></VJsoneditor>
            <VJsoneditor v-else-if="jsonEditorData == 'row'" v-model="row" height="100%" :options="{mode: 'code'}" ></VJsoneditor>
          </CCol>
        </CRow>
        
      </CCardBody>
    </CCard>

    <CModal
      title="New item"
      :show.sync="addModal.show"
      size="lg"
      :closeOnBackdrop="false"
    >
      <NewProject v-if="addModal.type == 'project'" />
      <NewModel v-if="addModal.type == 'model'" @model="(data) => this.active = data"/>
    </CModal>
  </div>
</template>

<script>
import { loadProjects } from '../../services/models'
import { get, debounce } from 'lodash'
import VJsoneditor from 'v-jsoneditor'
import Auth from '../crud/auth'
import Table from '../crud/table'
import Forms from '../crud/formulate'

import NewProject from './playgrounds/NewProject'
import NewModel from './playgrounds/NewModel'
import axios from 'axios'

export default {
  name: 'Colors',
  components: { VJsoneditor, Forms, Table, Auth, NewProject, NewModel},
  data(){return{
    render: true,
    jsonEditorData: 'projects',
    project: null,
    currentProject: null, 
    model: null,
    active: null,
    logged: false,
    row: {
    },
    addModal: {}
  }},
  watch:{
    // active: debounce(function(newVal){
    //   if( !newVal ) return false;
      
    //   console.log(newVal)
    //   this.forceRerender()
    // }, 3000),
    project(newVal, oldVal){
      if( newVal && !oldVal )
        this.jsonEditorData = 'model'
    },
    model(newVal){
      if( newVal )
        this.getModel(newVal)
    }
  },
  computed:{
    projects(){ 
      return get( this.$store, 'state.projects', [])
    },
    models(){
      this.currentProject = get( this.$store, `state.projects`, []).find(i => i.code == this.project )
      return this.currentProject && Object.values(this.currentProject.resources) || []
    },
    hasAuth(){ 
      return this.currentProject && !!this.currentProject.auth 
    },
  },
  methods:{
    getModel(model){
       axios.get(this.currentProject.resources_path + model)
        .then(({ data }) => this.active = data)
    },
    newJson(type){
      this.addModal = { show: true, type }
      this.logged = true
      if( type == 'model'){
        this.model = null
      }
    },
    optionfy(data, label, value){
      return data && data.map(i => ({label: i[label], value: i[value] }) )
    },
    auth({authRequest}){
        this.active.api = Object.assign(this.active.api, authRequest)
        this.logged = true
        this.$message('Success logged')
        this.forceRerender()
    },
    errors(data){
      this.$message(data.message || data)

      console.log('error', data)
    },
    reloadProjects(){
      loadProjects().then(data => {
        this.$store.commit('set', ['projects', data])

      })
    },
    forceRerender(){
        console.log('changed')
        this.render = false;
        this.$nextTick(() => {
          this.render = true;
        });
    }
  },
  async mounted(){
     
  },
}
</script>
