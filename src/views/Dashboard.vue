<template>
  <div>
    
    <CCard>
      <CCardBody>
        <CRow>
          <CCol sm="5">
            <h4 id="traffic" class="card-title mb-0">Welcome</h4>
            <div class="small text-muted">{{  new Date() }} </div>
          </CCol>
          <CCol sm="7" class="d-none d-md-block">
            <CButton color="primary" class="float-right">
              <CIcon name="cil-cloud-download"/>
            </CButton>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>

    <CRow>
      <CCol md=2>
        <CWidgetSimple header="Projects" :text="projects.length.toString()">
          <CChartLineSimple style="height:40px" border-color="danger"/>
        </CWidgetSimple>
      </CCol>

      <CCol md=2 v-for="row of projects" :key="row.code" @click="setProject(row)">
        <CWidgetSimple :header="row.name" :text="calcResources(row) + ' apis'">
          <CChartLineSimple style="height:40px" border-color="primary"/>
        </CWidgetSimple>
      </CCol>
    </CRow> 

    <Widgets v-if="current" />

  </div>
</template>

<script>
import { CChartLineSimple, CChartBarSimple } from './charts/index.js'
import { saveSettings } from '../services/helpers'
import { get } from 'lodash'
import Widgets from './widgets/index'

export default {
  name: 'Dashboard',
  components: {
      CChartLineSimple, CChartBarSimple, Widgets
  },
  data () {
    return {
    }
  },
  computed: {
    projects(){
      return this.$store.state.projects || []
    },
    current(){
      return this.$store.state.currentProject || {}
    }
  },
  methods:{
    calcResources(proj){
        return Object.values(proj.resources).length
    },
    setProject(proj){
      this.$store.commit('set', ['currentProject', proj])
      
      saveSettings({current: get(proj, 'code', null)})
    }
  }
}
</script>
