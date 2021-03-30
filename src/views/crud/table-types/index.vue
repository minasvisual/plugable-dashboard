<template>
    <span>
        <span v-if="cell.type == 'tags'">
            <Tags :data="data.row[cell.prop]" :cell="cell"  />
        </span>
        <span v-else-if="cell.type == 'image'">
            <ImgCell :data="data.row[cell.prop]" :cell="cell" />
        </span>
        <span v-else-if="cell.type == 'switch'">
            <CSwitch
                :checked="data.row[cell.prop] === true"
                size="sm"
                variant="3d" 
                color="info"
            />
        </span>
        <span v-else-if="cell.type == 'select'">
            <CSelect
                readonly
                v-model="data.row[cell.prop]"
                :options="cell.options"
                size="sm"
            />
        </span>
       
        <span v-else-if="cell.type == 'action'">
            <ActionLink :data="data.row[cell.prop]" :cell="cell" />
        </span>    
        <span v-else-if="cell.type == 'date'">
            {{ data.row[cell.prop] | formatDate(cell.action.format || 'MM/DD/YYYY hh:mm', cell.action.from || null) }}
        </span>   
        <span v-else-if="cell.type == 'object'" v-text="get(data, `row.${cell.action.name}`, data.row[cell.prop].toString())"></span>
        <span v-else-if="cell.type == 'html'" v-html="data.row[cell.prop]"></span>
        <span v-else v-text="data.row[cell.prop]"></span> 
    </span>
</template>

<script>
import { get } from 'lodash'
import ImgCell from './image'
import Tags from './tags'
import ActionLink from './actions'
export default {
    components:{
        ImgCell,
        Tags,
        ActionLink
    },
    props:{
        data: {
            type: Object,
            required: true
        }, 
        cell: {
            type: Object,
            required: true
        },
    },
    methods:{
        get: get
    }
}
</script>

<style lang="scss">
.cell select{
  background: transparent !important;
  border: none;
  -webkit-appearance: none;
    -moz-appearance: none;
    text-indent: 1px;
    text-overflow: '';
}
.cell .form-group{
  padding:0  !important;
  margin:0 !important;
}
</style>