import { getDataObject } from './models'
import { filterParams } from './helpers'
import { get, set } from 'lodash'

export default { 
  data () {
    return { 
      loading: false, 
    }
  },
  computed: { 
    model () {
      return this.context.model
    }, 
    attributes () {
      return this.context.attributes || {}
    }, 
    currentProject(){
      return this.$store.state.currentProject || null
    }, 
    request(){
      return get(this.$store, `state.auth.${this.currentProject.code}.request`, {})
    },  
  },
  methods:{
    requestModel(schema, data, opts){
      try{
        let { api = {} } = schema 
        
        if( api.rootApi ){
          this.loading = true;
          schema.api = Object.assign(schema.api, this.request)

          schema.api = filterParams( ( schema.api || {} ), data )

          return getDataObject(schema, data, opts).then((data) => {
            this.loading = false; 
            return data
          })
        }else{
          return Promise.reject({"message": "required rootApi"})
        }
      }catch(e){
          console.log('Erro select input', e)
          return Promise.reject({"message": "required rootApi"})
      }
    }
  },

 }