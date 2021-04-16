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
        this.renderComponent = true
      }else if( get(this.schema, 'api.rootApi', false) ) {
        this.layout = 'server' 
        this.renderComponent = true
      }else{
        console.log('table cant be rendered: rootApi', get(this.schema, 'api.rootApi', false), ' resource: ', this.resource)
      }
      console.log('schema', this.layout, this.schema)
    },
  },
  mounted(){
    this.boot()
  }
}
</script>

<style lang="scss">
.el-input-group__prepend {
    width: 40%;
}
.el-table__row td{
   padding:0;
   font-size: .9em;
}
.el-pagination{
  margin-top:20px
}
.selectedActions{
  border-right: 1px solid #ccc;
  label {
    padding-top: 5px;
    margin: 0;
  }
}
</style>