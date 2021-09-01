<template>
  <CHeader fixed light class="justify-content-between">
    <CToggler
      in-header
      class="ml-3 d-lg-none"
      @click="$store.commit('toggleSidebarMobile')"
    />
    <CToggler
      in-header
      class="ml-3 d-md-down-none"
      @click="$store.commit('toggleSidebarDesktop')"
    />
    <!-- <CHeaderBrand class="mx-auto d-lg-none" to="/">
      <CIcon name="logo" height="48" alt="Logo"/>
    </CHeaderBrand> -->
    <CHeaderNav class="d-md-down-none mr-auto">
      <CHeaderNavItem class="px-3">
        <CHeaderNavLink to="/dashboard">
          Dashboard
        </CHeaderNavLink>
      </CHeaderNavItem>
      <CHeaderNavItem class="px-3">
        <CHeaderNavLink to="/settings">
          Settings
        </CHeaderNavLink>
      </CHeaderNavItem>
      <CHeaderNavItem class="px-3">
        <CHeaderNavLink to="/theme/docs">
          Docs
        </CHeaderNavLink>
      </CHeaderNavItem>
    </CHeaderNav>
    <CHeaderNav class="mr-4 right"> 
      <CDropdown
          color="write"
          :toggler-text="(current.name || 'Choose')" 
          class=""
          size="sm"
          placement="bottom-end"
        >
          <CDropdownItem v-for="proj of projects" :key="proj.code" @click="setProject(proj)">
            {{ proj.name }}
          </CDropdownItem>
      </CDropdown> 
      <!-- <CHeaderNavItem class="d-md-down-none mx-2">
        <CHeaderNavLink>
          <CIcon name="cil-bell"/>
        </CHeaderNavLink>
      </CHeaderNavItem>
      <CHeaderNavItem class="d-md-down-none mx-2">
        <CHeaderNavLink>
          <CIcon name="cil-list"/>
        </CHeaderNavLink>
      </CHeaderNavItem>
      <CHeaderNavItem class="d-md-down-none mx-2">
        <CHeaderNavLink>
          <CIcon name="cil-envelope-open"/>
        </CHeaderNavLink>
      </CHeaderNavItem> -->
      <TheHeaderDropdownAccnt/>
    </CHeaderNav>
    <!-- <CSubheader class="px-3">
      <CBreadcrumbRouter class="border-0 mb-0"/>
    </CSubheader> -->
  </CHeader>
</template>

<script>
import TheHeaderDropdownAccnt from './TheHeaderDropdownAccnt'
import { saveSettings, getLocalStorage } from '../services/helpers'
import { get } from 'lodash'

export default {
  name: 'TheHeader',
  components: {
    TheHeaderDropdownAccnt
  },
  computed:{
    current(){ return this.$store.state.currentProject || {} },
    projects(){ return this.$store.state.projects || [] },
  },
  methods:{
    setProject(proj){
      this.$store.commit('set', ['currentProject', proj])
      
      saveSettings({current: get(proj, 'code', null)})
      this.$router.push('/dashboard')
    }
  }
}
</script>
