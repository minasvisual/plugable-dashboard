<template>
  <section class="loading-wrap" :class="{ 'active': loader === true }">
     {{ target }} {{ loader }}
     <div class="blackdrop"><CSpinner color="info" /></div>
     <slot />
  </section>
</template>

<script>
import { get } from 'lodash'
import { mapState } from 'vuex'
export default {
  props:['target'],
  data(){return{
    loader: false
  }},
  computed:{
    ...mapState(['loading'])
  },
  beforeMount(){
    this.$watch(
      `loading`, 
      function(newVal, oldVal){
        console.log('Mudou loading', newVal, oldVal) 
        this.loader = newVal[this.target]  
      }, 
      { immediate: true, deep: true }
    )
  }
}
</script>
<style lang="scss">
.loading-wrap{
 	position: relative;

  .blackdrop{
    display: none;
  }
  &.active{ 
    .blackdrop{
      display: block;
      position: absolute;
      left:: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 99;
      background: rgba(255, 255, 255, 0.7);
      .spinner-border{
        position: absolute;
        top: 49%;
        left: 49%;
      }
    }
  }
}
</style>