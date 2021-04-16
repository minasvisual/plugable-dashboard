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
import AuthMixin from '../services/auth.mixin'

import TheSidebar from './TheSidebar'
import TheHeader from './TheHeader'
import TheFooter from './TheFooter'

export default {
  name: 'TheContainer',
  mixins:[AuthMixin],
  components: {
    TheSidebar,
    TheHeader,
    TheFooter
  },
  async beforeMount(){
    this.$store.commit('set', ['loading', true])
    let { current } = getLocalStorage('settings') || {}

    await loadProjects().then( (data) => {
        this.$store.commit('set', ['projects', data])

        if( !current ){
            saveSettings({current: get(data, '[0].code', null)})
            current = get(data, '[0].code', {})
        }

        this.$store.commit('set', ['currentProject', find(data, ['code', current]) ])
    }).catch( e => {
      this.$message('Erro to load projects')
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
