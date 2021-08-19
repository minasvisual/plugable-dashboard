<template>
    <section class="Timer">
        <FormulateInput type="number" :value="1" :outer-class="['p-1 m-0']" v-model="minutes" :disabled="active">
            <template #prefix><small class="mr-1">Min</small></template>    
        </FormulateInput>
        <FormulateInput type="switch" title="on/off" v-model="active" />
    </section>
</template>

<script>
export default {
    props: ['domain','active'],
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
            this.$emit('update:active', newVal)
        }
    },
    methods:{
        runReload(){
            this.$bus.$emit(`${this.domain}:reload`, {})
            console.debug("runReload runned", `${this.domain}:reload`)
        },
        startReload(){
            if( !this.interval )
                this.interval = setInterval(this.runReload.bind(this), this.minutes * 60000)
        },
        stopReload(){
            clearInterval(this.interval)
            this.interval = null
            this.active = false
            this.$emit('update:active', false)
        }
    },

    beforeDestroy(){
        if( this.interval ){
            this.startReload()
            console.debug("runReload destroyed")
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
    padding: 6px;
}
</style>