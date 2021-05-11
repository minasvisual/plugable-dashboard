<template >
      <CChartBar
          style="min-height:200px"
          :datasets="this.datasets"
          :labels="labels"
          :options="{ maintainAspectRatio: false }"
      /> 
</template>


<script>
import { get } from 'lodash'
import { CChartBar } from '@coreui/vue-chartjs'
export default {
  components:{ CChartBar },
  props:{
    schema:{
      type: Object,
      default: {}
    },
    widget:{
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
      return this.widget.params || {}
    },
    datasets(){
      let datasets = []
      this.pivot.data.table.map( (row, k) => {
        if( row.type == 'colHeader' )
          this.labels = get(this.widget, 'labels', get(row, 'value', []).slice(1).slice(0, -1))

        if( row.type !== 'data' ) return;

        datasets.push({
          data: get(row, 'value', []).slice(1).slice(0, -1),
          label: get(row, 'value[0]', ''),
          backgroundColor: this.params.color || `#${this.getColors()}`
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