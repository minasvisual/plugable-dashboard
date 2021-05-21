<template>
<span>
  <div
    :class="`formulate-input-element formulate-input-element--${context.type} d-flex align-items-center`"
    :data-type="context.type"
  >
    <div class="input-wrapper w-100">
      <input type="text" readonly v-bind="context.attributes"  >
      <button @click="formopen"></button>

      <input type="hidden" v-model="context.model"  >
    </div>
    <img v-if="context.model" :src="context.model" alt="" height="80" width="auto" class="ml-3">
  </div>
    
    <CModal
      title="Image preview"
      :show.sync="formopen"
      :backdrop="false"
      size="lg"
      :closeOnBackdrop="false"
    >
        <template slot="body-wrapper">
            <TableServer 
                v-if="schema.api.rootApi" 
                ref="tables" 
                :schema="schema" 
                :resource="resource"
            />
            <button @click="getSelected()">Select</button>
        </template>
    </CModal>

</span>
</template>
<script>
import TableServer from '../table-types/TableRemote'

export default {
    components: { TableServer },
    props: {
        context: {
        type: Object,
        required: true
        },
    },
    data() {
      return {
        row: {}
      }
    },
    computed: {
        row:{
          get(){
            return {}
          },
          set(row){
            this.context.model = row[this.schema.primaryKey]
          }
        },
        model () {
            return this.context.model
        },
        schema(){
          return this.context.attributes.schema || {}
        }
    },
    methods:{
      getSelected(){
        if( has(this.$refs, 'tables.selectedRows') )
          this.row = has(this.$refs, 'tables.selectedRows', {})
      }
    }
}
</script>