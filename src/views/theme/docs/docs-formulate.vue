<template>
    <div class="pt-3">
        <div class="row">
            <h4 class="col-12">
                # Formulate Input Types: 
                <a href="https://vueformulate.com/guide/forms/generating-forms/#schemas"  target="_blank">(see docs here) </a>
            </h4>
           <div class="col-12 col-md-4">
                <p>Default available types</p>
                <li>Button</li>
                <li>Box</li> 
                <li>Group</li> 
                <li>Slider</li>
                <li>Text</li>
                <li>Textarea</li>
           </div>
           <div class="col-12 col-md-8">
                 <VJsoneditor v-model="inputDefault"
                    :options="{ mode: 'view', mainMenuBar: false, navigationBar: false, statusBar: false }"
                    height="auto" 
                ></VJsoneditor>
           </div>
        </div>
        <div class="row">
            <h4 class="col-12"> # Formulate Extended features available: 
                <a href="https://www.npmjs.com/package/vue-formulate-extended"  target="_blank">(See docs Here)</a>
            </h4>
           <div class="col-12 col-md-4">
                <li>Events</li>
                <li>Number enforcing</li>
           </div>
           <div class="col-12 col-md-8">
                <VJsoneditor v-model="extented"
                    :options="{ mode: 'preview', mainMenuBar: false, navigationBar: false, statusBar: false }"
                    height="auto" 
                ></VJsoneditor>
           </div>
        </div>
         <div class="row">
            <h4 class="col-12"> # Additional attributes/input features:  </h4>
           <div class="col-12 col-md-4">
                <li>Mask by IMask ( <a href="https://github.com/uNmAnNeR/imaskjs" target="_blank">See Docs</a> ) </li>
           </div>
           <div class="col-12 col-md-8">
                <VJsoneditor v-model="maskDemo"
                    :options="{ mode: 'preview', mainMenuBar: false, navigationBar: false, statusBar: false }"
                    height="auto" 
                ></VJsoneditor>
           </div>
        </div>
        <p>
            <h4># Pluggable dashboard additional custom fields</h4>
            <div class="table-responsive">
                    
                <table class="table table-dashed">
                    <tr>
                        <td>Type</td>
                        <td>
                            Params 
                            <small>* = required</small>
                        </td>
                        <td>example</td>
                    </tr>

                    <InputDoc view="preview" v-for="row of inputTypes" :row="row" :key="row.type" />
          
                </table>
                
                <p>
                    <h4>Html Styled Component</h4>
                    <div class="row p-2">
                        <div class="col-6"> 
                            <h6>You can add html wrappers and use global components as a formulate property.</h6>                            
                            <p>Example:</p>                            
                            <FormComp :properties="[compDemo]" />
                        </div>
                        <div class="col-6">
                            <VJsoneditor v-model="compDemo"
                                :options="{ mode: 'preview', mainMenuBar: false, navigationBar: false, statusBar: false }"
                                height="auto" 
                            ></VJsoneditor>
                        </div>
                    </div>
                    <hr>
                    <div class="row p-2">
                        <div class="col-6"> 
                            <h6>To add html using row data, you can use Place component</h6>     
                            <p>Expression field define html template to be interpolate with form data</p>  
                            <p>Example:</p>  
                            <FormComp :properties="[LayoutPlace]" />                                
                        </div>
                        <div class="col-6">
                            <VJsoneditor v-model="LayoutPlace"
                                :options="{ mode: 'preview', mainMenuBar: false, navigationBar: false, statusBar: false }"
                                height="auto" 
                            ></VJsoneditor>
                        </div>
                    </div>
                    <hr>
                    <div class="row p-2">
                        <div class="col-6"> 
                            <h6>To show a image based on row data, you can use ImagePreview component</h6>    
                            <p>Model field define form object field to get image url</p>  
                            <p>Example:</p>  
                            <FormComp :properties="[LayoutImagePreview]" />                  
                        </div>           
                        <div class="col-6">
                            <VJsoneditor v-model="LayoutImagePreview"
                                :options="{ mode: 'preview', mainMenuBar: false, navigationBar: false, statusBar: false }"
                                height="auto" 
                            ></VJsoneditor>
                        </div>
                    </div>
                    <hr>
                    <div class="row p-2">
                        <div class="col-6"> 
                            <h6> You can define a sub Crud using a schema or loading a new schema, overwriting schema properties</h6>                            
                            <p>Example:</p>                            
                            <FormComp :properties="[subgrid]" />
                        </div>
                        <div class="col-6">
                          <VJsoneditor v-model="subgrid"
                            :options="{ mode: 'preview', mainMenuBar: false, navigationBar: false, statusBar: false }"
                            height="auto" 
                          ></VJsoneditor>
                        </div>
                    </div>
                    <hr>
                    <div class="row p-2">
                        <div class="col-6"> 
                            <h6>Create Tabs (with sub CRUDs or not)</h6>                            
                            <p>Example:</p>                            
                            <FormComp :properties="tabsExample" />
                        </div>
                        <div class="col-6">
                          <VJsoneditor v-model="tabsExample"
                            :options="{ mode: 'preview', mainMenuBar: false, navigationBar: false, statusBar: false }"
                            height="auto" 
                        ></VJsoneditor>
                        </div>
                    </div>
                    <hr>
                    <div class="row p-2">
                        <div class="col-6"> 
                            <h6>Create Raw Tables</h6>       
                            <p>
                                Model field define source object field to get array/object data to be listed</br>                       
                                Columns field filter object fields allowed to showing (optional)</br>                       
                                headers field define columns header labels (optional)
                            </p>                       
                            <p>Example:</p>                            
                            <FormComp :properties="[LayoutRawTable]" />
                        </div>
                        <div class="col-6">
                          <VJsoneditor v-model="LayoutRawTable"
                            :options="{ mode: 'preview', mainMenuBar: false, navigationBar: false, statusBar: false }"
                            height="auto" 
                        ></VJsoneditor>
                        </div>
                    </div>
                    <hr>
                    <div class="row p-2">
                        <div class="col-6"> 
                            <h6>Create Wizards (with sub CRUDs or not)</h6>                            
                            <p>Example:</p>                            
                            <FormComp :properties="wizardExample" />
                        </div>
                        <div class="col-6">
                            <VJsoneditor v-model="wizardExample"
                                :options="{ mode: 'preview', mainMenuBar: false, navigationBar: false, statusBar: false }"
                                height="auto" 
                            ></VJsoneditor>
                        </div>
                    </div>
                    <hr> 
                    <div class="row p-2">
                        <div class="col-6"> 
                            <h6>Create Standalone widgets</h6>                            
                            <p>Example:</p>                            
                            <FormComp :properties="[subWidgets]" />
                        </div>
                        <div class="col-6"> 
                            <VJsoneditor v-model="subWidgets"
                                :options="{ mode: 'preview', mainMenuBar: false, navigationBar: false, statusBar: false }"
                                height="auto" 
                            ></VJsoneditor>
                        </div>
                    </div>
                </p>
            </div>
        </p>
    </div>
