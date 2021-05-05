<template >
      <CChartLine
          style="min-height:200px"
          :datasets="this.datasets"
          :labels="labels"
          :options="{ maintainAspectRatio: false }"
      /> 
</template>


<script>
import { get, countBy, sumBy } from 'lodash'
import { CChartLine } from '@coreui/vue-chartjs'
export default {
  components:{ CChartLine },
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
          this.labels = get(this.schema, 'widget.labels', get(row, 'value', []).slice(1).slice(0, -1))

        if( row.type !== 'data' ) return;

        datasets.push({
          data: get(row, 'value', []).slice(1).slice(0, -1),
          label: get(row, 'value[0]', ''),
          backgroundColor: get(this.params, `color[${datasets.length}]`) || `#${this.getColors()}`
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