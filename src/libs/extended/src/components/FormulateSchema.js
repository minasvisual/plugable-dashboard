import Formulate from '@braid/vue-formulate'

import { Hooks } from '../libs/hooks'
import hooksProp from '../composables/hooksProp'
import FormulateInput from './FormulateInput.vue'

function leaf(item, index, { hooks, h, state } = {}) {
  if (item && typeof item === 'object' && !Array.isArray(item)) {
    const { children = null, component = FormulateInput, depth = 1, modelHook, ...attrs } = item
    const type = component === FormulateInput ? attrs.type || 'text' : ''
    const name = attrs.name || type || 'el'
    const key = attrs.id || `${name}-${depth}-${index}`
    const els = Array.isArray(children) ? children.map((child) => Object.assign(child, { depth: depth + 1 })) : children
    const _modelHook = new Hooks()
      .setHooks(hooks.model)
      .addHook(modelHook)
      .asSingleHook()

    const node = Object.assign({ name, type, key, depth, component, definition: { attrs: { ...attrs, modelHook: _modelHook } }, children: tree(els, { hooks, h, state }) })

    return new Hooks()
      .setHooks(hooks.schemaNode)
      .setDefault(() => node)
      .apply(node, { state })
  }
  return null
}

function tree(schema, { hooks, h, state } = {}) {
  if (Array.isArray(schema)) {
    return schema.map((el, idx) => {
      const item = leaf(el, idx, { hooks, h, state })
      return new Hooks()
        .setHooks(hooks.schemaComponent)
        .setDefault(() => h(item.component, item.definition, item.children))
        .apply(item)
    })
  }
  return schema
}

export default {
  functional: false,
  name: 'FormulateSchema',
  props: {
    schema: Formulate.defaults.components.FormulateForm.props.schema,
    hooks: hooksProp,
    formClass: {
      type: String,
      default: null,
    },
  },
  data: () => ({
    schemaHooks: null,
    schemaOptionsHooks: null,
  }),
  methods: {
    emit(event, payload) {
      this.$emit(event, payload)
    },
  },
  beforeMount() {
    this.schemaHooks = new Hooks().setHooks(this.hooks.schema)
    this.schemaOptionsHooks = new Hooks().setHooks(this.hooks.schemaOptions).setDefault((x) => x)
  },
  render(createElement) {
    return this.schemaHooks.apply(createElement('div', { class: this.$props.formClass }, tree(this.schema, this.schemaOptionsHooks.apply({ hooks: this.hooks, h: createElement, state: {} }, { emit: this.emit, props: this.$props }))), { emit: this.emit, props: this.$props })
  },
}
