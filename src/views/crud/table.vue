<template>
  <section class="loading-wrap table-section" :class="{ 'active': renderComponent !== true || loader === true }"  >
      <div class="blackdrop"><CSpinner color="info" /></div>

      <template v-if="layout == 'table' && renderComponent">
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
    
      <CardView v-else-if="layout == 'card' && schema.api.rootApi && renderComponent"  
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
import { get, has } from 'lodash'
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
    resource: { type: [Array,Object,String] }, 
    layout: { type: String, default: 'table' }
  },
  components:{
    TableServer, Tablelocal, CardView
  },
  data(){
    return{
      data: null,
      renderComponent: false,
      remote: true,
      loader: false
    }
  },
  computed:{ 
  },
  watch:{
    data(newVal, oldVal){ 
      if( has(newVal, 'total') && has(oldVal, 'total') && get(newVal, 'total') != get(oldVal, 'total')){
        console.debug('new val chnge', newVal.total, 'oldVal', oldVal.total)
        this.alertDataChange(newVal, oldVal)
      }
    }
  },
  methods:{ 
    async fetchData(queryInfo){
      //console.debug('table fetch data', queryInfo)
      //this.$refs.tables.fetchData({ type: "pageChange" });
      try{ 
        
        if( this.validateQueryInfo(queryInfo) ){
          //this.queryInfo = queryInfo
          this.schema.api = filterParams(this.schema.api, { ...queryInfo, data: this.resource }) 
          //this.resetGrid()

          this.loader = true
          this.data = await getData(this.schema, { ...queryInfo, data: this.resource })
          //this.perPage = (this.data.rows && this.data.rows.length) || this.perPage
        }

        return true;
      }catch(err){
        console.log(err)
        this.$message(err.message, 'danger')
        return false;
      }finally{ 
        this.loader = false
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

      this.loadActions()
    },
    alertDataChange(newVal, oldVal){ 
      let message = get(oldVal, 'total', 0) < get(newVal, 'total', 0) 
          ? `${ get(newVal, 'total', 0) - get(oldVal, 'total', 0) } new register` : `${ get(oldVal, 'total', 0) - get(newVal, 'total', 0) } delection` 
      
      this.$bus.$emit( `${this.schema.domain}:grid:changed`, { title: "Pluggable Dashboard Alert", body: `You have a ${ message } on ${this.schema.title}` })
    },
    loadActions(){
      this.$bus.$on( `${this.schema.domain}:reload`, this.fetchData.bind(this, { type: "init", page: 1 }) )
    },
    destroyActions(){
      this.$bus.$off( `${this.schema.domain}:reload`, this.fetchData.bind(this, { type: "init", page: 1 }) )
    }
  },
  mounted(){
    this.boot()
  },
  beforeDestroy(){
    this.destroyActions()
  }
}
</script>

<style lang="scss">
.table thead tr th {
	white-space: nowrap;
  .form-control :is(input,select,textarea){
    padding: 3px !important;
    border: none !important;
  }
}
@media (max-width: 728px){ 
}
</style>