</template>

<script> 
import { 
    autocomplete, select, grid, image, objJson, inputDefault, maskDemo, tabsExample, extented, subWidgets, wizardExample,
    LayoutPlace, LayoutImagePreview, LayoutRawTable
} from './mocks'
import VJsoneditor from 'v-jsoneditor'
import InputDoc from './views/InputDoc'
import FormComp from './views/FormComp'
export default {
    components: {
        VJsoneditor,
        InputDoc,
        FormComp,
    },
    data() {
        return {  
            inputDefault,
            tabsExample,
            wizardExample,
            maskDemo,
            extented,
            subWidgets,
            LayoutPlace,
            LayoutImagePreview,
            LayoutRawTable,
            compDemo:  {
                "component": "h4",
                "children": "My big title"
            },
            subgrid: {
                "component": "Crud",
                "context":{
                    "schema": document.location.origin + "/examples/tables/crud.json",
                    "overwrite":{
                        "api":{
                            "params": { 
                                "filter": "user_id,eq,{data.id}" 
                            },
                            "bypassGetData": "true"
                        }
                    }
                }
            },
            inputTypes:[
                {
                    type: "autocomplete",
                    desc: "Receive array of objects, like select field: ex: { value:1, label:'John' }",
                    fields: `<p>remote: boolean (allow remote search)</p>
                            <p>options: array/object</p>
                            <p>attributes: array/object
                                <ul>
                                    <li>fieldLabel: string - response row index of label field (to remote data)</li>
                                    <li>fieldValue: string - response row index of value field (to remote data)</li>
                                </ul>
                            </p>
                            <p>schema: object|string (model file)
                                <ul>
                                    <li>api: object - required - schema api object, required pagination filters to remote search </li> 
                                </ul>
                            </p>`,
                    json: autocomplete
                },
                {
                    type: "code",
                    desc: ` Use Vue Prism Editor to show js/css/lang code 
                                <a href="https://github.com/koca/vue-prism-editor" target="_blank">(See docs here)</a>`,
                    fields: ``,
                    json: {
                        'name': 'code',
                        'label': 'Code',
                        'type': 'code'
                    }
                },
                {
                    type: "select",
                    desc: `Native select + Make a http request to get select options.`,
                    fields: `<ul>
                                <li>options: array|object - Default options</li>
                                <li>
                                    attributes: object 
                                    <ul> 
                                        <li>fieldLabel: string - response row index of label field</li>
                                        <li>fieldValue: string - response row index of value field</li> 
                                    </ul>
                                </li>
                                <li>schema: object|string (model file)
                                    <ul>
                                        <li>api: object - required - schema api object, required pagination filters to remote search </li> 
                                    </ul>
                                </li>
                            </ul>`,
                    json: select
                },
                {
                    type: "grid",
                    desc: `Create a nested collection crud form on same form (thinking to use with NoSQL collections)`,
                    fields: `<ul>
                                <p>schema: object - Nested schema object</p>
                                <li>
                                    properties *: array of formulate/grid properties 
                                </li>
                                <li>
                                    <span>api: remote requests config </span>
                                    <ul>
                                        <li> bypassGetData: true, // required to local array edition</li>
                                        <li> rootApi: "http://..." // required if is relation crud edition</li>
                                    </ul>
                                </li>
                            </ul>`,
                    json: grid
                },
                {
                    type: "imageText",
                    desc: "Simple url text field with image preview (when filled)",
                    fields: "",
                    json: this.imageText
                },
                {
                    type: "image",
                    desc: "Formulate file upload implementation",
                    fields: ` <ul>
                                <li>uploadUrl: string - Url to make a binary upload</li>
                                <li>validation: string - validation mime types</li>
                                <li>accept: string - file prompt accept mime types</li>,
                                <li>options: object
                                    <ul>
                                        <li>fieldValue: string - response data url wrap</li>
                                    </ul>
                                </li>
                           </ul>`,
                    json: image
                },
                {
                    type: "json",
                    desc: `Json editor/viewer implementation of Vue Json editor
                            <a href="https://github.com/yansenlei/VJsoneditor" target="_blank">(See VJsonEditor docs)</a>`,
                    fields: `<p>parse: boolean - parse json response data </p>`,
                    json: {
                        "name": "json",
                        "label": "Json view",
                        "type": "json",
                        "parse": true
                    }
                },
                {
                    type: "object",
                    desc: `Used to update sub objects with nested form schema (thinking to use with NoSQL)`,
                    fields: ` <p>name: string - object index name</p>
                           <p>options: array - nested formulate inputs</p>`,
                    json: objJson
                }, 
                {
                    type: "switch",
                    desc: `Switch boolean data true/false friendly`,
                    fields: ``,
                    json: {
                        "name": "accepted",
                        "label": "Accept terms",
                        "type": "switch"
                    }
                },
                {
                    type: "tags",
                    desc: `Array|json tags field, to manage array data on input/output form`,
                    fields: `<p>
                                attributes.output: string - output type when form submited (json|object)
                            </p>`,
                    json: {
                        "name": "tags",
                        "label": "Tags",
                        "type": "tags",
                        "attributes":{
                            "output": "json"
                        }
                    } 
                },
                {
                    type: "wysiwyg",
                    desc: `  Open content on HTML editor (Vue Quill) to be formated friendly.
                            <a href="https://github.com/CroudTech/vue-quill" target="_blank">(See Vue quill docs)</a>`,
                    fields: ``,
                    json:   {
                        "name": "content",
                        "label": "Post content",
                        "type": "wysiwyg"
                    }
                },
            ],
            models:{
                'users':{'name':'John','email':'doe@email.com'},
                'firstName': "John",
                'lastName': "Doe",
                'image': "https://github.com/minasvisual/pluggable-dashboard/raw/master/logo.png",
            }
        }
    },
    mounted(){
        this.$store.commit('set', ['crud', {...this.crud, row: this.models }] ) 
    },
    beforeDestroy(){
        this.$store.commit('set', ['crud', {...this.crud, row: {} }] ) 
    }
}
</script>

<style scoped>
.row{
  padding: 10px 0
}
</style>