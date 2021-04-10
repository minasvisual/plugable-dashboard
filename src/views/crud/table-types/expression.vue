<template>
    <span v-html="expression"></span >
</template>

<script>
import { interpolate } from '../../../services/helpers'
import { get } from 'lodash'

export default {
    props:['data', 'cell'],
    computed:{ 
        expression(){ 
            return interpolate( get(this.cell, 'action.template', '{data}'), {data: this.data, cell: this.cell} ) 
        }
    }
}
</script>