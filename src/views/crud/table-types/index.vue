<template>
    <span>
        <span v-if="cell.type == 'tags'">
            <Tags :data="data[cell.key]" :cell="cell" :row="data" v-on:click="emitAction"  />
        </span>
        <span v-else-if="cell.type == 'image'">
            <ImgCell :data="data[cell.key]" :cell="cell" :row="data" v-on:click="emitAction"  />
        </span>
        <span v-else-if="cell.type == 'switch'">
            <CSwitch
                :checked="data[cell.key] === true"
                size="sm"
                variant="3d" 
                color="info"
            />
        </span>
        <span v-else-if="cell.type == 'select' || cell.type == 'autocomplete'">
           <GridSelect :data="data[cell.key]" :cell="cell" :row="data" v-on:click="emitAction"   />
        </span>
        <span v-else-if="cell.type == 'belongsTo'">
           <BelongsTo :data="data[cell.key]" :cell="cell" :row="data" v-on:click="emitAction"   />
        </span>
        <span v-else-if="cell.type == 'link'">
            <HrefLink :data="data[cell.key]" :cell="cell" :row="data" v-on:click="emitAction"  />
        </span>    
        <span v-else-if="cell.type == 'expression'">
            <Expression  :data="data[cell.key]" :cell="cell" :row="data" v-on:click="emitAction"   />
        </span>
        <span v-else-if="cell.type == 'date'" v-on:click="emitAction" >
            {{ data[cell.key] | formatDate(cell.action.format || 'MM/DD/YYYY hh:mm', cell.action.from || null, cell.action.utc || false) }}
        </span>
        <span v-else-if="cell.type == 'action'"  >
            <Actions :data.sync="data[cell.key]" :cell.sync="cell" :row.sync="data" />
        </span>
        <span v-else-if="cell.type == 'object'" v-text="get(data, `row.${cell.action.name}`, data[cell.key])" v-on:click="emitAction" ></span>
        <span v-else-if="cell.type == 'html'" v-html="data[cell.key]" v-on:click="emitAction" ></span>
        <span v-else v-text="data[cell.key]" v-on:click="emitAction" ></span>
    </span>
</template>

<script>
import { get } from 'lodash'
import ImgCell from './image'
import Tags from './tags'
import HrefLink from './link'
import Expression from './expression'
import GridSelect from './select'
import Actions from './action'
import BelongsTo from './belongsTo'

export default {
    components:{
        ImgCell,
        Tags,
        HrefLink,
        Expression,
        GridSelect,
        Actions,
        BelongsTo,
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
    computed:{
        inputType(){
            return get(this.cell, 'click.type', 'link')
        },
        sendType(){
            if( this.cell?.action?.source == 'cell')
                return this.cell
            else if( this.cell?.action?.source == 'row')
                return { ...this.data }
            else if( this.cell?.action?.source == 'field')
                return { [this.cell.key]: this.data[this.cell.key] }
            else    
                return this.data[this.cell.key]
        }
    },
    methods:{
        emitAction(){
            if( this.cell.type == 'action' || !this.cell.action || !this.cell.action.event || this.cell.action.event != 'click' ) return;
            this.$bus.$emit(this.cell.action?.handler, this.sendType)
            console.log("chamado event", this.cell)
        },
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