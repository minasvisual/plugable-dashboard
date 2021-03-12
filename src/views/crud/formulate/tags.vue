<template>
  <div
    :class="`tag-input formulate-input-element formulate-input-element--${context.type}`"
    :data-type="context.type"
  >
    <section v-if="valid">
      <div v-for='(tag, index) in model' :key='index' class='tag-input__tag'>
        <span @click='removeTag(index)'>x</span>    {{ tag }}
      </div>
      <input type='text' 
            v-bind="context.attributes" 
            placeholder="Enter a Tag" 
            class='tag-input__text'
            @keydown.enter='addTag' 
            @keydown.188='addTag'
            @keydown.delete='removeLastTag'
      />
    </section>
    <p v-if="!valid">Invalid data</p>
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
  data(){ return{
    valid: true,
    model: []
  } },
  mounted () {
      this.checkFormat(this.context.model)
  },
  methods:{
    checkFormat(data){
        if( data === null || data === undefined) 
          this.model = []
        if( Array.isArray(data) ){
          this.valid = true
          this.model = data
        }else if( typeof data == 'string' && data.includes('[') ){
            try {
                this.model = JSON.parse(data);
                this.valid = true
            } catch (e) {
                this.valid = false;
            }
        }else{
            this.valid = false;
        }
    },
    addTag (event) {
        event.preventDefault()
        var val = event.target.value.trim()
        if (val.length > 0) {
          this.model.push(val)
          event.target.value = ''
          this.changeData(this.model)
        }
    },
    removeTag (index) {
        this.model.splice(index, 1)
        this.changeData(this.model)
    },
    removeLastTag(event) {
        if (event.target.value.length === 0) {
          this.removeTag(this.model.length - 1)
          
          this.changeData(this.model)
        }
    },
    changeData(data){
      let { attributes = {} } = this.context.attributes
      if( attributes.output && attributes.output == 'json')
        this.context.model = JSON.stringify(data)
    }
  }
}
</script>

<style scoped>
.tag-input {
  width: 100%;
  border: 1px solid #eee;
  font-size: 0.9em;
  height: 50px;
  box-sizing: border-box;
  padding: 0 10px;
}

.tag-input__tag {
  height: 30px;
  float: left;
  margin-right: 10px;
  background-color: #eee;
  margin-top: 10px;
  line-height: 30px;
  padding: 0 5px;
  border-radius: 5px;
}

.tag-input__tag > span {
  cursor: pointer;
  opacity: 0.75;
}

.tag-input__text {
  border: none;
  outline: none;
  font-size: 0.9em;
  line-height: 50px;
  background: none;
}
</style>