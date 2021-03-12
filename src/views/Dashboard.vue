<template>
  <div>
    
    <CRow>
      <CCol md=3>
        <CWidgetSimple header="Projects" :text="projects.length">
          <CChartLineSimple style="height:40px" border-color="danger"/>
        </CWidgetSimple>
      </CCol>

      <CCol md=3 v-for="row of projects" :key="row.code">
        <CWidgetSimple :header="row.name" :text="calcResources(row) + ' apis'">
          <CChartLineSimple style="height:40px" border-color="primary"/>
        </CWidgetSimple>
      </CCol>
    </CRow>

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
      <CCardFooter>
      </CCardFooter>
    </CCard>

  </div>
</template>

<script>
import { CChartLineSimple, CChartBarSimple } from './charts/index.js'
export default {
  name: 'Dashboard',
  components: {
      CChartLineSimple, CChartBarSimple
  },
  data () {
    return {
    }
  },
  computed: {
    projects(){
      return this.$store.state.projects || []
    }
  },
  methods:{
    calcResources(proj){
        return Object.values(proj.resources).length
    }
  }
}
</script>
