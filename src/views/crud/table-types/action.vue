<template>
    <FormulateInput 
        input-class="p-1"
        :placeholder="( cell.action.type == 'select' ? 'select..':'empty' )"
        v-if="cell.action.type !== 'button'"
        @blur-context="emitClick"
        v-model="data"
        v-bind="{ ...cell, type: cell.action.type, name: cell.key, label: false }"
    />
    <CButton 
        v-else
        size="sm"
        color="info"
        v-on:click="emitClick" 
        v-bind="{ ...cell, type: cell.action.type }"
    >   
        {{ replaceContent() }}
    </CButton>
</template>
<script>
import { get } from 'lodash'
import { interpolate } from '../../../services/helpers'
export default {
    props:['data', 'cell', 'row'],
    computed:{
        inputType(){
            return get(this.cell, 'action.type', 'button')
        },
        sendType(){
            if( this.cell?.action?.source == 'cell')
                return this.cell
            else if( this.cell?.action?.source == 'row')
                return { ...this.row, [this.cell.key]: this.data }
            else if( this.cell?.action?.source == 'field')
                return { [this.cell.key]: this.data }
            else    
                return this.data
        }
    },
    methods: {
        replaceContent() {
            if( this.inputType !== 'button' )
                return false

            if( this.cell?.action?.label ) 
                return interpolate(this.cell.action.label, {data: this.data, action: this.cell.action, row: this.row  }).toString()
            else
                return this.data.toString()
        },
        emitClick(){
            if( !this.cell?.action?.handler || this.data == this.row[this.cell.key] ) return;

            this.row[this.cell.key] = this.data
            this.$bus.$emit(this.cell?.action?.handler, this.sendType)
            console.debug("table/Actions emitclick called", this.cell?.action?.handler, this.sendType)
        }
    }
}
</script>

<style scoped>
    select{
        padding: 3px !important;
    }
</style>
