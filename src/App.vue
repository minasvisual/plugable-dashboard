<template>
  <section>
    <CModal :show.sync="loader" :closeOnBackdrop="false" size="sm" addContentClasses="loader" :centered="true">
      <template #header-wrapper><span></span></template>
      <template #footer-wrapper><span></span></template>
      <template #body-wrapper>
            <CSpinner color="white" />
      </template>
    </CModal>
    <router-view></router-view>
  </section>
</template>

<script>
import AuthMixin from './services/auth.mixin'
export default {
  name: 'App',
  mixins: [AuthMixin],
  computed:{
    loader:{ 
      get(){ return this.$store.state.loading || false },
      set(value){ this.$store.commit('set', ['loading', value]) }
    }
  },
  beforeMount(){
    this.$store.dispatch('isLogged')
  }
}
</script>
<style src="@coreui/coreui/dist/css/coreui.css"></style>
<style lang="scss">
.loader{
  width: auto;
  margin:auto;
  background: transparent !important;
  border: none;
}
</style>

