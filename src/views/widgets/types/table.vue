<template >
  <table class="table table-bordered" v-if="pivot.data.table" >
    <!-- <tr>
      <th v-for="lbl of fields" :key="lbl" v-text="lbl.label"></th>
    </tr> -->
    <tr v-for="(row, i) of pivot.data.table" :key="i">
      <td v-for="(dts, k) of row.value" :key="k" :class="{'bg-info': row.type == 'colHeader'}">
        {{ dts }}
      </td>
    </tr>
  </table>
</template>

<script>
export default {
  props:{
    schema:{
      type: Object,
      default: {}
    },
    widget:{
      type: Object,
      default:{}
    },
    pivot:{
      type: Object,
      default:{}
    },
  }
}
</script>