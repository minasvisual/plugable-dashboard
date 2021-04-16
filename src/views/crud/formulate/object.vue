<template>
    <FormulateForm
      v-model="model"
      :schema="context.options"
    />
</template>

<script>
export default {
  props: {
    context: {
      type: Object,
      required: true,
      default: { model:{}, options:[] }
    },
  },
  computed:{
    model:{
      get(){ 
          return this.context.model || {}
      },
      set(value){
          this.context.model = value
      }
    },
    options(){
      return context.options || []
    }
  }
}
</script>