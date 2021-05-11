<template> 
  <section v-if="renderComponent" :class="(schema.wrapperClass || 'col-6')">
    <Auth
      v-if="current && schema" 
      :project="current" 
      :schema="schema"
    >
      <template v-slot="{ schema }">

        <div :class="(schema.class || 'card')">
          <div v-if="schema.title" class="card-header" >
            <strong>{{ schema.title }}</strong>
            
            <div class="card-header-actions" > 
              <CButton size="sm" class="card-header-action" @click.prevent="$emit('reload')">
                <CIcon name="cil-reload" />
              </CButton>
            </div>
          </div>
          <div :class="(schema.bodyClass || 'card-body')"> 
            <section v-for="(widget, idx) of attr" :key="idx">
              <div v-if="widget.prefix" class="prefix" v-html="widget.prefix"></div>
              <component v-if="pivot" 
                    :is="(widget.type || 'Table')" 
                    v-bind="{ pivot: loadPivot(widget), schema, widget}" 
                    :class="(params.class || '')" 
              />
              <div v-if="widget.suffix" class="suffix" v-html="widget.suffix"></div>
            </section>
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
import Tiles from './types/tiles'

export default {
  components:{
    Auth, ChartBar, ChartPie, ChartLine, Table, Tiles
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
      if( !this.schema.widgets )
        return []

      if( !Array.isArray(this.schema.widgets) )
        return [ this.schema.widgets ];

      return this.schema.widgets || []
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

        if( this.attr.length == 0 )
          return false;

        //this.loadPivot()

        this.renderComponent = true
      }catch(e){
        console.log(e)
        this.$message(e.message)
      }
    },
    async loadDataset(ops){
        this.dataset = await getData(this.schema, {}, ops).then( ({rows, total}) => rows )
    },
    loadPivot(widget){
        let params = widget.params || {};

        const rowsToPivot = params.rows || [];
        const colsToPivot = params.cols || [];
        const aggregationDimension = params.group || "";
        const aggregator = params.action || "count";

        return new Pivot(
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