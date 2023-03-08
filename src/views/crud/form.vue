<template>
  <section v-if="formopen">
    <div class="row">
      <div class="col">
        <Toolbar :schema="schema" class="d-flex ">
          <CButton @click="loadForm">
            <CIcon name="cil-reload" />
          </CButton>
        </Toolbar>
      </div> 
    </div>
     <Forms  
        :formopen="formopen"
        :schema="schema" 
        :data="row"
        @model:saved="formHook"
        @close="closeForm"
      /> 
  </section>
</template>


<script>
import { has, get, set } from 'lodash'
import { objectDeepDiff } from '../../services/helpers'
import ControllerMixin from '../../services/controller.mixin'
import SessionMixin from '../../services/session.mixin'
 
import Forms  from './formulate'
import Toolbar  from './table-types/Toolbar.vue'
export default {
  name: "FormBase",
  mixins:[ControllerMixin, SessionMixin],
  components: { Forms, Toolbar },
  props:{
    schema: {
      type: Object,
      default: () => ({})
    },
    layout:{
      type: String
    },
  }, 
  data(){
    return{ 
      row:{}, 
      formopen: false,
    }
  },
  watch:{
    row(newVal, oldVal){ 
      if( 
          typeof newVal == 'object' && 
          typeof oldVal == 'object' && 
          Object.keys(newVal).length > 0 &&
          Object.keys(oldVal).length > 0 &&
          !objectDeepDiff(newVal, oldVal) 
      ){
        console.debug('form row')
        this.alertDataChange()
      }
    }
  },
  computed:{
    action(){ 
      return this.row && this.row.id ? 'update': 'create'
    },
    formTitle(){ 
      return this.row && this.row.id ? `Update ${this.schema.title} | ID: ${this.row.id}`: `New ${this.schema.title}`
    },
    crud(){
      return this.$store.state.crud || {}
    }
  },
  methods:{
    loadForm(){
      try{ 
            console.debug("load form result init", this.row)
        this.getData(this.schema, {}).then( (data) => {
            console.debug("load form result", data)
            this.row = { ...(data.rows || data) }
            this.$store.commit('set', ['crud', {...this.crud, row: this.row }] )
            this.formopen = true
        })

      }catch(err){
        this.$alert('Form error', err)
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
        this.$alert('Form submit error', err)
      }
    },
    closeForm(){  
        this.formopen = false;
        this.loadForm()
        this.$store.commit('set', ['crud', {...this.crud, row: null }] )
    },
    alertDataChange(){ 
      this.$bus.$emit( `${this.schema.domain}:grid:changed`, { title: "Pluggable Dashboard Alert", body: `You have changes on ${this.schema.title}` })
    },
    loadActions(){
      this.$bus.$on(`${this.schema.domain}:save`, this.formHook); 
      this.$bus.$on( `${this.schema.domain}:reload`, this.loadForm.bind(this) )
    },
    destroyActions(){
      this.$bus.$off(`${this.schema.domain}:save`, this.formHook); 
      this.$bus.$off( `${this.schema.domain}:reload`, this.loadForm.bind(this) )
    }
  },
  async mounted(){
    await this.loadForm()
    console.log("load form run", this.schema)

    this.loadActions()
  },
  
  beforeDestroy() {
    this.destroyActions()
  },
}
</script>