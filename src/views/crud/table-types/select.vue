<template>
    <CSelect
        readonly
        v-if="renderComponent"
        v-model="data"
        :options="(cell.options || [])"
        size="sm"
    />
</template>


<script>
import { get } from 'lodash'
import { request } from '../../../services/models'
import { interpolate } from '../../../services/helpers'
export default {
  props:['data', 'cell'],
  data(){return{
    renderComponent: true
  }},
  computed:{
    currentProject(){
      return this.$store.state.currentProject || null
    }, 
    request(){
      return get(this.$store, `state.auth.${this.currentProject.code}.request`, {})
    }, 
  },
  created(){
    let { action } = this.cell

    this.getOptions(action || {})
  },
  methods:{
    forceRerender() {
      this.renderComponent = false;

      this.$nextTick(() => {
        this.renderComponent = true;
      });
    },
    async getOptions({ url, requestOptions={}, fieldLabel, fieldValue, wrapData=null }){
      try{
        if( url ){
          requestOptions = Object.assign(requestOptions, this.request)
          let data = await request(url, { method:'get', ...requestOptions })

          if( wrapData )
            data = get(data, wrapData, data)

          this.cell.options = data && data.map((i, k) => ({ 
              label: get(i, fieldLabel, i.toString()), 
              value: get(i, fieldValue, k)
            }) 
          )
          this.forceRerender()
        }
      }catch(e){
          alert('Erro to get data from '+ url)
      }
    }
  }
}
</script>