<template>
    <div class="pt-3">

        <h4 class="col-12">
            <p> # Vue Bus Actions/Hooks:</p>
        </h4>
        <small>Works only in resource pages</small>
        <hr>
        <div class="row">
            <div class="col h3">Form Actions</div>
        </div>
        <div class="row">
           <div class="col-12 col-md-4">
                <b>Used to run actions before/after form update data. Params:</b>
                <li>event target: Form hook flow. ex: 'after:create', available: (before|after):(create|update|delete)</li>
                <li>event name: form domain name + 'save'. Ex: 'blogs:save'</li>
                <li>id: To used with model:form for foreign id</li>
                <li>Modified data: form instance or modified data to be subbmited</li> 
           </div>
           <div class="col-12 col-md-8">
                 <VJsoneditor v-model="hooksArr"
                    :options="{ mode: 'preview', mainMenuBar: false, navigationBar: false, statusBar: false }"
                    height="auto" 
                ></VJsoneditor>
           </div>
        </div>
        <hr>
        <div class="row">
            <div class="col h3">Grid Actions</div>
        </div>
        <div class="row">
           <div class="col-12 col-md-4">
                <b>Save form event. Params:</b>
                <li>event name: form domain name + 'save'. Ex: 'blogs:save'</li>
                <li>Modified data: form instance or modified data to be subbmited</li> 
           </div>
           <div class="col-12 col-md-8">
                 <VJsoneditor v-model="hookSave"
                    :options="{ mode: 'preview', mainMenuBar: false, navigationBar: false, statusBar: false }"
                    height="auto" 
                ></VJsoneditor>
           </div>
        </div>
        <hr>
        <div class="row">
           <div class="col-12 col-md-4">
                <b>Open grid schema event. Params:</b>
                <li>event name: 'model:grid'</li>
                <li>source origin: row|data|context|custom</li> 
                <li>data: context data passed to grid (like forms context)</li> 
           </div>
           <div class="col-12 col-md-8">
                 <VJsoneditor v-model="hookGrid"
                    :options="{ mode: 'preview', mainMenuBar: false, navigationBar: false, statusBar: false }"
                    height="auto" 
                ></VJsoneditor>
           </div>
           <hr>
        </div>
        <hr>
        <div class="row">
           <div class="col-12 col-md-4">
                <b>Open form row event. Params:</b>
                <li>event name: 'model:form'</li>
                <li>source origin: row|data|context|custom</li> 
                <li>data: context data passed to grid (like forms context, + id: foreign key in row )</li> 
           </div>
           <div class="col-12 col-md-8">
                 <VJsoneditor v-model="hookForm"
                    :options="{ mode: 'preview', mainMenuBar: false, navigationBar: false, statusBar: false }"
                    height="auto" 
                ></VJsoneditor>
           </div>
           <hr>
        </div>

    </div>
</template>

<script>
import VJsoneditor from 'v-jsoneditor'
export default {
    components:{
        VJsoneditor
    },
    data(){ return {
        hookSave: {
            "name": "status",
            "label": "Status",
            "config": {
                "grid": true,
                "type": "action",
                "action": {
                    "type": "switch",
                    "handler": "blogs:save",
                    "source": "field"
                }
            }
        },
        hookGrid: {
            "name": "artists",
            "label": "Artists related",
            "config": {
                "grid": true,
                "type": "action",
                "action": {
                    "type": "button",
                    "handler": "model:grid",
                    "source": "context",
                    "data": {
                        "schema": "artists.json",
                        "overwrite": {
                            "api":{
                                "params": { "filters": "name,like,The%"}
                            }
                        }
                    }
                }
            }
        },
        hookForm: {
            "name": "artist_id",
            "label": "Artist related",
            "remote": true,
            "attributes": {
                "fieldLabel": "name",
                "fieldValue": "id"
            },
            "schema": "artists.json",
            "config": {
                "grid": true,
                "type": "select",
                "action": {
                    "event": "click",
                    "handler": "model:form",
                    "source": "context",
                    "data": {
                        "schema": "artists.json",
                        "overwrite": {},
                        "id": "artist_id"
                    }
                }
            }
        },
        hooksArr: {
            domain: "blogs",
            properties: [],
            api: {},
            "hooks": [
                {
                    "target": "after:create",
                    "id": "artist_id",
                    "handler": "model:form",
                    "source": "context",
                    "data": {
                        "schema": "artists.json"
                    }
                }
            ]
        }

    }}
}
</script>