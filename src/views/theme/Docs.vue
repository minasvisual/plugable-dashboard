<template>
  <section>
    <div class="card">
      <div class="card-header">
        Docs
      </div>
      <div class="card-body">
        <p>Documentation and examples for Bootstrap typography,
          including global settings, headings, body text, lists, and more.</p>

       <CTabs variant="pills" :vertical="{ navs: 'col-12 col-md-3', content: 'col-12 col-md-9' }">
              <CTab active>
                <template slot="title">
                  <CIcon name="cil-calculator"/> Core UI Docs
                </template>
                  <a href="https://coreui.io/vue/docs/" target="_blank">https://coreui.io/vue/docs/</a>
              </CTab>
              <CTab>
                <template slot="title">
                  <CIcon name="cil-basket"/> Vue Formulate + Forms Schema
                </template>
                  <a href="https://vueformulate.com/guide/inputs/"  target="_blank">https://vueformulate.com/guide/inputs/</a>
                  <a href="https://www.npmjs.com/package/vue-formulate-extended"  target="_blank">https://www.npmjs.com/package/vue-formulate-extended</a>
                  prismjs
                  vue-quill
              </CTab>
              <CTab>
                <template slot="title">
                  <CIcon name="cil-chart-pie"/> Vue Data tables
                </template>
                  <a href="https://www.njleonzhang.com/vue-data-tables/#/" target="_blank">https://www.njleonzhang.com/vue-data-tables/#/</a>
                   
                  
              </CTab>
              <CTab>
                <template slot="title">
                  <CIcon name="cil-chart-pie"/> Configuration
                </template>
                  <DocsSettings />
              </CTab>
              <CTab>
                <template slot="title">
                  <CIcon name="cil-chart-pie"/> Others
                </template>
                  <a href="https://www.njleonzhang.com/vue-data-tables/#/" target="_blank">https://www.njleonzhang.com/vue-data-tables/#/</a>
                  element-ui 
                  v-jsoneditor
              </CTab>
       </CTabs>

      </div>
    </div>
  </section>
</template>

<script>
import DocsSettings from './docs/docs-settings'
export default {
  components: {
    DocsSettings
  },
  data () {
    return {
      activeTab: 1
    }
  }
}
</script>
