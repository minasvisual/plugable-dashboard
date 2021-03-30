<template>
  <section class="table-section" v-if="schema.api.rootApi">
    <div style="margin-bottom: 10px">
      <el-row>
        <el-col :span="16">
          <span v-if="selectedRow.length > 0" class="selectedActions">
            <label>Selected:</label> 
            <CButton @click="bulkDelete">
                <CIcon name="cil-trash" />
            </CButton>
          </span>
          <CButton @click="fetchData({type:'pageChange'})">
            <CIcon name="cil-reload" />
          </CButton>
          <CButton @click="onCreate">
            <CIcon name="cil-plus" />
          </CButton>
        </el-col>

        <el-col :span="8">
          <el-input placeholder="Search value" v-model="filters[0].value" clearable  class="input-with-select" size="mini" >
            <el-select v-model="filters[0].prop" placeholder="Search field" slot="prepend" size="mini" >
              <el-option
                v-for="item in titles"
                :key="item.prop"
                :label="item.label"
                :value="item.prop">
              </el-option>
            </el-select>
          </el-input>
        </el-col>
      </el-row>
    </div>

    <data-tables-server 
        :data="data.rows" 
        :total="data.total" 
        @query-change="fetchData"
        :table-props="tableProps"
        :pagination-props="{ pageSizes: [10, 20, 50, 150] }" 
        :action-col="actionCol" 
        :filters="filters" 
        @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55">
      </el-table-column>

      <el-table-column 
        v-for="title in titles" 
        :prop="title.prop" 
        :label="title.label" 
        :key="title.prop" 
        sortable="custom">
          <template slot-scope="props"> 
             <CellTypes :cell="title" :data="props" />
          </template>
      </el-table-column>

      
      <el-table-column
        prop="actions" 
        label="" 
        :sortable="false">
          <template slot-scope="props" > 
            <section class="text-right">
              <CButton  class="card-header-action mr-3"  @click="onEdit(props.row)"> 
                <CIcon name="cil-pencil" />
              </CButton>
              <CButton   class="card-header-action"  @click="onDelete(props.row)"> 
                <CIcon name="cil-trash" />
              </CButton>
            </section>
          </template>
      </el-table-column>

    </data-tables-server>
  </section>
</template>
<script>
import { has, debounce } from 'lodash'
import { schemaColumns, filterParams } from '../../services/helpers'
import { getData } from "../../services/models";

import CellTypes from './table-types/index'

export default {
  name:"Table",
  components:{
    CellTypes
  },
  data(){
    return{
      queryInfo: {},
      search:'',
      layout: 'pagination',
      actions:{},
      columns: {},
      data:{
        rows:[],
        total:0
      },
      tableProps:{
        defaultSort: { prop: 'id', order: 'descending'} 
      },
      filters: [{}],
      actionCol: {
        // props: {
        //   label: '',
        // },
        // buttons: [
        //   {
        //     handler: this.onEdit,
        //     label: '<CIcon name="cil-pencil">'
        //   }, {
        //     handler: this.onDelete,
        //     label: 'Remove'
        // }]
      },
      selectedRow: [],
    }
  },
  props:{
    schema: {
      type:Object,
      default: { }
    },
  },
  computed:{
    titles(){
      return has(this.schema, 'properties') ? schemaColumns([ ...this.schema.properties ]) : []
    }
  },
  methods:{
    fetchData: debounce(async function(queryInfo){
      if( !queryInfo ) return false;

      this.queryInfo = queryInfo
      this.schema.api = filterParams(this.schema.api, queryInfo) 

      if( ['sizeChange','pageChange','init', 'sort', 'filter', 'page'].includes(queryInfo.type) )
         this.data = await getData(this.schema, {})
    }, 1000),
    onCreate() { 
      this.$emit('actions:create', {})
    },
    onEdit(row){
      this.$emit('actions:edit', row)
    },
    onDelete(row){
      if( confirm('Are you sure to delete?') ) 
          this.$emit('actions:delete', row)
    },
    handleSelectionChange(val) {
      this.selectedRow = val
    },
    async bulkDelete() {
      if( confirm(`Are you sure to delete ${this.selectedRow.length} rows?`) ){
          this.$emit('actions:deleteBatch', this.selectedRow)
      }
    }
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