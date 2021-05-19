<template>
  <CCardBody v-if="renderComponent">
    <CDataTable
      :items="data.rows"
      :fields="titles"
      column-filter
      table-filter
      items-per-page-select
      :items-per-page="perPage"
      hover
      sorter
      pagination
    >

      <template #selected-header>
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

    </CDataTable>
  </CCardBody>
</template>

<script>  
import { get, has, debounce, isEqual, filter } from 'lodash'

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
  name:"TableLocale",
  mixins:[TableMixin],
   rops:{
    schema: {
      type:Object,
      default: {}
    },
    resource:{
      type: [Array, Object, String],
      default: () => []
    }
  },
  components:{
    CellTypes
  },
  data () {
    return {
      perPage: 5,
      data: {},
      details: [],
      selectedRow: [],
      collapseDuration: 0,
      renderComponent: false
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
     
    toggleDetails (item) {
      this.$set(this.items[item.id], '_toggled', !item._toggled)
      this.collapseDuration = 300
      this.$nextTick(() => { this.collapseDuration = 0})
    },
   
  },
  mounted(){
      this.data = { rows: (this.resource || []), total: (  Array.isArray(this.resource) ? this.resource.length : 0 ) }
      this.renderComponent = true
  }
}
</script>