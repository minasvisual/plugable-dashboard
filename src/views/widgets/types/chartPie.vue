<template >
      <CChartPie
          style="min-height:200px"
          :datasets="this.datasets"
          :labels="labels"
          :options="{ maintainAspectRatio: false }"
      /> 
</template>


<script>
import { range } from 'lodash'
import { CChartPie } from '@coreui/vue-chartjs'
export default {
  components:{ CChartPie },
  props:{
    schema:{
      type: Object,
      default: {}
    },
    pivot:{
      type: Object,
      default:{}
    },
  },
  data() {
    return {
      labels:[]
    }
  },
  computed:{
    params(){
      return this.schema.widget.params || {}
    },
    datasets(){
      let datasets = []
      this.pivot.data.table.map( (row, k) => {
        if( row.type == 'colHeader' )
          this.labels = row.value.slice(1).slice(0, -1)

        if( row.type !== 'aggregated' ) return;

        datasets.push({
          data: row.value.slice(1).slice(0, -1),
          label: row.value[0] || '',
          backgroundColor: this.params.color || range( row.value.length - 1 ).map( i => `#${this.getColors()}`)
        })
      })

      return datasets
    }
  },
  methods:{
     getColors(){
      return Math.floor(Math.random()*16777215).toString(16).toUpperCase()
    },
  }
}
</script>