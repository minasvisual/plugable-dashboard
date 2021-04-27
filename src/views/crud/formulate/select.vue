<template>
  <div
    :class="context.classes.element"
    :data-type="context.type"
    :data-multiple="attributes && attributes.multiple !== undefined"
    v-if="renderComponent"
  >
    <FormulateSlot
      name="prefix"
      :context="context"
    >
      <component
        :is="context.slotComponents.prefix"
        v-if="context.slotComponents.prefix"
        :context="context"
      />
    </FormulateSlot>
    <select
      v-model="context.model"
      v-bind="attributes"
      :data-placeholder-selected="placeholderSelected"
      v-on="$listeners"
      @blur="context.blurHandler"
    >
      <option
        v-if="context.placeholder"
        value
        hidden="hidden"
        disabled
        :selected="!hasValue"
      >
        {{ context.placeholder }}
      </option>
      <template
        v-if="!optionGroups"
      >
        <option
          v-for="option in options"
          :key="option.id"
          :value="option.value"
          :disabled="!!option.disabled"
          v-bind="option.attributes || option.attrs || {}"
          v-text="option.label"
        />
      </template>
      <template
        v-else
      >
        <optgroup
          v-for="(subOptions, label) in optionGroups"
          :key="label"
          :label="label"
        >
          <option
            v-for="option in subOptions"
            :key="option.id"
            :value="option.value"
            :disabled="!!option.disabled"
            v-bind="option.attributes || option.attrs || {}"
            v-text="option.label"
          />
        </optgroup>
      </template>
    </select>
    <FormulateSlot
      name="suffix"
      :context="context"
    >
      <component
        :is="context.slotComponents.suffix"
        v-if="context.slotComponents.suffix"
        :context="context"
      />
    </FormulateSlot>
  </div>
</template>

<script>
import { get } from 'lodash'
import { request } from '../../../services/models'
import { interpolate } from '../../../services/helpers'

export default {
  name: 'FormulateInputSelect',
  props: {
    context: {
      type: Object,
      required: true
    }
  },
  data(){ return{
    renderComponent: true,
    loading: false,
    options: []
  }},
  computed: { 
    optionGroups () {
      return this.context.optionGroups || false
    },
    placeholderSelected () {
      return !!(!this.hasValue && this.context.attributes && this.context.attributes.placeholder)
    },
    type () {
      return this.context.type
    },
    attributes () {
      return this.context.attributes || {}
    },
    hasValue () {
      return this.context.hasValue
    },
    currentProject(){
      return this.$store.state.currentProject || null
    }, 
    request(){
      return get(this.$store, `state.auth.${this.currentProject.code}.request`, {})
    }, 
    placeholder(){
      return this.loading ? 'Loading...' : 'Select One'
    }
  },
  methods:{ 
    forceRerender() {
      this.renderComponent = false;

      this.$nextTick(() => {
        this.renderComponent = true;
      });
    },
    async getOptions({ url, requestOptions={}, fieldLabel, fieldValue, wrapData=null }){
      try{
        
        if( url ){
          this.loading = true;
          requestOptions = Object.assign(requestOptions, this.request)
          let urlNew = interpolate(url, { data: this.context.model })
          let data = await request( urlNew, { method:'get', ...requestOptions })

          if( wrapData )
            data = get(data, wrapData, data)

         console.log('chamou getOptions', data )

         this.options = data && data.map((i, k) => ({ 
              label: get(i, fieldLabel, i.toString()), 
              value: get(i, fieldValue, k)
            }) 
          )
          
         console.log('chamou getOptions', this.options )
          
          this.loading = false;
          
          this.forceRerender()
        }
      }catch(e){
          alert('Erro to get data from '+ url)
          console.log('Erro select input', e)
      }
    }
  },
  created(){
    this.options = this.context.options
    let { attributes } = this.context.attributes

    this.getOptions(attributes || {})
  },
}
</script>