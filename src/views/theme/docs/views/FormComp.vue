<template>
     <FormulateForm   
          :schema="properties"
          :value="source"
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
    },
    data() {
        return {

        }
    },
}
</script>
