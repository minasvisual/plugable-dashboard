<template>
  <div
    :class="`formulate-input-element formulate-input-element--${context.type}`"
    :data-type="context.type"
  >
    <div style="margin-bottom: 10px">
      <el-row>
        <el-col :span="16">
          <span v-if="selectedRow.length > 0" 
                class="selectedActions">
            <label>Selected:</label> 
            <CButton @click="bulkDelete">
                <CIcon name="cil-trash" />
            </CButton>
          </span>
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
        :data="model" 
        :total="model.length" 
        :table-props="tableProps"
        :pagination-props="{ pageSizes: [5, 20, 50, 150] }" 
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
              <CellTypes :cell="title" :data="props"/>
          </template>
      </el-table-column>

      
      <el-table-column
        prop="actions" 
        label="" 
        :sortable="false">
          <template slot-scope="props" > 
            <section class="text-right">
              <CButton  class="card-header-action mr-3"  @click="onEdit(props.row, props.$index)"> 
                <CIcon name="cil-pencil" />
              </CButton>
              <CButton   class="card-header-action"  @click="onDelete(props.row, props.$index)"> 
                <CIcon name="cil-trash" />
              </CButton>
            </section>
          </template>
      </el-table-column>

    </data-tables>

    <CModal
      :title="'Edit row'"
      :show.sync="formopen"
      :closeOnBackdrop="false"
    >
      <FormulateForm 
          v-if="row && row.data"
          v-model="row.data"
          :schema="schema.properties"
          @submit="submit"
          #default="{ hasErrors }"
      >

        <div class="action-buttons mt-3">
          <CButton
              type="button"
              color="danger"
              class="mr-2"
              @click="() => formopen = null"
            >
                Cancel
          </CButton>
          <CButton
              type="submit"
              color="success"
              :disabled="hasErrors"
            >
                Save
          </CButton>
        </div>
      </FormulateForm>
      <template slot="footer"><span></span></template>
    </CModal>
  </div>
</template>

<script>
import { get, sortBy, debounce } from 'lodash';
import { filterParams, schemaColumns } from '../../../services/helpers'

import CellTypes from '../table-types/index'
export default {
  components:{
    CellTypes
  },
  props: {
    context: {
      type: Object,
      required: true
    },
  },
  data () {
    return {
        renderComponent: true,
        formopen: false,
        queryInfo: {},
        search:'',
        actions:{},
        columns: {},
        titles:[],
        selectedRow: [],
        filters: [{}],
        tableProps:{
          defaultSort: { prop: 'id', order: 'descending'} 
        },
        row: null
    }
  },
  computed: {
    model:{
      get(){ 
          return this.context.model || []
      },
      set(value){
          this.context.model = value
      }
    },
    schema(){
      return this.context.attributes?.schema || {}
    }
  },
  mounted(){
    this.titles = schemaColumns([ ...this.schema?.properties ])
  },
  methods: {
    onCreate() { 
      this.row = { index:null, data:{} }
      this.formopen = true
    },
    submit(data){
      if( this.row.index === null ){
        this.context.model.push(data)
      }else{
        this.context.model[this.row.index] = data;
      }
      this.row = null
      this.formopen = false
      this.$message('Added with success') 
      this.forceRerender()
    },
    onEdit(data, index){
      this.row = { index, data }
      this.formopen = true
    },
    onDelete(row, index){
      if( confirm('Are you sure to delete?') ){
       this.model.splice(index, 1)
       this.$message('Deleted with success') 
      }
    },
    handleSelectionChange(val) {
      console.log(val)
      this.selectedRow = val
    },
    async bulkDelete() {
      if( confirm(`Are you sure to delete ${this.selectedRow.length} rows?`) ){
        for(let row of this.selectedRow){
            this.model.splice(row, 1)
        }
        
        this.formopen = false
        this.$message('Deleted with success') 
      }
    },
    forceRerender() {
      this.renderComponent = false;

      this.$nextTick(() => {
        // Add the component back in
        this.renderComponent = true;
      });
    }
  }
}
</script>

<style scoped>
@import "https://cdn.quilljs.com/1.2.6/quill.snow.css";
</style>

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