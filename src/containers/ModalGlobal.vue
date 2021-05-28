<template>
  <CModal :show.sync="isShow" 
      :closeOnBackdrop="false" 
      size="lg" 
      addContentClasses="global-modal" 
      :centered="true"
  >
    <template #header-wrapper><span></span></template>
    <template #footer-wrapper><span></span></template>
    <template #body-wrapper >
      <section>
       <a class="close" @click="isShow = false" v-if="!persistent">X</a> 
       <div v-html="msg"></div>
      </section>
    </template>
  </CModal>
</template>

<script>
export default {
  name: 'ModalGlobal',
  props:['type','msg','isShow','persistent','']
}
</script>

<style lang="scss">
.global-modal{
    max-width: 100%;
    margin: auto;
    &.modal-content{
      width: auto;
      background-color: transparent;
      border: none;
      text-align: center;
    }
   .close{
    background: #fff;
    display: block;
    padding: 5px 8px;
    position: absolute;
    top: -20px;
    right: -20px;
    border-radius: 15px;
    text-align: center;
    cursor: pointer
  }
}
</style>