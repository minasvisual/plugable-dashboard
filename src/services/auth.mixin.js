import {  mapGetters } from 'vuex'
export default  {
    created() {
        if( !this.auth.isLogged && !this.$route.path.includes('pages') ) 
            this.$router.push('/pages/login')
        if( !this.hasAuth && this.$route.path.includes('pages') )
            this.$router.push('/dashboard')

            
        this.$store.watch(
            state =>state.auth.dash, 
            (next, prev) => {
                console.log('alterado auth', next)
                if( next ){
                    if( this.hasAuth && !next.isLogged && !this.$route.path.includes('pages') ) 
                        this.$router.push('/pages/login')
                    if( this.hasAuth && next.isLogged && !prev.isLogged && this.$route.path.includes('pages')) 
                        this.$router.push('/dashboard')
                    if( !this.hasAuth && this.$route.path.includes('pages') )
                        this.$router.push('/dashboard')
                }
            }, 
            { immediate: true }
        )
    }, 
    computed:{
        auth(){ return this.$store.state.auth.dash || {} },
        hasAuth(){ return process.env.VUE_APP_LOGIN === 'true' }
    }
}