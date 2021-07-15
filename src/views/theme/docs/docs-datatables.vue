<template>
    <div>         
        <p>
            <h4># Grid provided by Vue Datatables grid: 
                <a href="https://www.njleonzhang.com/vue-data-tables/#/"  target="_blank">(see docs here)</a>
            </h4>
            <p>
                To show field data on grid, you should add an additional object called config on property schema.
            </p>
            <div class="row">
                <div class="col-12 col-md-4">
                    "grid": true,   // Show on grid true|false<br>
                    "sort": 1       // Sort column order
                </div>
                <div class="col-12 col-md-8">
                    <VJsoneditor v-model="gridConfig"
                        :options="{ mode: 'preview', mainMenuBar: false, navigationBar: false, statusBar: false }"
                        height="auto" 
                    ></VJsoneditor>
                </div>
            </div>
            <p>
                By default, the row data will be display in v-text, to use custom types, you should add "type" parameter with desire cell type. See below available types and examples.
            </p>
        </p>
        <p>
            <h4># Pluggable dashboard custom cell types</h4>
            <div class="table-responsive">
                    
                <table class="table table-dashed">
                    <tr>
                        <td>Type</td>
                        <td>Params</td>
                        <td>example</td>
                    </tr>

                    <InputDoc view="preview" v-for="row of tableTypes" :row="row" :key="row.type" />
     
                </table>
                
            </div>
        </p>
    </div>
</template>

<script> 
import VJsoneditor from 'v-jsoneditor'
import {  } from './mocks'
import InputDoc from './views/InputDoc'
export default {
    components: {
        VJsoneditor,
        InputDoc
    },
    data() {
        return { 
            gridConfig: {
                "name": "...",
                "config":{
                    "grid": true,   // Show on grid true|false
                    "sort": 1       // Sort column order
                }
            },
            tableTypes:[
                {
                    type: "html",
                    desc: `Show data as HTML (v-html) Careful to use this feature`,
                    fields: `n/a`,
                    json: {
                        "name": "html",
                        "config":{
                            "grid:": true,
                            "type": "html"
                        }
                    }
                },
                {
                    type: "object",
                    desc: `Used to display sub object values on grid. Read about lodash.js get feature to understand how to access item levels.`,
                    fields: `<ul>
                        <li>action: object</li>
                        <ul>
                            <li>name: string - object path of field (lodash get)</li>
                        </ul>
                    </ul>`,
                    json:  {
                        "name": "address",
                        "type": "object",
                        "config":{
                            "grid": true,
                            "type": "object",
                            "action": {
                                "name":"address.street"
                            }
                        },
                    }
                },
                {
                    type: "date",
                    desc: `Parse, format and show date/times`,
                    fields: ` <ul>
                        <li>
                            action: object 
                            <ul>
                                <li>format: string - moment.js date format</li>
                                <li>from: string - moment.js date from format</li>
                                <li>utc: boolean - moment.js utc date convert (dates with Y-M-DThh:mm:ss.000Z)</li>
                            </ul>
                        </li>
                    </ul>`,
                    json:  {
                        "name": "created",
                        "type": "date",
                        "config": {
                            "grid": true,
                            "type": "date",
                            "action": {
                                "format": "D/M/YY \\a\\s hh:mm",
                                "from": "D/M/YY",
                                "utc": true 
                            }
                        }
                    }
                },
                {
                    type: "expression",
                    desc: `Interpolate data/cell variables safe with template expression '{data}' or '{cell}'.
                    {data} property means grid column value
                    {cell} property means cell schema config, { type, prop, action, ... }`,
                    fields: ` <ul>
                        <li>action: object</li>
                        <ul>
                            <li>template: string - template to be interpolated by data and cell values</li>
                        </ul>
                    </ul>`,
                    json:  {
                        "name": "code",
                        "config": {
                            "grid": true,
                            "type": "expression",
                            "action": {
                                "template": "{data}"
                            }
                        }
                    }
                },
                {
                    type: "action",
                    desc: `Interpolate data/cell variables safe with template expression '{data}' or '{cell}'.
                    {data} property means grid column value
                    {cell} property means cell schema config, { type, prop, action, ... }`,
                    fields: `<ul>
                        <li>action: object</li>
                        <ul>
                            <li>handler: string - url to be called</li>
                            <li>target: string - window target (def: _blank)</li>
                            <li>label: string expression - expression of button label</li>
                        </ul>
                    </ul>`,
                    json: {
                        "name": "id",
                        "config": {
                            "grid": true,
                            "type": "action",
                            "action": {
                                "handler": "https://google.com",
                                "target": "_blank",
                                "label": "#ID"
                            }
                        }
                    }
                },
                {
                    type: "select",
                    desc: `Show readonly data by select input (to dynamic/array options)`,
                    fields: `N/A`,
                    json: {
                        "name": "gender",
                        "type": "select",
                        "config": {
                            "grid": true,
                            "type": "select"
                        },
                        "options": [
                            { "value": "male", "label": "Male" },
                            { "value": "female", "label": "Female" }
                        ]
                    }
                },
                {
                    type: "image",
                    desc: `Thumbnail image preview with zoom by click`,
                    fields: `N/A`,
                    json: {
                        "name": "avatar",
                        "config": {
                            "grid": true,
                            "type": "image"
                        }
                    }
                },
                {
                    type: "tags",
                    desc: `Array tags joined by ',' (valid json|array)`,
                    fields: `N/A`,
                    json: {
                        "name": "tags",
                        "type": "tags",
                        "attributes": {
                            "output": "json"
                        },
                        "config": {
                            "grid": true,
                            "type": "tags"
                        }
                    }
                },
            ]
         }
    }
}
</script>