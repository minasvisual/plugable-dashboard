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
import { loadProjects } from '../services/models'
import { getLocalStorage, saveSettings } from '../services/helpers'
import { get, find, some } from 'lodash'

import TheSidebar from './TheSidebar'
import TheHeader from './TheHeader'
import TheFooter from './TheFooter'

export default {
  name: 'TheContainer',
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
    this.$store.commit('set', ['loading', true])
    let { current } = getLocalStorage('settings') || {}

    await loadProjects({ cache:{ ignoreCache: true }}).then( (data) => {
        if( !Array.isArray(data) )
          throw "Error to parse JSON"

        this.$store.commit('set', ['projects', data])

        if( !current ){
            saveSettings({current: get(data, '[0].code', null)})
            current = get(data, '[0].code', {})
        }

        this.$store.commit('set', ['currentProject', find(data, ['code', current]) ])
    }).catch( e => {
      this.$message( e.message || 'Erro to load projects')
    }).then(() => {
      this.$store.commit('set', ['loading', false])
    })
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
