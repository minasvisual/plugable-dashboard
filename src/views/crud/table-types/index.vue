<template>
    <span>
        <span v-if="cell.type == 'tags'">
            <Tags :data="data[cell.key]" :cell="cell" :row="data"  />
        </span>
        <span v-else-if="cell.type == 'image'">
            <ImgCell :data="data[cell.key]" :cell="cell" :row="data"  />
        </span>
        <span v-else-if="cell.type == 'switch'">
            <CSwitch
                :checked="data[cell.key] === true"
                size="sm"
                variant="3d" 
                color="info"
            />
        </span>
        <span v-else-if="cell.type == 'select'">
           <GridSelect :data="data[cell.key]" :cell="cell" :row="data"  />
        </span>
       
        <span v-else-if="cell.type == 'action'">
            <ActionLink :data="data[cell.key]" :cell="cell" :row="data"  />
        </span>    
        <span v-else-if="cell.type == 'expression'">
            <Expression  :data="data[cell.key]" :cell="cell" :row="data"  />
        </span>
        <span v-else-if="cell.type == 'date'">
            {{ data[cell.key] | formatDate(cell.action.format || 'MM/DD/YYYY hh:mm', cell.action.from || null, cell.action.utc || false) }}
        </span>   
        <span v-else-if="cell.type == 'object'" v-text="get(data, `row.${cell.action.name}`, data[cell.key])"></span>
        <span v-else-if="cell.type == 'html'" v-html="data[cell.key]"></span>
        <span v-else v-text="data[cell.key]"></span> 
    </span>
</template>

<script>
import { get } from 'lodash'
import ImgCell from './image'
import Tags from './tags'
import ActionLink from './actions'
import Expression from './expression'
import GridSelect from './select'

export default {
    components:{
        ImgCell,
        Tags,
        ActionLink,
        Expression,
        GridSelect,
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