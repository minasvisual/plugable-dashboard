<template>
     <FormulateForm   
          :schema="properties" 
    />
</template>

<script> 
export default {
    props: {
        properties:{
            type: Array,
            default: () => []
        },
        type:{
            type: String
        }
    },
    computed:{
        form(){
            return {
                type: this.type || 'grid'
            }
        }
    },
    data() {
        return {

        }
    },
}
</script>
