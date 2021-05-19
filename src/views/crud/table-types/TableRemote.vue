<template>
  <CCardBody>
    <CDataTable
      :items="(data.rows || [])"
      :fields="titles"
      :columnFilter='{ external: true, lazy: true }'
      :sorter='{ external: true, resetable: true }'
      :tableFilter='{ lazy: true }'
      items-per-page-select
      :items-per-page="perPage"
      :clickableRows="true"
      hover
      @update:sorter-value="(qr) => fetchQueryInfo('sort', qr)" 
      @update:column-filter-value="(qr) => fetchQueryInfo('filter', qr)" 
      @pagination-change="(qr) => fetchQueryInfo('sizeChange', qr)" 
      
    >

      <template #selected-header="{item}">
        <td :class="['td-selection']">
           <CInputCheckbox type="checkbox" inline @update:checked="selectionAll()" style="padding:0; margin:0;" />
        </td>
      </template>
      
      <template v-for="cell of titles" #[cell.key]="{item, index}">
        <td :class="['td-'+cell.key]">
          <CellTypes :cell="cell" :data="item" />
        </td>
      </template>

      <template #selected="{item}">
        <td :class="['td-selection']">
           <CInputCheckbox type="checkbox" :checked="isSelected(item)" @update:checked="handleSelectionChange(item)" />
        </td>
      </template>

      <template #actions="{item, index}">
        <td :class="['td-actions']">
            <section class="d-flex text-right">
              <CButton  class="card-header-action mr-3"  @click="onEdit(item)"> 
                <CIcon name="cil-pencil" />
              </CButton>
              <CButton   class="card-header-action"  @click="onDelete(item)"> 
                <CIcon name="cil-trash" />
              </CButton>
            </section>
        </td>
      </template>
      
      <template #no-items-view>
        <h6 class="text-center">No data found</h6>
      </template>

      <template #loading>
        <div class="text-center"><CSpinner color="info"/></div>
      </template>

      <template #under-table>
          <CPagination
            :activePage.sync="currentPage"
            :pages="(data.total || 1) / perPage"
            align="center"
            @update:activePage="(qr) => fetchQueryInfo('page', qr)"
          />
      </template>
    </CDataTable>
  </CCardBody>
</template>

<script>  
import { get, has, debounce, isEqual, filter } from 'lodash'
import { filterParams } from '../../../services/helpers'
import { getData } from "../../../services/models";

import TableMixin from '../../../services/table.mixin'
import CellTypes from './index'

// const fields = [
//   { key: 'username', _style:'min-width:200px' },
//   'registered',
//   { key: 'role', _style:'min-width:100px;' },
//   { key: 'status', _style:'min-width:100px;' },
//   { 
//     key: 'show_details', 
//     label: '', 
//     _style: 'width:1%', 
//     sorter: false, 
//     filter: false
//   }
// ]

export default {
  name:"TableServer2",
  mixins:[TableMixin],
  props:['schema','resource'],
  components:{
    CellTypes
  },
  data () {
    return {
      currentPage: 1,
      perPage: 5,
      queryInfo: { type: "init", page: this.perPage },
      data: {},
      details: [],
      selectedRow: [],
      collapseDuration: 0
    }
  },
  computed:{
    titles(){
      return has(this.schema, 'properties') ? this.schemaColumns([ ...this.schema.properties ]) : []
    },
  },
  methods: {
    resetGrid(){
      this.data = { rows:[], total:0 }
      this.loading = true
    },
    fetchData: debounce(async function(queryInfo){
      try{
        console.debug("table fetchData called", queryInfo, this.schema.api.rootApi)
        
        if( this.validateQueryInfo(queryInfo) ){
          this.queryInfo = queryInfo
          this.schema.api = filterParams(this.schema.api, { ...queryInfo, data: this.resource }) 
          //this.resetGrid()

          this.loading = true
          this.data = await getData(this.schema, { ...queryInfo, data: this.resource })
          console.log('response data', this.data)
        }
        this.loading = false
        return true;
      }catch(err){
        console.log(err)
        this.$message(err.message, 'danger')
        this.loading = false
        return false;
      }
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
    isSelected(val) {
      return this.selectedRow.findIndex(i => isEqual(i, val) ) >= 0
    },
    selectionAll(){
      if( this.selectedRow.length == this.data.rows.length )
        this.selectedRow = []
      else
        this.selectedRow = this.data.rows
    },
    selectionChange(val, index) {
      console.log(val, index)
      let key = this.selectedRow.findIndex(i => isEqual(i, val) )
      if( key >= 0 )   
        this.selectedRow.splice(key, 1)
      else
        this.selectedRow.push(val)
    },
    async bulkDelete() {
      if( confirm(`Are you sure to delete ${this.selectedRow.length} rows?`) ){
          this.$emit('actions:deleteBatch', this.selectedRow)
      }
    },
    getBadge (status) {
      switch (status) {
        case 'Active': return 'success'
        case 'Inactive': return 'secondary'
        case 'Pending': return 'warning'
        case 'Banned': return 'danger'
        default: 'primary'
      }
    },
    toggleDetails (item) {
      this.$set(this.items[item.id], '_toggled', !item._toggled)
      this.collapseDuration = 300
      this.$nextTick(() => { this.collapseDuration = 0})
    },
    fetchQueryInfo(type, data){
      this.queryInfo = {}
      console.log(type, data)
      if( type == 'sort' ){
        this.queryInfo = { type, prop: data.column, order: data.asc ? 'asc':'desc' }
      }
      if( type == 'filter' ){
        this.queryInfo = { type, filters: Object.keys(data).map((key) => ({ prop: key, value: data[key] })) }
      }
      if( type == 'page' ){
        this.queryInfo = { type, page: data }
      }
      if( type == 'pageSize' ){
        this.queryInfo = { type, pageSize: data }
      }
      
      this.fetchData(this.queryInfo)
    }
  },
  mounted(){
      this.fetchData(this.queryInfo)
  }
}
</script>