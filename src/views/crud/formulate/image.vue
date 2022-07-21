<template>
   <div class="upload-area"> 
        <p v-if="uploading"  style="text-align:center">Sending...</p>
        <p v-else-if="error"  style="text-align:center">{{ error }} <a @click.prevent="() => error = null" class="text-center">retry</a> </p>
        <div v-else class="img-bar">
          <div class="custom-control custom-checkbox flex-column" title="See as text">
            <input type="checkbox" class="custom-control-input" id="customCheck1" v-model="inputText" title="See as text">
            <label class="custom-control-label small" for="customCheck1"></label>
          </div> 
          <input 
            v-if="inputText"
            type="text" 
            ref="file" 
            v-bind="context.attributes"
            v-model="context.model"
          >
          <input 
            v-else
            type="file" 
            ref="file" 
            v-bind="context.attributes"
            v-on:change="uploadFile()"
          >
          <img v-if="model" :src="model" style="height:50px; width: auto">
        </div>
    </div>
</template>

<script>
import InputMixin from '../../../services/input.mixin'
import { saveData } from '../../../services/models'
import { get, set } from 'lodash'
import { mergeDeep } from '../../../services/helpers'

export default {
  name: "InputImage",
  mixins:[InputMixin],
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
      files: [],
      inputText: false
    }
  }, 
  computed: { 
    currentProject(){
      return this.$store.state.currentProject || null
    }, 
    request(){
      return get(this.$store, `state.auth.${this.currentProject.code}.request`, {})
    },
    attributes(){
      return this.context.attributes
    },
    model () {
      if( this.context.model && this.attributes.baseUrl )
        return this.attributes.baseUrl + this.context.model
      else  if( this.context.model && this.context.model.includes('http') )
        return this.context.model
      else
        return null 
    },
  },
  methods: {
    async uploadFile () {
      // ... perform upload
      this.uploading = true;
      let file = this.$refs.file.files[0]
      let {  schema } = this.context.attributes 
      
      const formData = new FormData()
      formData.append('file', file)
      this.context.model = URL.createObjectURL(file);

      if( this.context.uploadUrl )
        set(schema, 'api.rootApi', this.context.uploadUrl)

      schema.api = mergeDeep(schema.api, this.request)
 
      //return await request( 
      saveData(
          schema,  
          formData
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
  },
  mounted(){
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