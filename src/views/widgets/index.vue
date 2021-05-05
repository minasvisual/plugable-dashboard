<template >
  <div class="row" v-if="renderComponent && schemas.length > 0">
      <Widget v-for="(item, k) of schemas" :key="k" :schema="item" />
  </div>
</template>

<script>
import { request } from '../../services/models'
import Auth from '../crud/auth'
import Widget from './base'
 
export default {
  components:{
    Widget, Auth
  },
  data() {
    return {
      schemas:[],
      renderComponent: false
    }
  },
  watch:{
    async current(newProject, oldProject){
        if( newProject )
          await this.loadWidgets()
    }
  },
  computed:{
    current(){
      return this.$store.state.currentProject || {}
    },
    widgets(){
      return Object.values( this.current.widgets || {} )
    }
  },
  methods:{
    async loadWidgets(){
      for(let row of this.widgets){
        if( row.resource ){
          let data = await request(this.current.resources_path + row.resource )
          if( !data.widget ) return this.$message("Error to load widget resource");

          this.schemas.push(data)
        }
      }
        
      this.renderComponent = true
    }
  },
  async mounted(){
    await this.loadWidgets()
  }
}
</script>