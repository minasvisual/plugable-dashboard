<template>
  <section>
    <Table 
      ref="tables" 
      v-if="schema.api"
      :schema="schema"
      :layout="layout"
      @actions:create="actions('FORM_CREATE', $event)"
      @actions:edit="actions('FORM_EDIT', $event)"
      @actions:delete="actions('FORM_DELETE', $event)"
      @actions:deleteBatch="actions('FORM_DELETEBATCH', $event)" 
    />

    <CModal
      :title="formTitle"
      :show.sync="formopen"
      size="lg"
      :closeOnBackdrop="false"
    >
        <Forms 
          v-if="formopen"
          :formopen="formopen"
          :schema="schema" 
          :data="row"
          @model:saved="formHook"
          @close="closeForm"
        /> 
        <template slot="footer"><span></span></template>
    </CModal>
  </section>
</template>

<script>
import { has, get, set } from 'lodash'
import ControllerMixin from '../../services/controller.mixin'
import SessionMixin from '../../services/session.mixin'

import Table from './table'
import Forms  from './formulate'
export default {
  mixins:[ControllerMixin, SessionMixin],
  components: { Table, Forms },
  props:{
    schema: {
      type: Object,
      default: {}
    },
    layout:{
      type: String
    }
  }, 
  data(){
    return{
      models: {},
      row:{},
      formopen:false,
      formLogin:true,  
    }
  },
  computed:{
    formTitle(){ 
      return this.row && this.row.id ? `Update ${this.schema.title} | ID: ${this.row.id}`: `New ${this.schema.title}`
    },
    crud(){
      return this.$store.state.crud || {}
    }
  },
  methods:{
    reloadData() {
      this.$refs.tables.fetchData({ type: "pageChange" });
      this.formopen = false;
    },
    closeForm({ refresh }){
        if( refresh )
          this.reloadData()
          
        this.formopen = false;
        this.$store.commit('set', ['crud', {...this.crud, row: null }] )
    },
    actions(action, data){
      if( action == 'FORM_CREATE'){
        this.formopen = true;
        this.row = {}
        this.$store.commit('set', ['crud', {...this.crud, row: {} }] )
      }else if(action == 'FORM_EDIT'){
        this.formopen = true;
        this.row = { ...data }
        this.$store.commit('set', ['crud', {...this.crud, row: this.row }] )
      }else if(action == 'FORM_DELETE'){
          this.deleteData(this.schema, data).then(() => {
            this.$message('Successfully deleted!')
            this.reloadData()
          })
      }else if(action == 'FORM_DELETEBATCH'){
          let proms = data && data.map(i => this.deleteData(i))
          
          Promise.all(proms)
              .catch( err => this.$message(err.message, 'danger'))
              .then( res => this.$message('All rows delete successfully'))
      }
    }, 
    async formHook(data){
      try{
        return await this.saveData(this.schema, data)
          .then((res) => {
              this.closeForm({ refresh: true })
              return res
          })
      }catch(err){
        console.debug('Form submit error', err)
      }
    }
  }
}
</script>