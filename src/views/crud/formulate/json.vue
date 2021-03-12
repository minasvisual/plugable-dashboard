<template>
  <div
    :class="`formulate-input-element formulate-input-element--${context.type}`"
  >
      <VJsoneditor v-model="model" 
          height="auto" 
          v-bind="context.attributes"
      ></VJsoneditor>
  </div>
</template>

<script>
import VJsoneditor from 'v-jsoneditor'
export default {
  components: {
      VJsoneditor
  },
  props: {
    context: {
      type: Object,
      required: true
    },
  },
  computed: {
    model:{
      get(){
        try{
          return this.context.attributes.parse ? JSON.parse(this.context.model) : this.context.model
        }catch(e){
          return this.context.model
        }
      },
      set(value){
        this.context.model = this.context.attributes.parse ? JSON.stringify(value) : value
      }
    },
  }
}
</script>
