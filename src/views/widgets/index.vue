<template >
  <div class="row" v-if="schemas && schemas.length > 0">
        <Base v-for="(item, k) of schemas" :key="k" :schema="item" />
  </div>
</template>

<script>
import { request } from '../../services/models'
import Auth from '../crud/auth'
import Base from './base'
 
export default {
  components:{
    Base, Auth
  },
  data() {
    return {
      schemas:[]
    }
  },
  watch:{
    async current(newProject, oldProject){
        if( newProject && newProject != oldProject )
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
      if( !this.widgets ) return false;
      for(let row of this.widgets){
        if( row.resource ){
          let data = await request(this.current.resources_path + row.resource )
          if( !data.widgets ) return this.$message("Error to load widget resource");

          this.schemas.push(data)
        }
      }
    }
  },
  async mounted(){
    await this.loadWidgets()
  }
}
</script>