<template>
  <section class="table-section" v-if="renderComponent">
    <template v-if="layout == 'table'">
      <keep-alive>
        <TableServer v-if="remote" 
            ref="tables" 
            :schema="schema" 
            :resource="data" 
            @fetchData="fetchData"
            @actions:create="$emit('actions:create', $event)"
            @actions:edit="$emit('actions:edit', $event)" 
            @actions:delete="$emit('actions:delete', $event)" 
            @actions:deleteBatch="$emit('actions:deleteBatch', $event)" 
        />
        <Tablelocal v-else-if="!remote"
            ref="tables" 
            :schema="schema" 
            :resource="resource"
            @actions:create="$emit('actions:create', $event)"
            @actions:edit="$emit('actions:edit', $event)" 
            @actions:delete="$emit('actions:delete', $event)" 
            @actions:deleteBatch="$emit('actions:deleteBatch', $event)" 
        />
        <p v-else class="text-center"><small>
          Missing rootApi (Server Crud) or bypassGetData (Sub object Crud) property</small>
        </p>
      </keep-alive>
    </template>
  
    <CardView v-else-if="layout == 'card' && schema.api.rootApi" 
        ref="tables" 
        :schema="schema" 
        :resource="data" 
        @fetchData="fetchData"
        @actions:create="$emit('actions:create', $event)"
        @actions:edit="$emit('actions:edit', $event)" 
        @actions:delete="$emit('actions:delete', $event)" 
        @actions:deleteBatch="$emit('actions:deleteBatch', $event)" 
    /> 
  </section>
</template>
<script>
import { get, has, debounce, isEqual, filter } from 'lodash'
import { filterParams } from '../../services/helpers'
import { getData } from "../../services/models";

import TableMixin from '../../services/table.mixin'
import TableServer from './table-types/TableRemote'
import Tablelocal from './table-types/TableLocale';
import CardView from './table-types/CardView';

export default {
  name:"Table",
  mixins:[TableMixin],
  props: {
    schema: { type: Object }, 
    resource: { type: Array|Object|String }, 
    layout: { type: String, default: 'table' }
  },
  components:{
    TableServer, Tablelocal, CardView
  },
  data(){
    return{
      data: null,
      renderComponent: false,
      remote: true
    }
  },
  computed:{ 
  },
  methods:{ 
    async fetchData(queryInfo){
      //this.$refs.tables.fetchData({ type: "pageChange" });
      try{
        console.debug("table fetchData called", queryInfo, this.schema.api.rootApi)
        
        if( this.validateQueryInfo(queryInfo) ){
          //this.queryInfo = queryInfo
          this.schema.api = filterParams(this.schema.api, { ...queryInfo, data: this.resource }) 
          //this.resetGrid()

          this.$store.commit('setLoader', ['table', true])
          this.data = await getData(this.schema, { ...queryInfo, data: this.resource })
          //this.perPage = (this.data.rows && this.data.rows.length) || this.perPage
        }

        return true;
      }catch(err){
        console.log(err)
        //this.$message(err.message, 'danger')
        return false;
      }finally{
        console.debug('Finally getData tbale')
        this.$store.commit('setLoader', ['table', false])
      }
    },
    async boot(){   
      if( get(this.schema, 'api.bypassGetData', false) ){
        this.remote = false 
        if( !Array.isArray(this.resource) ) this.resource = []
      }else if( get(this.schema, 'api.rootApi', false) ) {
        this.remote = true 
        await this.fetchData({ type: "init", page: 1 })
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
.table thead tr th {
  	white-space: nowrap
}
@media (max-width: 728px){ 
}
</style>