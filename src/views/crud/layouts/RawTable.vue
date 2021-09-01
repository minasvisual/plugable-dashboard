<template >
  <table class="table table-bordered" v-if="data" > 
	<tr v-if="headers" >
      <th v-for="(col, k) of headers" :key="k">
        {{ col }}
      </th>
    </tr> 
    <tr v-for="(row, i) of data" :key="i">
		<template v-for="(col, k) of row"  >
			<td v-if="!columns || columns.includes(k)" :key="k" >
				{{ col }}
			</td>
		</template>
    </tr>
  </table>
</template>

<script>
import { get } from 'lodash' 
import InputMixin from '../../../services/input.mixin'

export default {
	mixins:[InputMixin],
	props:{
		children:{
			type: [Object,Array]
		}
	},
    computed:{
        data(){
			let data = get(this.formValues, this.$attrs.model, [])
			return Array.isArray(data) ? data : [data]
		},
		headers(){
            return get(this.$attrs, 'headers')
        },
		columns(){
            return get(this.$attrs, 'columns')
        }
    }
}
</script>