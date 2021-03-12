<template>
   <div class="upload-area">
        <p v-if="uploading"  style="text-align:center">Sending...</p>
        <p v-else-if="error"  style="text-align:center">{{ error }} <a @click.prevent="() => error = null" class="text-center">retry</a> </p>
        <div v-else class="img-bar">
          <input 
            type="file" 
            ref="file" 
            v-bind="context.attributes"
            v-on:change="uploadFile()"
          >
          <img v-if="context.model" :src="context.model" style="height:50px; width: auto">
        </div>
    </div>
</template>

<script>
import { request } from '../../../services/models'
import { get } from 'lodash'

export default {
  props: {
    context: {
      type: Object,
      required: true
    },
  },
  data(){
    return{
      error: null,
      uploading: false,
      files: []
    }
  },
  computed: {
    model () {
      return this.context.model
    }
  },
  methods: {
    async uploadFile () {
      // ... perform upload
      this.uploading = true;
      let file = this.$refs.file.files[0]
      
      const formData = new FormData()
      formData.append('file', file)
      this.context.model = URL.createObjectURL(file);

      console.log(file)

      return await request( 
          this.context.uploadUrl, 
          {
            method: this.context.method || 'post',
            data: formData,
          }
        )
        .then((data) => {
          if( data )
            this.context.model = get(data, (this.context?.options?.fieldValue || '[0].src'), data)
          else
            this.error = data
          this.uploading = false
        })
        .catch((err) => {
          this.error = err.message || err
          this.uploading = false
        })
    }
  }
}
</script>

<style lang="scss">
.upload-area{
   padding: 5px;
   border: 3px dashed #ccc;
   border-radius: 10px;
   .img-bar{ 
    display: flex;
    align-items: center;
    justify-content: center;
    img{
      margin-left: 10px
    }
   }
}
</style>