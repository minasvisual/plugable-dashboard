<template>
  <div
    :class="`formulate-input-element formulate-input-element--${context.type}`"
    :data-type="context.type"
  >
    <quill 
      ref="quill"
      v-model="context.model"
      :output="model"
      v-bind="context.attributes"
      :config="config"
    />
    
  </div>
</template>

<script> 
import Quill from 'quill'
import htmlEditButton from "quill-html-edit-button";
Quill.register("modules/htmlEditButton", htmlEditButton);

export default { 
  props: {
    context: {
      type: Object,
      required: true
    },
  },
  data () {
    return {
        content: {
            ops: [],
        },
        config: {
          modules: {
            htmlEditButton: {},
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],        
              [{ 'list': 'ordered'}, { 'list': 'bullet' }],
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

              [{ 'color': [] }, { 'background': [] }],
              [{ 'font': [] }],
              [{ 'align': [] }],

              ['clean','code-block'],
            ],
          },
          placeholder: 'Compose an epic...',
        }, 
    }
  }, 
  computed: {
    model () {
      return this.context.model
    }
  },
  mounted(){
  }
}
</script>

<style scoped>
@import "https://cdn.quilljs.com/1.2.6/quill.snow.css"
</style>