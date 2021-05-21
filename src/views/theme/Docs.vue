<template>
  <section>
    <div class="card">
      <div class="card-header">
        Docs
      </div>
      <div class="card-body">
        <p>Documentation and examples for Bootstrap typography,
          including global settings, headings, body text, lists, and more.</p>

       <CTabs variant="pills" >
              <CTab active>
                <template slot="title">
                  <CIcon name="cil-calculator"/> Core UI Docs
                </template>
                  <a href="https://coreui.io/vue/docs/" target="_blank">https://coreui.io/vue/docs/</a>
              </CTab>
              <CTab>
                <template slot="title">
                  <CIcon name="cil-chart-pie"/> Configuration
                </template>
                  <DocsSettings />
              </CTab>
              <CTab>
                <template slot="title">
                  <CIcon name="cil-basket"/> Formulate + Custom fields
                </template>
                <DocsFormulate />
              </CTab>
              <CTab>
                <template slot="title">
                  <CIcon name="cil-chart-pie"/> Vue Data tables
                </template>
                <DocsDatatables />
              </CTab>
              <CTab>
                <template slot="title">
                  <CIcon name="cil-chart-pie"/> Widgets
                </template>
                <DocsWidgets />
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
import DocsFormulate from './docs/docs-formulate'
import DocsDatatables from './docs/docs-datatables'
import DocsWidgets from './docs/docs-widgets'

export default {
  components: {
    DocsSettings,
    DocsFormulate,
    DocsDatatables,
    DocsWidgets,
  },
  data () {
    return {
      activeTab: 1
    }
  }
}
</script>
