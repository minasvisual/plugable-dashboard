<template>
    <FormulateForm 
          v-model="model"
          :schema="form"
          @submit="submit"
          #default="{ hasErrors }"
    >
    <div class="action-buttons mt-3">
      <CButton
          type="button"
          color="danger"
          class="mr-2"
          @click="$emit('close', { refresh: false })"
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
</template>

<script>
import { schemaColumns, formatDate } from '../../services/helpers'
import ControllerMixin from '../../services/controller.mixin'
export default {
    mixins:[ControllerMixin],
    data(){
      return{
        form: [],
        model: {},
        columns: []
      }
    },
    props:{
      schema: {
        type:Object,
        default: () => ([])
      },
      data: Object
    },
    mounted(){
      ( this.schema.api.bypassGetByid ? Promise.resolve(this.data) : this.getRow()).then( (data) => {
            this.form =  this.schema.properties
            this.columns = schemaColumns(this.schema.properties)
            this.columns.map(i => {
              if( data[i.prop] && ['date'].includes(i.type) ){
                //console.log('changed', this.data[i.prop], this.data[i.prop].replace(' ', 'T'))
                data[i.prop] = formatDate(data[i.prop], 'YYYY-MM-DD\\Thh:mm:ss', null, true)
              } 
            })
            this.model = data
        })
    },
    methods: {
      async submit (data) {
        return await this.saveData(this.schema, data)
              .then((res) => {
                  this.$emit('close', { refresh: true })
                  this.$emit('model:saved', {data, response})
              }) 
      },
      getRow(){
        return this.getData(this.schema, this.data)
      }
    },
}
</script>

<style lang="scss">

.formulate-input{
  width: 100% !important;
  margin-right: 10px;
  &:last-child{
    margin-right: 0;
  }
}
.formulate-input-element{
  	max-width: 100% !important;
    input[readonly] {
      background: #eee;
    }
}
.action-buttons{
  justify-content: flex-end;
  display: flex;
  .formulate-input:first-child{
    margin-right: 10px;
  }
}

</style>