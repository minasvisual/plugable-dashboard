<template> 
  <section v-if="renderComponent" :class="(schema.class || 'col-6')">
    <Auth
      v-if="current && schema" 
      :project="current" 
      :schema="schema"
    >
      <template v-slot="{ schema }">

        <div  :class="(attr.class || 'card')">
          <div v-if="schema.title" class="card-header" >
            <strong>{{ schema.title }}</strong>
            
            <div class="card-header-actions" > 
              <CButton size="sm" class="card-header-action" @click.prevent="$emit('reload')">
                <CIcon name="cil-reload" />
              </CButton>
            </div>
          </div>
          <div class="card-body"> 
              <div v-if="attr.prefix" class="prefix" v-html="attr.prefix"></div>
              <component v-if="pivot" :is="(attr.type || 'Table')" v-bind="{pivot,schema}" :class="(params.class || '')" />
              <div v-if="attr.suffix" class="suffix" v-html="attr.suffix"></div>
          </div>
        </div>

      </template>
    </Auth>
  </section>
</template>

<script>
import { get } from 'lodash'
import { getData } from '../../services/models'
import Pivot from "quick-pivot";
import Auth from '../crud/auth'

import ChartBar from './types/chartbar'
import ChartPie from './types/chartPie'
import ChartLine from './types/chartline'
import Table from './types/table'

export default {
  components:{
    Auth, ChartBar, ChartPie, ChartLine, Table
  },
  props:{
    schema:{
      type: Object,
      default: {}
    }
  },
  data() {
    return { 
      renderComponent: false,
      pivot:{},
      dataset: [],
      ui: false
    }
  },
  computed:{
    current(){
      return this.$store.state.currentProject
    },
    attr(){
      return this.schema.widget || {}
    },
    params(){
      return this.attr.params || {}
    }
  },
  methods:{
    loadWidget: async function (ops){ 
      try{
        this.renderComponent = false
        if( !get(this.schema,'api.rootApi',false) ) return false;

        await this.loadDataset()

        this.loadPivot()

        this.renderComponent = true
      }catch(e){
        console.log(e)
        this.$message(e.message)
      }
    },
    async loadDataset(ops){
        this.dataset = await getData(this.schema, {}, ops).then( ({rows, total}) => rows )
    },
    loadPivot(){
        const rowsToPivot = this.params.rows || [];
        const colsToPivot = this.params.cols || [];
        const aggregationDimension = this.params.group || "";
        const aggregator = this.params.action || "count";

        this.pivot = new Pivot(
          this.dataset,
          rowsToPivot,
          colsToPivot,
          aggregationDimension,
          aggregator
        );
    }

  },
  beforeMount(){
    this.loadWidget()
  }
}
</script>

<style lang="scss">
.pvtWrapper.showUi tbody tr td:not(.pvtOutput){
  display:none;
  border: none;
}
</style>