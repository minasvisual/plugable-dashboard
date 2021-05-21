<template>
  <div
    :class="`formulate-input-element formulate-input-element--${context.type}`"
    :data-type="context.type"
    v-if="renderComponent"
  >
    <input
      type="hidden"
      v-model="context.model"
      v-bind="context.attributes"
    >
    <input
      type="text"
      placeholder="enter search.."
      v-model="search"
      v-bind="context.attributes"
      autocomplete="no"
      @keydown.enter.prevent="choose(selection)"
      @keydown.down.prevent="increment"
      @keydown.up.prevent="decrement"
      @blur="context.blurHandler"
      @keydown="findData"
    >
    <ul
      v-if="filteredOptions.length"
      class="formulate-input-dropdown list-group"
    >
      <li
        class="text-small list-group-item"
        v-for="(option, index) in filteredOptions"
        :key="option.value"
        v-text="option.label"
        :data-is-selected="selection && selection.value === option.value"
        @mouseenter="selectedIndex = index"
        @click="choose(selection)"
      />
    </ul>
  </div>
</template>

<script>
import { get, debounce } from 'lodash'
import { getData } from '../../../services/models'
import { interpolate, filterParams } from '../../../services/helpers'
export default {
  props: {
    context: {
      type: Object,
      required: true
    },
  },
  data () {
    return {
      selectedIndex: 0,
      search: null,
      renderComponent: true,
      options:[]
    }
  },
  computed: { 
    model () {
      return this.context.model
    }, 
    attributes () {
      return this.context.attributes || {}
    }, 
    currentProject(){
      return this.$store.state.currentProject || null
    }, 
    request(){
      return get(this.$store, `state.auth.${this.currentProject.code}.request`, {})
    }, 
    selection () {
      if (this.filteredOptions[this.selectedIndex]) {
        return this.filteredOptions[this.selectedIndex]
      }
      return false
    },
    filteredOptions () {
      if (Array.isArray(this.options) && this.search ) {
        const isAlreadySelected = this.options.find(option => option.label.toLowerCase() === this.search.toLowerCase())
        if (!isAlreadySelected) {
          return this.options.filter(option => option.label.toLowerCase().includes(this.search.toLowerCase()))
        }
      }
      return []
    }
  },
  methods: {
    choose(selected){
      console.log('selected', selected)
      this.context.model = selected.value
      this.search = selected.label
      this.selectedIndex = this.options.findIndex(i => i.value == selected.value)
      this.forceRerender()
    },
    increment () {
      const length = this.filteredOptions.length
      if (this.selectedIndex + 1 < length) {
        this.selectedIndex++
      } else {
        this.selectedIndex = 0
      }
    },
    decrement () {
      const length = this.filteredOptions.length
      if (this.selectedIndex - 1 >= 0) {
        this.selectedIndex--
      } else {
        this.selectedIndex = length - 1
      }
    },
    forceRerender() {
      this.renderComponent = false;

      this.$nextTick(() => {
        this.renderComponent = true;
      });
    },
    findData: debounce(async function({ target: { value } }){ 
      if( !value || !this.attributes.remote ) return false;

      let { attributes, schema } = this.context.attributes
      schema.api = filterParams( 
        ( schema.api || {} ), 
        { type: "filters", filters:[{ prop: attributes.fieldLabel, value: this.search }] }
      )
    
      await this.getOptions(schema)
    }, 500),
    async initRemote(){
      let { attributes, schema } = this.context.attributes 
      if( !this.context.model || !this.attributes.remote || !attributes.fieldValue ) return false;

      schema.api = filterParams( 
        ( schema.api || {} ), 
        { type: "filters", filters:[{ prop: attributes.fieldValue, value: this.context.model }] }
      )
    
      await this.getOptions(schema)
    },
    async getOptions(schema){
      try{
        let { api = {} } = schema
        let { fieldLabel, fieldValue } = this.attributes.attributes || {}
        
        if( api.rootApi && fieldLabel && fieldValue ){
          this.loading = true;
          schema.api = Object.assign(schema.api, this.request)
          let data = await getData( schema, { data: this.search  })

          this.options = (data.rows || data).map((i, k) => ({ 
              label: get(i, fieldLabel, i.toString()), 
              value: get(i, fieldValue, k)
            }) 
          )
          
          this.loading = false;
          this.forceRerender()
        }
      }catch(e){
          alert('Erro to get data from '+ schema)
          console.log('Erro select input', e)
      }
    }
  },
  async mounted(){
    if( this.context.model ){
      await this.initRemote()
      this.choose( this.options.find((i) => i.value == this.context.model ) )
    }
  },
  created(){
    this.options = this.context.options || []
    let { schema } = this.context.attributes
    
    if( !this.context.model )
      this.getOptions(schema || {})
  }
}
</script>

<style lang="css">
.formulate-input-element{
  position: relative;
}
.formulate-input-dropdown{
  position: absolute;
  background: #fff;
  width: 100%;
  border: 1px solid #ccc;
  z-index: 99;
}
.formulate-input-dropdown li{
  	cursor: pointer;
 }
</style>