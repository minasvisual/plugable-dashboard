<template>
  <div
    :class="`formulate-input-element formulate-input-element--${context.type}`"
    :data-type="context.type"
  >
    <quill 
      v-model="context.model"
      :output="model"
      v-bind="context.attributes"
      :config="config"
    />
    
  </div>
</template>

<script>
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
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],        
              [{ 'list': 'ordered'}, { 'list': 'bullet' }],
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

              [{ 'color': [] }, { 'background': [] }],
              [{ 'font': [] }],
              [{ 'align': [] }],

              ['clean','code-block']                
            ]
          },
          placeholder: 'Compose an epic...',
        }, 
    }
  },
  watch: {
    
  },
  computed: {
    model () {
      return this.context.model
    },
     
  },
  methods: {
     
  }
}
</script>

<style scoped>
@import "https://cdn.quilljs.com/1.2.6/quill.snow.css"
</style>