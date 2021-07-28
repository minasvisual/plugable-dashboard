<template>
    <CSelect
        class="table-select"
        v-if="renderComponent"
        v-model="data"
        :options="(cell.options || options)"
        size="sm"
        :disabled="true"
        v-on="$listeners"
    />
</template>


<script>
import { mergeDeep } from '../../../services/helpers'
import InputMixin from '../../../services/input.mixin'

export default {
  props:['data', 'cell'],
  mixins: [InputMixin],
  data(){return{ 
  }},
  computed:{ 
  },
  async created(){
    let { action, schema } = this.cell

    if( schema )
      schema = await this.loadNestedSchema(schema)
      
    if( action && action.fieldValue )
      schema = { api: mergeDeep(this.convertAttributesToSchema(action), (schema.api || {})) }

    if( schema && schema.api  )
      this.cell.options = await this.getOptions({ ...schema.api }, this.data)

    this.renderComponent = true
  },
  methods:{
    forceRerender() {
      this.renderComponent = false;

      this.$nextTick(() => {
        this.renderComponent = true;
      });
    }, 
  }
}
</script>

<style lang="css">
  .table-select select{
    -webkit-appearance: none;
    -moz-appearance: none;
    text-indent: 1px;
    text-overflow: '';
    border: none  !important;
    background-color: transparent !important;
  }
</style>