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
                    v-if="active.properties"
                    :schema="active" 
                    :data="row"
                  /> 
              </CTab>
              <CTab title="Table" v-if="active">
                <Table 
                  ref="tables" 
                  v-if="(hasAuth && logged) || !hasAuth"
                  :schema="active"
                  @actions:create="actions('FORM_CREATE', $event)"
                  @actions:edit="actions('FORM_EDIT', $event)"
                />
                <span v-else>Login required</span>
              </CTab>
            </CTabs>            
          </CCol>
          <CCol lg="5">
            <select v-model="jsonEditorData">
              <option value="project">Project</option>
              <option value="model">Model</option>
              <option value="row">Form values</option>
            </select>
            <VJsoneditor v-if="jsonEditorData == 'project'" v-model="currentProject" height="100%" :options="{mode: 'code'}" ></VJsoneditor>
            <VJsoneditor v-else-if="jsonEditorData == 'model'" v-model="active" height="100%" :options="{mode: 'code'}" ></VJsoneditor>
            <VJsoneditor v-else-if="jsonEditorData == 'row'" v-model="row" height="100%" :options="{mode: 'code'}" ></VJsoneditor>
          </CCol>
        </CRow>
        
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
import { loadProjects } from '../../services/models'
import { get } from 'lodash'
import VJsoneditor from 'v-jsoneditor'
import Auth from '../crud/auth'
import Table from '../crud/table'
import Forms from '../crud/formulate'
import axios from 'axios'

export default {
  name: 'Colors',
  components: { VJsoneditor, Forms, Table, Auth },
  data(){return{
    jsonEditorData: 'project',
    project: null,
    currentProject: null, 
    model: null,
    active: null,
    logged: false,
    row: {
      summary: `{
        "um":"UM",
        "dois":"DOIS",
        "tres":"TRES"
      }`,
      artists: JSON.stringify({"um":"UM","dois":"DOIS","tres":"TRES"}),
      grid:[
        { nome:'Ulisses', email:'email@email.com', mensagem: 'HURU', status: true, tags:['Ulisses','Alves','Mantovanii'], 
          image:"https://lovmetal.online/site/images/install-1.jpg" }
      ]
    },
  }},
  watch:{
    active(newVal){
       console.log('changed')
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
    optionfy(data, label, value){
      return data && data.map(i => ({label: i[label], value: i[value] }) )
    },
    auth({authRequest}){
        this.active.api = Object.assign(this.active.api, authRequest)
        this.logged = true
        this.$message(data.message || data)
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
    }
  },
  async mounted(){
     
  },
}
</script>
