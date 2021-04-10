<template>
    <div>         
        <p>
            <h4># Grid provided by Vue Datatables grid: 
                <a href="https://www.njleonzhang.com/vue-data-tables/#/"  target="_blank">(see docs here)</a>
            </h4>
            <p>
                To show field data on grid, you should add an additional object called config on property schema.
            </p>
            <pre>
                {
                    ...
                    "config":{
                        "grid": true,   // Show on grid true|false
                        "sort": 1       // Sort column order
                    }
                }
            </pre> 
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
                        <td>Description</td>
                        <td>example</td>
                    </tr>
                    <tr>
                        <td>html</td>
                        <td>
                            N/A
                        </td>
                        <td>
                            Show data as HTML (v-html) Careful to use this feature
                        </td>
                        <td> 
                            <pre>
                                {
                                    "name": "html",
                                    "config":{
                                        "grid:": true,
                                        "type": "html"
                                    }
                                }
                            </pre> /> 
                        </td>
                    </tr>
                    <tr>
                        <td>object</td>
                        <td>
                            <ul>
                                <li>action: object</li>
                                <ul>
                                    <li>name: string - object path of field (lodash get)</li>
                                </ul>
                            </ul>
                        </td>
                        <td>
                            Used to display sub object values on grid. Read about lodash.js get feature to understand how to access item levels.
                        </td>
                        <td>
                            <pre>
                                {
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
                            </pre>
                        </td>
                    </tr>
                    <tr>
                        <td>date</td>
                        <td>
                            <ul>
                                <li>
                                    action: object 
                                    <ul>
                                        <li>format: string - moment.js date format</li>
                                        <li>from: string - moment.js date from format</li>
                                        <li>utc: boolean - moment.js utc date convert (dates with Y-M-DThh:mm:ss.000Z)</li>
                                    </ul>
                                </li>
                            </ul>
                        </td>
                        <td>
                            Parse, format and show date/times
                        </td>
                        <td>
                            <pre>
                                {
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
                            </pre>
                        </td>
                    </tr>
                    <tr>
                        <td>expression</td>
                        <td>
                            <ul>
                                <li>action: object</li>
                                <ul>
                                    <li>template: string - template to be interpolated by data and cell values</li>
                                </ul>
                            </ul>
                        </td>
                        <td>
                            Interpolate data/cell variables safe with template expression '{data}' or '{cell}'.<br>
                            {data} property means grid column value<br>
                            {cell} property means cell schema config, { type, prop, action, ... } 
                        </td>
                        <td>
                            <pre>
                               {
                                    "name": "code",
                                    "config": {
                                        "grid": true,
                                        "type": "expression",
                                        "action": {
                                            "template": "<code>{data}</code>"
                                        }
                                    }
                                }
                            </pre>
                        </td>
                    </tr>
                    <tr>
                        <td>action</td>
                        <td>
                           <ul>
                                <li>action: object</li>
                                <ul>
                                    <li>handler: string - url to be called</li>
                                    <li>target: string - window target (def: _blank)</li>
                                    <li>label: string expression - expression of button label</li>
                                </ul>
                            </ul>
                        </td>
                        <td>
                            Create link based on data
                        </td>
                        <td>
                            <pre>
                                {
                                    "name": "id",
                                    "config": {
                                        "grid": true,
                                        "type": "action",
                                        "action": {
                                            "handler": "https://google.com",
                                            "target": "_blank",
                                            "label": "<span title='{data}'>#ID</span>"
                                        }
                                    }
                                },
                            </pre>
                        </td>
                    </tr>
                    <tr>
                        <td>select</td>
                        <td>
                           <ul>
                                N/A
                            </ul>
                        </td>
                        <td>
                            Show readonly data by select input (to dynamic/array options)
                        </td>
                        <td>
                            <pre>
                                {
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
                            </pre>
                        </td>
                    </tr>
                    <tr>
                        <td>image</td>
                        <td>
                           N/A
                        </td>
                        <td>
                            Thumbnail image preview with zoom by click
                        </td>
                        <td>
                            <pre>
                                {
                                    "name": "avatar",
                                    "config": {
                                        "grid": true,
                                        "type": "image"
                                    }
                                }
                            </pre>
                        </td>
                    </tr>
                    <tr>
                        <td>tags</td>
                        <td> 
                            N/A
                        </td>
                        <td>
                            Array tags joined by ',' (valid json|array)
                        </td>
                        <td>
                            <pre>
                                {
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