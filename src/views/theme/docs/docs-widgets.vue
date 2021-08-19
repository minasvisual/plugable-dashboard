<template>
    <div>         
        <p>
            <h4># Widget chats and table provided by quick-pivot and CoreUI Charts 
                <a href="https://www.npmjs.com/package/quick-pivot"  target="_blank">(see docs here)</a>
            </h4>
            <p>
                To show field data on grid, you should add an additional object called config on property schema.
            </p>
            Object begin ...<br>
            <ul>
                <li>wrapperClass: | css class before card | default "col-12"</li>
                <li>class: | css class before card | default "card"</li>
                <li>widgets: | Widget wrapper</li>
                <ul>
                    <li>type: "ChartBar",     // Render type: Table|HTML|ChartBar|ChartLine|ChartPie</li>
                    <li>source: "pivot",      // Source type: pivot (pivot table)|raw (raw api result) -  Def: pivot</li>
                    <li>"class": "card-body"  // optional | card body css class </li>
                    <li>"prefix": '<b>chart header</b>' // optional | html slot upper type render</li>
                    <li>"suffix": '<b>chart footer</b>' // optional | html slot below type render</li>
                    <li>params: 
                        <ul>                     
                            <li>"rows":["country"],     // Array of json field Chart/Table calculated row results</li>
                            <li>"cols":[],              // Array of json Chart/Table calculated column results</li>
                            <li>"labels":[],            // Array|string of Cols labels of each TIles, Table</li>
                            <li>"group":"country",      // aggregationDimension | String of json field </li>
                            <li>"action":"count"        // aggregator | Calculate action aggregator, count|sum|average|max|min</li>
                            <li>"resultWrap": "data"    // get different part of calculated result, data|totals|all</li>
                            <li>"color": ["green", "pink"], // Colors to charts datasets (array if more than one column)</li>
                            <li>"class": "bg-light" // Char/Table css class, inside card body</li>
                        </ul>
                    </li>
                </ul> 
            </ul>
            <p>Examples; </p>
             <VJsoneditor v-model="widget"
                :options="{ mode: 'preview', mainMenuBar: false, navigationBar: false, statusBar: false }"
                height="auto" 
            ></VJsoneditor>
        </p>
    </div>
</template>

<script> 
import VJsoneditor from 'v-jsoneditor'
export default {
    components: {
        VJsoneditor,
    },
    data() {
        return {
            widget: {
                "type": "object",
                "title": "Table test",
                "primaryKey": "id",
                "domain": "table",
                "widgets": {
                    "type": "ChartBar",
                    "source": "json",
                    "params": {
                        "rows": [
                        "Sex"
                        ],
                        "cols": [],
                        "group": "Age",
                        "action": "average"
                    }
                },
                "api":{
                    "rootApi": "/examples/dataset_example.json"
                }
            }
        }
    },
}
</script>