<template>  
    <component :is="tag" v-html="row" />  
</template>

<script>
import { get } from 'lodash' 
import { interpolate } from '../../../services/helpers'
import InputMixin from '../../../services/input.mixin'
export default {
    mixins:[InputMixin],
    computed:{
        tag(){
            return get(this.$attrs, 'tag', 'section')
        },
        row(){
            return interpolate( get(this.$attrs, 'expression', 'empty'), this.formValues)
        }
    }
}
</script>