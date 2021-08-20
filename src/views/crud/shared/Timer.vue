<template>
    <section class="Timer">
        <FormulateInput type="number" :value="1" :outer-class="['p-0 m-0']" v-model="minutes" :disabled="active">
            <template #prefix><small class="mr-1">Min</small></template>    
        </FormulateInput>
        <FormulateInput type="switch" title="on/off" :outer-class="['p-0 m-0']" v-model="active" />
        
        <small class="d-flex align-items-center">Alert data changes: </small>
        <FormulateInput type="switch" title="on/off" :outer-class="['p-1 m-0']" v-model="alert" />
    </section>
</template>

<script>
export default {
    props: ['domain','active', 'alert'],
    data(){
        return {
            minutes: 1,
            interval: null
        }
    },
    watch:{
        active(newVal){
            if( newVal === true )
                this.startReload()
            else if( newVal === false )
                this.stopReload()

            this.$emit('update:active', newVal)
        }
    },
    methods:{
        runReload(){
            this.$bus.$emit(`${this.domain}:reload`, {})
            console.debug("runReload runned", `${this.domain}:reload`, new Date().toISOString())
        },
        startReload(){
            if( !this.interval )
                this.interval = setInterval(this.runReload.bind(this), this.minutes * 60000)
                
            this.$emit('update:alert', true)
        },
        stopReload(){
            clearInterval(this.interval)
            this.interval = null
            this.active = false
            this.$emit('update:alert', false)
            this.$emit('update:active', false)

            console.debug("runReload destroyed")
        },
        sendNotification(data){
            if( this.alert === true )
                this.$store.dispatch('notification', data)
        }
    },
    mounted(){
        this.$bus.$on( `${this.domain}:grid:changed`, this.sendNotification.bind(this) )
    },
    beforeDestroy(){
        this.$bus.$off( `${this.domain}:grid:changed`, this.sendNotification.bind(this) )

        if( this.interval ){
            this.stopReload()
        }
    }
}
</script>

<style>
.Timer{
    display: grid;
    grid-template-columns: 100px 60px;
    gap: 10px;
}
.Timer .formulate-input-element {
  display: flex;
  align-items: center;
} 
.Timer .formulate-input-element input:disabled{
    background: #eee;
}
</style>