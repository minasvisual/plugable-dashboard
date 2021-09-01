<template>
  <div class="c-app">
    <TheSidebar/>
    <CWrapper>
      <TheHeader/>
      <div class="c-body">
        <main class="c-main">
          <CContainer fluid>
            <transition name="fade">
              <router-view></router-view>
            </transition>
          </CContainer>
        </main>
      </div>
      <TheFooter/>
    </CWrapper>
  </div>
</template>

<script>
import { getLocalStorage, saveSettings } from '../services/helpers'
import { get, find, some } from 'lodash'
import SessionMixin from '../services/session.mixin'

import TheSidebar from './TheSidebar'
import TheHeader from './TheHeader'
import TheFooter from './TheFooter'

export default {
  name: 'TheContainer',
  mixins: [SessionMixin],
  components: {
    TheSidebar,
    TheHeader,
    TheFooter
  },
  computed:{
      auth(){ return this.$store.state.auth.dash || {} },
      hasAuth(){ return process.env.VUE_APP_LOGIN === 'true' }
  },
  async beforeMount(){
    this.$store.commit('setLoader', ['global', true])
    let { current } = getLocalStorage('settings') || {}

    await this.loadProjects().then( (data) => {  
          if( !current ){
              saveSettings({current: get(data, '[0].code', null)})
              current = get(data, '[0].code', {})
          }

          this.$store.commit('set', ['currentProject', find(data, ['code', current]) ])
      })
  }
}
</script>

<style  scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

</style>
