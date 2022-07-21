<template>
  <div
    :class="`formulate-input-element formulate-input-element--${context.type} d-flex align-items-center`"
    :data-type="context.type"
  >
    <div class="input-wrapper w-100">
      <input type="text" v-model="context.model" v-bind="context.attributes" >
    </div>
    <img v-if="model" :src="model" alt="" height="80" width="auto" class="ml-3">
  </div>
</template>

<script>
export default {
  props: {
    context: {
      type: Object,
      required: true
    },
  },
  computed: {
    attributes(){
      return this.context.attributes
    },
    model () {
      if( this.context.model && this.attributes.baseUrl )
        return this.attributes.baseUrl + this.context.model
      else  if( this.context.model && this.context.model.includes('http') )
        return this.context.model
      else
        return null

    },
  }
}
</script>