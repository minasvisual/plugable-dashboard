<template>
<span>
    <img  @click="formopen = true" :src="data" style="height: 30px; width:auto" @error="replaceByDefault" />

    
    <CModal
      title="Image preview"
      :show.sync="formopen"
      :backdrop="false"
      size="lg"
      :closeOnBackdrop="false"
    >
        <template slot="body-wrapper">
            <img :src="data" class="img-fluid">
        </template>
    </CModal>

</span>
</template>
<script>
export default {
    props:['data', 'cell'],
    data(){ return{
        formopen: false
    }},
    methods: {
        replaceByDefault(e) {
            e.target.src = '/img/image-error.jpg'
        }
    }
}
</script>