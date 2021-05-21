<template>
  <section>
    <CDataTable
      :items="(data.rows || [])"
      :fields="titles"
      :columnFilter='{ external: true, lazy: true }'
      :sorter='{ external: true, resetable: true }'
      :items-per-page="perPage"
      :clickableRows="true"
      cleaner
      hover
      size="sm"
      @update:sorter-value="(qr) => fetchQueryInfo('sort', qr)" 
      @update:column-filter-value="(qr) => fetchQueryInfo('filter', qr)" 
    >

      <template #over-table >
        <section class="row py-2">
          <div class="col-7 d-flex ">
            <span v-if="selectedRow.length > 0" class="selectedActions">
              <label class="m-0">Selected: {{ selectedRow.length }} </label> 
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
          </div>
          <div class="col-5 d-flex justify-content-end align-items-center">
            <span>Limit: </span>
            <CSelect :options="showPerPage" v-model="perPage" class="m-0 ml-2"
                    @update:value="() => fetchQueryInfo('pageSize', perPage)" />
          </div>
        </section>
      </template>

      <template #selected-header="{item}"> 
           <CInputCheckbox type="checkbox" inline @update:checked="selectionAll()" style="padding:0; margin:0;" /> 
      </template>
      
      <template v-for="cell of titles" #[cell.key]="{item, index}">
        <td :class="['td-'+cell.key]">
          <CellTypes :cell="cell" :data="item" />
        </td>
      </template>

      <template #selected="{item}">
        <td :class="['td-selection']">
           <CInputCheckbox type="checkbox" :checked="isSelected(item)" @update:checked="selectionChange(item)" />
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
            :pages="calcPages(data.total, perPage)"
            size='sm'
            align="center"
            @update:activePage="(qr) => fetchQueryInfo('page', qr)"
          />
      </template>
    </CDataTable>
  </section>
</template>

<script>  
import { get, has, debounce, isEqual, filter } from 'lodash'
import { filterParams } from '../../../services/helpers'
import { getData } from "../../../services/models";

import TableMixin from '../../../services/table.mixin'
import CellTypes from './index'

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
      showPerPage: [5, 15, 25, 50, 100], 
      queryInfo: { type: "init", page: 1 },
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
          this.perPage = (this.data.rows && this.data.rows.length) || this.perPage
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
  },
  mounted(){
      this.fetchData(this.queryInfo)
  }
}
</script>