<template>
  <section>
    <Loading target="table">
      <CDataTable
        v-if="grid"
        :items="grid"
        :fields="titles"
        :columnFilter='{ external: true, lazy: true }'
        :sorter='{ external: true, resetable: true }'
        :items-per-page="perPage"
        :clickableRows="true"
        cleaner
        hover
        :loading="loading"
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
              <CButton @click="fetchQueryInfo('pageChange', {})">
                <CIcon name="cil-reload" />
              </CButton>
              <CButton @click="onCreate">
                <CIcon name="cil-plus" />
              </CButton>
            </div>
            <div class="col-5 d-flex justify-content-end align-items-center">
              <span>Limit: </span>
              <CSelect :options="showPerPage" :value="perPage" class="m-0 ml-2"
                  @update:value="(num) => fetchQueryInfo('pageSize', num)" />
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
              :pages="calcPages(totals, perPage)"
              size='sm'
              align="center"
              @update:activePage="(qr) => fetchQueryInfo('page', qr)"
            />
        </template>
      </CDataTable>
    </Loading>
  </section>
</template>

<script>  
import { mapState } from 'vuex'
import { get, has, debounce, isEqual, filter } from 'lodash'
import { filterParams } from '../../../services/helpers'
import { getData } from "../../../services/models";

import TableMixin from '../../../services/table.mixin'
import CellTypes from './index'
import Loading from '../../../containers/Loading'

export default {
  name:"TableServer2",
  mixins:[TableMixin],
  props:['schema','resource'],
  components:{
    CellTypes, Loading
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
    ...mapState({
      loading: state => state.loading.table
    }),
    titles(){
      return has(this.schema, 'properties') ? this.schemaColumns([ ...this.schema.properties ]) : []
    },
    grid(){
      this.perPage = get(this.resource, 'rows', []).length
      return  get(this.resource, 'rows', [])
    },
    totals(){
      return get(this.resource, 'total', 0)
    }
  },
  methods: {
    resetGrid(){
      this.data = { rows:[], total:0 }
      this.$store.commit('setLoader', ['table', false])
    },
    fetchData: debounce(async function(queryInfo){
      this.queryInfo = queryInfo
      this.$emit('fetchData', queryInfo)
    }
    // function(queryInfo){
    //   try{
    //     console.debug("table fetchData called", queryInfo, this.schema.api.rootApi)
        
    //     if( this.validateQueryInfo(queryInfo) ){
    //       this.queryInfo = queryInfo
    //       this.schema.api = filterParams(this.schema.api, { ...queryInfo, data: this.resource }) 
    //       //this.resetGrid()

    //       this.$store.commit('setLoader', ['table', true])
    //       this.data = await getData(this.schema, { ...queryInfo, data: this.resource })
    //       this.perPage = (this.data.rows && this.data.rows.length) || this.perPage
    //     }

    //     return true;
    //   }catch(err){
    //     console.log(err)
    //     this.$message(err.message, 'danger')
    //     return false;
    //   }finally{
    //     console.debug('Finally getData tbale')
    //     this.$store.commit('setLoader', ['table', false])
    //   }
    //}
    , 1000),
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
  async mounted(){
      this.data = { rows: get(this.resource, 'rows', []), total: get(this.resource, 'totals', 0) }
      
      //await this.fetchData(this.queryInfo)
      //this.$emit('fetchData', this.queryInfo)
  }
}
</script>