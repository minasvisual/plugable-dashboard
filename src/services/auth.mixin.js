export default  {
    created() {
        // if( !this.auth.isLogged && !this.$route.path.includes('pages') ) 
        //     this.$router.push('/pages/login')
        if( !this.hasAuth && this.$route.path.includes('pages') )
            this.$router.push('/dashboard')
    },
    watch:{
        auth(next, prev){
            if( next ){
                console.log(next)
                if( this.hasAuth && !next.isLogged && !this.$route.path.includes('pages') ) 
                    this.$router.push('/pages/login')
                if( this.hasAuth && next.isLogged && !prev.isLogged && this.$route.path.includes('pages')) 
                    this.$router.push('/dashboard')
                if( !this.hasAuth && this.$route.path.includes('pages') )
                    this.$router.push('/dashboard')
            }
        }
    },
    computed:{
        auth(){ return this.$store.state.auth },
        hasAuth(){ return process.env.VUE_APP_LOGIN === 'true' }
    }
}