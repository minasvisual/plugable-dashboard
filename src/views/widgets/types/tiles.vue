<template >
  <section v-if="pivot.data.table" class="row">
    <CWidgetSimple v-for="(tile, i) of datasets" :key="i" :header="tile.label" :text="tile.data.toString()" class="col">
      <CChartLineSimple style="height:50px" border-color="info" />
    </CWidgetSimple>
  </section>
</template>

<script>
import { range, get } from 'lodash'
import { CChartLineSimple, CChartBarSimple } from '../../charts/index'
export default {
  components:{
    CChartLineSimple, CChartBarSimple
  },
  props:{
    schema:{
      type: Object,
      default: {}
    },
    widget:{
      type: Object,
      default:{}
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
          data: get(row, `value[${k}]`, null),
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