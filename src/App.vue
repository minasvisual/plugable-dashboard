<template>
  <router-view></router-view>
</template>

<script>
import AuthMixin from './services/auth.mixin'
export default {
  name: 'App',
  mixins: [AuthMixin],
  beforeMount(){
    this.$store.dispatch('isLogged')
  }
}
</script>
<style src="@coreui/coreui/dist/css/coreui.css"></style>

