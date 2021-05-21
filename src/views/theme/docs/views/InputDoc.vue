<template>
  <tr>
      <td>
          <p><b>{{ row.type }}</b></p>
          <small v-html="row.desc">
          </small>
      </td>
      <td v-html="row.fields"></td>
      <td>   
          <VJsoneditor v-model="row.json"
              :options="{ mode: (this.view || 'preview'), mainMenuBar: false, navigationBar: false, statusBar: false }"
              height="auto" 
          ></VJsoneditor>
      </td>
  </tr> 
</template>

<script>
import VJsoneditor from 'v-jsoneditor'
export default {
  components: { VJsoneditor },
  props:['row', 'view']
}
</script>