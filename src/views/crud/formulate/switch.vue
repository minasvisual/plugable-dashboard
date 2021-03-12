<template>
  <div
    :class="`formulate-input-element formulate-input-element--${context.type}`"
    :data-type="context.type"
  >
    <CSwitch
      @update:checked="toggle"
      v-bind="context.attributes"
      :checked="context.model === true"
      color="info"
      variant="3d" 
    />
    
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
    model () {
      return this.context.model
    },
  },
  methods:{
    toggle(data){
      this.context.model = data
    }
  }
}
</script>

<style>
.formulate-input-element--switch {
  display: flex;
  align-items: center;
  min-height: 35px;
}
</style>