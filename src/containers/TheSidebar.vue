<template>
  <CSidebar 
    fixed 
    :minimize="minimize"
    :show="show"
    @update:show="(value) => $store.commit('set', ['sidebarShow', value])"
  >
    <CSidebarBrand class="d-md-down-block" to="/">
      <CIcon 
        class="c-sidebar-brand-full" 
        name="logo" 
        size="custom-size" 
        :height="35" 
        viewBox="0 0 556 134"
      />
      <CIcon 
        class="c-sidebar-brand-minimized" 
        name="logo" 
        size="custom-size" 
        :height="35" 
        viewBox="0 0 110 134"
      />
    </CSidebarBrand>

    <CRenderFunction flat :content-to-render="nav"/>
    <CSidebarMinimizer
      class="d-md-down-none"
      @click.native="$store.commit('set', ['sidebarMinimize', !minimize])"
    />
  </CSidebar>
</template>

<script>
import nav from './_nav'
import { get, set } from 'lodash'
import { mapState } from 'vuex'

export default {
  name: 'TheSidebar',
  data(){return{
    nav: nav
  }},
  watch:{
    current(newProject, oldProject){
        if( newProject )
          this.loadMenus()
    }
  },
  computed: {
    show () {
      return this.$store.state.sidebarShow 
    },
    minimize () {
      return this.$store.state.sidebarMinimize 
    },
    current () {
      return this.$store.state.currentProject 
    },
  },
  methods:{
    loadMenus(){
      let menus = Object.keys(get(this.current, 'resources', {})).map( (resource) => ({
        name: get(this.current, `resources.${resource}.label`),
        to: `/api/${this.current.code}/${resource}`
      }))
      set(this.nav, '[0]._children[1].items', menus)
    }
  }
}
</script>
