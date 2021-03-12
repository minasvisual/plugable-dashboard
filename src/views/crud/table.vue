<template>
  <div>
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
        :pagination-props="{ pageSizes: [15, 50, 150] }" 
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
  </div>
</template>
<script>
import { get, sortBy, debounce } from 'lodash';
import { getData, deleteData } from '../../services/models'
import { filterParams, schemaColumns } from '../../services/helpers'
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
      titles:[],
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
    schema: Object,
  },
  mounted(){
   
    this.titles = schemaColumns([ ...this.schema.properties ])

    //this.fetchData({ type page:1, pageSize:15 })
  },
  methods:{
    fetchData: debounce(async function(queryInfo){
      this.queryInfo = queryInfo
      this.schema.api = filterParams(this.schema.api, queryInfo) 

      console.log('getdata', this.schema.api)
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
        deleteData(this.schema, row).then(() => {
          this.$message('Deleted with success') 
          this.data.rows.splice(this.data.rows.indexOf(row), 1)
          this.$emit('actions:delete', row)
        })
    },
    handleSelectionChange(val) {
      this.selectedRow = val
    },
    async bulkDelete() {
      if( confirm(`Are you sure to delete ${this.selectedRow.length} rows?`) ){
        for(let row of this.selectedRow){
           await deleteData(this.schema, row)
              .then(() => {
                this.$emit('actions:delete', row)
              })
              .catch(() => this.$message(e.message, 'danger') )
        }
        
        this.fetchData(this.queryInfo)
        this.$message('Deleted with success') 
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