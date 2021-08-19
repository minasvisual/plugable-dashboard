<template> 
    <img v-if="src" :src="src" v-bind="$attrs" /> 
    <span v-else>Empty</span> 
</template>

<script>
import { get } from 'lodash' 
import InputMixin from '../../../services/input.mixin'
export default {
    mixins:[InputMixin],
    computed:{
        src(){
            return get(this.formValues, this.$attrs.model)
        }
    }
}
</script>