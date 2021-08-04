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
                  <hr>
                  <div class="py-3">
                    <a href="https://coreui.io/vue/docs/" target="_blank">https://coreui.io/vue/docs/</a>
                  </div>
              </CTab>
              <CTab>
                <template slot="title">
                  <CIcon name="cil-chart-pie"/> Schemas Configuration
                </template>
                  <hr>
                  <DocsSettings />
              </CTab>
              <CTab>
                <template slot="title">
                  <CIcon name="cil-basket"/> Formulate + Custom fields
                </template>
                  <hr>
                <DocsFormulate />
              </CTab>
              <CTab>
                <template slot="title">
                  <CIcon name="cil-chart-pie"/> Grid/Card table
                </template>
                  <hr>
                <DocsDatatables />
              </CTab>
              <CTab>
                <template slot="title">
                  <CIcon name="cil-chart-pie"/> Widgets
                </template>
                  <hr>
                <DocsWidgets />
              </CTab>
              <CTab>
                <template slot="title">
                  <CIcon name="cil-chart-pie"/> Others
                </template>
                  <hr>
                  <div class="row">
                    <div class="col-3 p-3"><a href="https://www.npmjs.com/package/v-jsoneditor">Vue Jsoneditor Docs</a></div>
                    <div class="col-9">
                      <VJsoneditor v-model="inputDefault"  height="auto" 
                        :options="{ mode: 'view', mainMenuBar: false, navigationBar: false, statusBar: false }"
                      ></VJsoneditor>
                    </div>
                  </div>
                  
                 
              </CTab>
       </CTabs>

      </div>
    </div>
  </section>
</template>

<script>
import VJsoneditor from 'v-jsoneditor'

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
    VJsoneditor
  },
  data () {
    return {
      activeTab: 1,
      inputDefault: {
        "test": "value"
      }
    }
  }
}
</script>
