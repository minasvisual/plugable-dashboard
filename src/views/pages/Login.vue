<template>
  <div class="c-app flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol md="8">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <FormulateForm
                  @submit="login"
                  v-model="loginForm"
                  #default="{ hasErrors, isLoading }"
                >
                  <h1>Login</h1>
                  <p class="text-muted">Sign In to your account</p>
                  <FormulateInput
                    name="username"
                    label="Username"
                    validation="required"
                  />
                  <FormulateInput
                    name="password"
                    label="Password"
                    type="password"
                    validation="required|min:6,length"
                  />
                  <CRow>
                    <CCol col="6" class="text-left">
                      <FormulateInput
                        type="submit"
                        :disabled="hasErrors || isLoading"
                        :label="isLoading ? 'Loading...' : 'Submit this form'"
                      >
                        Login
                      </FormulateInput>
                    </CCol>
                    <CCol col="6" class="text-right">
                      <CButton color="link" class="px-0">Forgot password?</CButton>
                      <CButton color="link" class="d-lg-none">Register now!</CButton>
                      <small>{{ version }}</small>
                    </CCol>
                  </CRow>
                </FormulateForm>
              </CCardBody>
            </CCard>
            <CCard
              color="primary"
              text-color="white"
              class="text-center py-5 d-md-down-none"
              body-wrapper
            >
              <CCardBody>
                <h2>Sign up</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <CButton
                  color="light"
                  variant="outline"
                  size="lg"
                >
                  Register Now!
                </CButton>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import AuthMixin from '../../services/auth.mixin'
import { mapState } from 'vuex'
export default {
  name: 'Login',
  data() {
      return {
          loginForm:{},
          version: process.env.VUE_APP_ENV
      }
  },
  methods: {
    login(data){
        this.$store.dispatch('login', data)
    }
  },
  computed:{
    auth(){ return this.$store.state.auth.dash || {} },
    hasAuth(){ return process.env.VUE_APP_LOGIN === 'true' }
  },
  mounted(){
    if( !this.auth.isLogged && !this.$route.path.includes('pages') ) 
        this.$router.push('/pages/login')
    if( !this.hasAuth && this.$route.path.includes('pages') )
        this.$router.push('/dashboard')
  },
  beforeMount(){
    this.$store.watch(
      state => {
        return state.auth.dash
      },
      (next={}, prev={}) => {
        console.log(prev, next)
        if( next ){
            if( this.hasAuth && !next.isLogged && !this.$route.path.includes('pages') ) 
                this.$router.push('/pages/login')
            else if( this.hasAuth && next.isLogged && !prev.isLogged && this.$route.path.includes('pages')) 
                this.$router.push('/dashboard')
            else if( !this.hasAuth && this.$route.path.includes('pages') )
                this.$router.push('/dashboard')
        } 
      },
      { immediate: true }
    )
  }
   
}
</script>
