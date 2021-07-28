<template>
  <div
    :class="`formulate-input-element formulate-input-element--${context.type}`"
    :data-type="context.type"
  >
    <FormulateSlot
      name="prefix"
      :context="context"
    >
      <component
        :is="context.slotComponents.prefix"
        v-if="context.slotComponents.prefix"
        :context="context"
      />
    </FormulateSlot>
    <c-switch
      @update:checked="toogle"
      :checked="context.model == true"
      color="info"
      variant="3d" 
    /> 
    <FormulateSlot
      name="suffix"
      :context="context"
    >
      <component
        :is="context.slotComponents.suffix"
        v-if="context.slotComponents.suffix"
        :context="context"
      />
    </FormulateSlot>
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
  methods:{
    toogle(data){
      this.context.model = data
      this.$emit('blur-context', data)
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