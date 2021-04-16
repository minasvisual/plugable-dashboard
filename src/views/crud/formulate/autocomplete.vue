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
      v-model="search"
      v-bind="context.attributes"
      autocomplete="no"
      @keydown.enter.prevent="choose(selection)"
      @keydown.down.prevent="increment"
      @keydown.up.prevent="decrement"
      @blur="context.blurHandler"
    >
    <ul
      v-if="filteredOptions.length"
      class="formulate-input-dropdown"
    >
      <li
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
      renderComponent: true
    }
  },
  computed: {
    selection () {
      if (this.filteredOptions[this.selectedIndex]) {
        return this.filteredOptions[this.selectedIndex]
      }
      return false
    },
    filteredOptions () {
      if (Array.isArray(this.context.options) && this.search ) {
        const isAlreadySelected = this.context.options.find(option => option.label.toLowerCase() === this.search.toLowerCase())
        if (!isAlreadySelected) {
          return this.context.options.filter(option => option.label.toLowerCase().includes(this.search.toLowerCase()))
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
      this.selectedIndex = this.context.options.findIndex(i => i.value == selected.value)
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
  },
  mounted(){
    if( this.context.model )
      this.choose( this.context.options.find((i) => i.value == this.context.model ) )
  }
}
</script>