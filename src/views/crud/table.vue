<template>
  <section class="table-section" v-if="renderComponent">
    
    <Tablelocal  v-if="layout == 'local'"
        ref="tables" 
        :schema="schema" 
        :resource="resource"
        @actions:create="$emit('actions:create', $event)"
        @actions:edit="$emit('actions:edit', $event)" 
    />
    <TableServer v-else-if="layout == 'server' && schema.api.rootApi" 
        ref="tables" 
        :schema="schema" 
        :resource="resource" 
        @actions:create="$emit('actions:create', $event)"
        @actions:edit="$emit('actions:edit', $event)" 
    />
    <p v-else class="text-center"><small>Missing rootApi (Server Crud) or bypassGetData (Sub object Crud) property</small></p>

  </section>
</template>
<script>
import { get, has, debounce } from 'lodash'

import TableMixin from '../../services/table.mixin'
import TableServer from './table-types/tableserver'
import Tablelocal from './table-types/tablelocal.vue';

export default {
  name:"Table",
  mixins:[TableMixin],
  props: ['schema', 'resource'],
  components:{
    TableServer, Tablelocal
  },
  data(){
    return{
      layout: null, 
      data: null,
      renderComponent: false
    }
  },
  computed:{ 
  },
  methods:{ 
    fetchData(){
      this.$refs.tables.fetchData({ type: "pageChange" });
    },
    boot(){   
      if( get(this.schema, 'api.bypassGetData', false) && Array.isArray(this.resource) ){
        this.layout = 'local' 
      }else if( get(this.schema, 'api.rootApi', false) ) {
        this.layout = 'server' 
      }else{
        console.log('table cant be rendered: rootApi', get(this.schema, 'api.rootApi', false), ' resource: ', this.resource)
      }
      this.renderComponent = true
    },
  },
  mounted(){
    this.boot()
  }
}
</script>

<style lang="scss">
@media (max-width: 728px){
  .el-table-column--selection{
    width: 15px; 
  }
  .pagination-wrap{
    .el-pagination__jump{
      display: none !important;
    }
    .el-pager{
      .number:not(.active){
        display:none !important;
      }
    }
  }
}
</style>