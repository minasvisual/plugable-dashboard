<template>
  <CRow>
    <CCol col="12" >
      <CCard>
        <CCardHeader>
            Profile Settings
        </CCardHeader>
        <CCardBody>
             <div class="row p-2">
               <div class="col font-weight-bold">Dashboard logged user</div> 
               <div class="col font-weight-bold">Logged Api Fields</div>
             </div>
             <div class="row">
               <div class="col"><b>ID:</b> {{ get(user, get(settings, 'user.id', 'id')) }}</div> 
               <div class="col"><FormulateInput type="select" name="id" :value="get(settings, 'user.id', 'id')" :options="Object.keys(user)" @change="saveSettings" /></div>
             </div>
             <div class="row">
               <div class="col"><b>Name:</b> {{ get(user, get(settings, 'user.name', 'name')) }}</div> 
               <div class="col"><FormulateInput type="select" name="name" :value="get(settings, 'user.name', 'name')" :options="Object.keys(user)" @change="saveSettings" /></div>
             </div>
             <div class="row">
               <div class="col"><b>Email</b>: {{ get(user, get(settings, 'user.email', 'email')) }}</div> 
               <div class="col"><FormulateInput type="select" name="email" :value="get(settings, 'user.email', 'email')" :options="Object.keys(user)" @change="saveSettings" /></div>
             </div>
             <div class="row">
               <div class="col"><b>Role:</b> {{ get(user, get(settings, 'user.role', 'role')) }}</div> 
               <div class="col"><FormulateInput type="select" name="role" :value="get(settings, 'user.role', 'role')" :options="Object.keys(user)" @change="saveSettings" /></div>
             </div> 
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import { get, set } from 'lodash'
import { getLocalStorage, saveSettings } from '../../services/helpers'
import TableMixin from '../../services/table.mixin'
import SessionMixin from '../../services/session.mixin' 

export default {
  mixins:[TableMixin, SessionMixin],
  data(){
    return {
      settings: getLocalStorage('settings') || {}
    }
  },
  methods:{
    saveSettings({ target: { name, value }}){
      console.log(name, value)
      set(this.settings, `user.${name}`, value)
      saveSettings(this.settings)
    }, 
    get:get
  },
  computed:{
    user(){
      return get(this.$store, 'state.auth.dash.user', {})
    },
  }
}
</script>
