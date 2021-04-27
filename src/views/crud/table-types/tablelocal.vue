<template>
  <section>
    <div style="margin-bottom: 10px">
      <el-row>
        <el-col :span="16">
          <span v-if="selectedRow.length > 0" class="selectedActions">
            <label>Selected:</label> 
            <CButton @click="bulkDelete">
                <CIcon name="cil-trash" />
            </CButton>
          </span>
          <!-- <CButton @click="fetchData({type:'pageChange'})">
            <CIcon name="cil-reload" />
          </CButton> -->
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
    <data-tables 
        v-if="renderComponent"
        :data="data.rows" 
        :table-props="tableProps"
        :pagination-props="{ pageSizes: [10, 20, 50, 100] }" 
        :pageSize="10"
        :action-col="actionCol" 
        :filters="filters" 
        @selection-change="handleSelectionChange"
    >
      <div slot="empty" style='color: red'>
        <CSpinner v-if="loading" color="info"/>
        <span v-else >No data found</span>
      </div>

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
            <section class="d-flex text-right">
              <CButton  class="card-header-action mr-3"  @click="onEdit(props.row)"> 
                <CIcon name="cil-pencil" />
              </CButton>
              <CButton   class="card-header-action"  @click="onDelete(props.row)"> 
                <CIcon name="cil-trash" />
              </CButton>
            </section>
          </template>
      </el-table-column>

    </data-tables>
  </section>
</template>


<script>
import { get, has, debounce } from 'lodash'
import { schemaColumns, filterParams } from '../../../services/helpers'

import TableMixin from '../../../services/table.mixin'
import CellTypes from './index'

export default {
  name:"TableLocal",
  mixins:[TableMixin],
  components:{
    CellTypes
  },
  data(){
    return{
      renderComponent: false,
      loading: false,
      layout: null,
      queryInfo: {},
      search:'',
      actions:{},
      columns: {},
      data:{
        rows:[],
        total:0
      },
      tableProps:{
        defaultSort: { prop: (this.schema.primaryKey || 'id'), order: 'descending' }
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
      default: {}
    },
    resource:{
      type: [Array, Object, String],
      default: () => []
    }
  },
  computed:{
    titles(){
      return has(this.schema, 'properties') ? schemaColumns([ ...this.schema.properties ]) : []
    }
  },
  methods:{
    resetGrid(){
      this.data = { rows:[], total:0 }
      this.loading = true
    }, 
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
  },
  mounted(){
      this.layout = 'local'
      this.data = { rows: (this.resource || []), total: (  Array.isArray(this.resource) ? this.resource.length : 0 ) }
      this.loading = false
      this.renderComponent = true
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