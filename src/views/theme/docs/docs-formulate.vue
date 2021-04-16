<template>
    <div>
        <p>
            <h4># Formulate Input Types: <a href="https://vueformulate.com/guide/inputs/"  target="_blank">(see docs here)</a></h4>
            <li>Button</li>
            <li>Box</li>
            <li>File</li>
            <li>Group</li>
            <li>Select</li>
            <li>Slider</li>
            <li>Text</li>
            <li>Textarea</li>
        </p>
        <p>
            <h4># Formulate Extended features available: 
                <a href="https://www.npmjs.com/package/vue-formulate-extended"  target="_blank">(See docs Here)</a>
            </h4>
            <li>Events</li>
            <li>Masks</li>
            <li>Number enforcing</li>
        </p>
        <p>
            <h4># Pluggable dashboard additional custom fields</h4>
            <div class="table-responsive">
                    
                <table class="table table-dashed">
                    <tr>
                        <td>Type</td>
                        <td>Params</td>
                        <td>Description</td>
                        <td>example</td>
                    </tr>
                    <tr>
                        <td>autocomplete</td>
                        <td>
                            <p>options: array/object</p>
                        </td>
                        <td>
                            Receive array of objects, like select field: ex: { value:1, label:'John' }
                        </td>
                        <td> 
                            <pre>
                                {
                                    "name": "autocomplete",
                                    "label": "Autocomplete",
                                    "type": "autocomplete", 
                                    "options": [
                                        { "value": 1, "label": "Jon Doe"  }
                                    ]
                                }
                            </pre> /> 
                        </td>
                    </tr>
                    <tr>
                        <td>code</td>
                        <td>
                            <p>N/A</p>
                        </td>
                        <td>
                            Use Vue Prism Editor to show js/css/lang code 
                            <a href="https://github.com/koca/vue-prism-editor" target="_blank">(See docs here)</a>
                        </td>
                        <td>
                            <pre>
                                {
                                    "name": "code",
                                    "label": "Code",
                                    "type": "code"
                                }
                            </pre>
                        </td>
                    </tr>
                    <tr>
                        <td>dynamicSelect</td>
                        <td>
                            <p>options: array|object - Default options</p>
                            <ul>
                                <li>
                                    attributes: object 
                                    <ul>
                                    <li>url: string - URL of items (Can use {data} to interpolate row)</li>
                                    <li>wrapData: string - response object|array wrap</li>
                                    <li>fieldLabel: string - response row index of label field</li>
                                    <li>fieldValue: string - response row index of value field</li>
                                    <li>requestOptions: object - request headers,params,querystring config (like api)</li>
                                    </ul>
                                </li>
                            </ul>
                        </td>
                        <td>
                            Make a http request to get select options.  
                        </td>
                        <td>
                            <pre>
                                {
                                    "name": "dynamicselect",
                                    "label": "Dynamic Select",
                                    "type": "dynamicSelect",
                                    "options": [],
                                    "attributes":{
                                        "url": "/examples/advanced_data.json",
                                        "fieldLabel": "name",
                                        "fieldValue": "id",
                                        "wrapData": "users",
                                        "requestOptions":{
                                            "headers": { "app-key": "..." }
                                        }
                                    }
                                }
                            </pre>
                        </td>
                    </tr>
                    <tr>
                        <td>grid</td>
                        <td>
                            <ul>
                                <p>schema: object - Nested schema object</p>
                                <li>
                                    properties: array of formulate/grid properties 
                                </li>
                            </ul>
                        </td>
                        <td>
                            Create a nested collection crud form on same form (thinking to use with NoSQL collections)
                        </td>
                        <td>
                            <pre>
                                {
                                    "name": "grid",
                                    "label": "Grid",
                                    "type": "grid",
                                    "schema": {
                                        "properties":[
                                            { 
                                                "name": "name", 
                                                "label": "name" 
                                            },
                                            { 
                                                "name": "email",
                                                "label": "Email"
                                            }
                                        ]
                                    }
                                },
                            </pre>
                        </td>
                    </tr>
                    <tr>
                        <td>imageText</td>
                        <td>
                           N/A
                        </td>
                        <td>
                            Simple url text field with image preview (when filled)
                        </td>
                        <td>
                            <pre>
                                {
                                    "name": "image",
                                    "label": "Image Text",
                                    "type": "imageText"
                                }
                            </pre>
                        </td>
                    </tr>
                    <tr>
                        <td>image</td>
                        <td>
                           <ul>
                                <li>uploadUrl: string - Url to make a binary upload</li>
                                <li>validation: string - validation mime types</li>
                                <li>accept: string - file prompt accept mime types</li>,
                                <li>options: object
                                    <ul>
                                        <li>fieldValue: string - response data url wrap</li>
                                    </ul>
                                </li>
                           </ul>
                        </td>
                        <td>
                            Formulate file upload implementation
                        </td>
                        <td>
                            <pre>
                                {
                                    "name": "image",
                                    "label": "Image with upload",
                                    "type": "image",
                                    "uploadUrl": "/examples/advanced_data.json",
                                    "validation":"mime:application/pdf",
                                    "accept": "application/pdf",
                                    "options":{
                                        "fieldValue": "upload"
                                    }
                                }
                            </pre>
                        </td>
                    </tr>
                    <tr>
                        <td>json</td>
                        <td>
                           <p>parse: boolean - parse json response data </p>
                        </td>
                        <td>
                            Json editor/viewer implementation of Vue Json editor
                            <a href="https://github.com/yansenlei/VJsoneditor" target="_blank">(See VJsonEditor docs)</a>
                        </td>
                        <td>
                            <pre>
                               {
                                    "name": "json",
                                    "label": "Json view",
                                    "type": "json",
                                    "parse": true
                                }
                            </pre>
                        </td>
                    </tr>
                    <tr>
                        <td>object</td>
                        <td>
                           <p>name: string - object index name</p>
                           <p>options: array - nested formulate inputs</p>
                        </td>
                        <td>
                            Used to update sub objects with nested form schema (thinking to use with NoSQL)
                        </td>
                        <td>
                            <pre>
                                {
                                    "name": "address",
                                    "type": "object",
                                    "options": [
                                        {
                                            "name": "street",
                                            "label": "Street"
                                        }
                                    ]
                                }
                            </pre>
                        </td>
                    </tr>
                    <tr>
                        <td>switch</td>
                        <td>
                           N/A
                        </td>
                        <td>
                            Switch boolean data true/false friendly
                        </td>
                        <td>
                            <pre>
                                {
                                    "name": "switch",
                                    "label": "Switch",
                                    "type": "switch"
                                }
                            </pre>
                        </td>
                    </tr>
                    <tr>
                        <td>tags</td>
                        <td>
                            <p>
                                attributes.output: string - output type when form submited (json|object)
                            </p>
                        </td>
                        <td>
                            Array|json tags field, to manage array data on input/output form
                        </td>
                        <td>
                            <pre>
                               {
                                    "name": "tags",
                                    "label": "Tags",
                                    "type": "tags",
                                    "attributes":{
                                        "output": "json"
                                    }
                                } 
                            </pre>
                        </td>
                    </tr>
                    <tr>
                        <td>wysiwyg</td>
                        <td>
                           N/A
                        </td>
                        <td>
                            Open content on HTML editor (Vue Quill) to be formated friendly.
                            <a href="https://github.com/CroudTech/vue-quill" target="_blank">(See Vue quill docs)</a>
                        </td>
                        <td>
                            <pre>
                                {
                                    "name": "wysiwyg",
                                    "label": "Wysiwyg editor",
                                    "type": "wysiwyg"
                                }
                            </pre>
                        </td>
                    </tr>
                </table>
                
            </div>
        </p>
    </div>
</template>

<script> 
</script>