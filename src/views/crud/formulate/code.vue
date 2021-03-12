<template>
  <div
    :class="`formulate-input-element formulate-input-element--${context.type}`"
  >
    <prism-editor class="my-editor" 
        v-model="context.model" 
        :highlight="highlighter" 
        v-bind="context.attributes"
        line-numbers>
    </prism-editor>
  </div>
</template>

<script>
import { PrismEditor } from 'vue-prism-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';

export default {
  components: {
      PrismEditor
  },
  props: {
    context: {
      type: Object,
      required: true
    },
  },
  computed: {
    model () {
      return this.context.model
    },
  },
  methods: {
    highlighter(code) {
      return highlight(code, languages.js); // languages.<insert language> to return html with markup
    },
  },
}
</script>
<style scoped>
@import "~vue-prism-editor/dist/prismeditor.min.css";
@import "~prismjs/themes/prism-tomorrow.css";

.my-editor {
  background: #2d2d2d;
  color: #ccc;

  font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
  padding: 5px;
}
</style>