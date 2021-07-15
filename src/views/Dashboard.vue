<template>
  <div>
    
    <CCard>
      <CCardBody>
        <CRow>
          <CCol xs="12" sm="4">
            <h4 id="traffic" class="card-title mb-0">Welcome</h4>
            <div class="small text-muted">{{  new Date() }} </div>
          </CCol>
          <CCol xs=12 sm="8" class="d-flex">
            <CRow class="w-100">
              <CCol sm=6 md=4 lg=3 style="border-left: 1px solid darkblue; margin-bottom: 10px ">
                <h6>Dashboard use</h6>
                <p >{{ projects.length.toString() }} Projects</p>
              </CCol>   
              <CCol sm=6 md=3 style="border-left: 1px solid darkblue; margin-bottom: 10px" 
                    v-for="row of projects" :key="row.code" @click="setProject(row)">
                <h6>{{ row.name }}</h6>
                <p>{{ calcResources(row) + ' apis' }}</p>
              </CCol>  
            </CRow>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>


    <Widgets v-if="current && renderWidgets" />

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
      renderWidgets: true
    }
  },
  watch:{
    '$store.state.currentProject': function( newVal ){
      if( newVal ){
        this.renderWidgets = false
        this.$nextTick(() => {
          this.renderWidgets = true
        })
      }
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
    },
  }
}
</script>
