<template>
  <section>
    <CModal :show.sync="loader.global" :closeOnBackdrop="false" size="sm" addContentClasses="loader" :centered="true">
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
import { mapState } from 'vuex'
import AuthMixin from './services/auth.mixin'
export default {
  name: 'App',
  mixins: [AuthMixin],
  computed:{
    ...mapState({
      loader: (state) => state.loading
    })
  },
  beforeMount(){
    this.isLogged() 
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

