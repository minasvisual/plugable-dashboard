<template>
     <FormulateForm   
          :schema="properties"
          v-model="source"
    />
</template>

<script> 
export default {
    props: {
        properties:{
            type: Array,
            default: () => []
        },
        source:{
            type: Object,
            default: () => ({})
        }
    }
}
</script>
