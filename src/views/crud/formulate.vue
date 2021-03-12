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
import { get } from 'lodash'
import { saveData } from '../../services/models'
import { schemaColumns } from '../../services/helpers'

export default {
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
      this.form =  this.schema.properties
      this.columns = schemaColumns(this.schema.properties)
      this.columns.map(i => {
        if( this.data[i.prop] && ['date'].includes(i.type) ){
          //console.log('changed', this.data[i.prop], this.data[i.prop].replace(' ', 'T'))
          this.data[i.prop] = this.data[i.prop].replace(' ', 'T')
        } 
      })
      this.model = this.data
    },
    methods: {
      async submit (data) {
        let response = await saveData(this.schema, data)
              .then((res) => {
                  this.$message('Saved with success') 
                  this.$emit('close', { refresh: true })
                  this.$emit('model:saved', {data, response})
              }) 
              .catch(e => this.$message( get(e, 'response.data.message', e.message ) )) 
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