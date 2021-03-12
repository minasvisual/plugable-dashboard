<template>
   <CSelect
      type="select"
      v-if="renderComponent"
      v-model="context.model"
      v-bind="context.attributes"
      :options="context.options"
    />
</template>

<script>
import { get } from 'lodash'
import { request } from '../../../services/models'
import { interpolate } from '../../../services/helpers'
export default {
  props: {
    context: {
      type: Object,
      required: true
    },
  },
  data(){return{
    renderComponent: true
  }},
  computed:{
    type(){ return this.context.attributes.attributes.type || 'select' },
  },
  created(){
    let { attributes } = this.context.attributes

    this.getOptions(attributes || {})
  },
  methods:{
    change(value){
      this.context.model = value
    },
    forceRerender() {
      this.renderComponent = false;

      this.$nextTick(() => {
        this.renderComponent = true;
      });
    },
    async getOptions({ url, requestOptions={}, fieldLabel, fieldValue, wrapData=null }){
      try{
        if( url ){
          let data = await request(url, { method:'get', ...requestOptions })

          if( wrapData )
            data = get(data, wrapData, data)

          this.context.options = data && data.map((i, k) => ({ 
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