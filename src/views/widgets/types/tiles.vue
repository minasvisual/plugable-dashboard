<template >
  <section v-if="pivot.data.table" class="row">
    <CWidgetSimple v-for="(tile, i) of datasets" :key="i" :header="tile.label" :text="tile.data.toString()" class="col">
      <CChartLineSimple style="height:50px" border-color="info" />
    </CWidgetSimple>
  </section>
</template>

<script>
import { get, has } from 'lodash'
import { CChartLineSimple } from '../../charts/index'
export default {
  components:{
    CChartLineSimple
  },
  props:{
    schema:{
      type: Object,
      default: () => ({})
    },
    widget:{
      type: Object,
      default: () => ({})
    },
    pivot:{
      type: Object,
      default: () => ({})
    },
    dataset:{
      type: Object|Array,
      default: () => ({})
    },
  },
  data() {
    return {
      labels:[]
    }
  },
  computed:{
    params(){
      return this.widget.params || {}
    },
    datasets(){
      if( this.widget.source == 'raw' )
        return this.getByDataset()
      else
        return this.getByPivot()
    }
  },
  methods:{
    getColors(){
      return Math.floor(Math.random()*16777215).toString(16).toUpperCase()
    },
    getLabel(row, idx){
      if( !has(this.params,'label') )
        return row
      else
        return Array.isArray( this.params.label ) ? get(this.params, `label[${idx}]`) : get(this.params,'label', row)
    },
    getByDataset(){
      let datasets = []  
      var self = this
      this.labels = get(this.widget, 'labels', this.schema.domain)
      for( let item of this.dataset ){

        this.params.cols.map(function( row, idx ){
          datasets.push({
            data: get(item, row, ''),
            label: self.getLabel(row, idx),
            backgroundColor: get(self.params, `color[${datasets.length}]`) || `#${self.getColors()}`
          })
        })
      }
      return datasets
    },
    getByPivot(){
      let datasets = []
      this.pivot.data.table.map( (row, k) => {
        if( row.type == 'colHeader' )
          this.labels = get(this.widget, 'labels', get(row, 'value', []).slice(1).slice(0, -1))

        if( row.type !== 'data' ) return;

        datasets.push({
          data: get(row, `value[${k}]`, null),
          label: get(row, 'value[0]', ''),
          backgroundColor: get(this.params, `color[${datasets.length}]`) || `#${this.getColors()}`
        })
      })
      return datasets
    },
  }
}
</script>