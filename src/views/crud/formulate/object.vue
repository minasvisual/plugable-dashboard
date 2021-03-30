<template>
    <FormulateForm
      v-model="context.model"
      :schema="context.options"
    />
</template>

<script>
export default {
  props: {
    context: {
      type: Object,
      required: true
    },
  }
}
</script>