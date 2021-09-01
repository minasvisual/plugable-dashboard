<template>
  <div>
    <pre>
{
    "type": "grid",                             // View type opts: grid|form - default: grid - optional
    "title": "Users",                           // Schema title visible to user
    "domain": "users",                          // Schema slug visible on url
//
//Optional 
//
    "canCreate": "true"                         // Default true | if false, remove create (plus) button
    "canEdit": "true"                           // Default true | if false, remove edit row button
    "canDelete": "true"                         // Default true | if false, remove delete row button
    "submit": "true"                            // Default true | if false, remove submit and cancel form buttons
    "layout": "table",                          // DEfault table | Default grid view - options: table|card
    "alerts": "false",                          // Alerts state | If true, send chrome notification to grid/form data update
    "tableClasses": "p-5",                      // Define table tag additional classes
    "formClasses": "p-5",                       // Define form tag additional classes
//
// END Optional
//
    "primaryKey": "id",                         // Collection primary key (default: id)
    "auth": true,                               // Define auth required before get data, auth: false bypass header token any
    "properties": [                             // Form/Datatable properties
        {                                       // VueFormulate / Grid table schema
            "name": "id",                       // Data object index
            "label": "ID",                      // Visible label
            "config":{                          // Table grid config
                "grid": true,                   // Visible in grid
                "sort": 0                       // Sort order in grid
                "sorter": false                 // Disable column Sorter grid
                "filter": false                 // Disable filter search in grid  Boolean/Object (change input config) - Def true
                "actions": {}                   // cell type options |  see on each cell type schema
            }                                   // Docs link: https://vueformulate.com/guide/inputs/
        } 
    ],
    "api": {                                        // Crud endpoint config
        "rootApi": "https://project.com/users",     // Endpoint base url - Required
//
//Optional 
//
        "urlGet": "{query}",                        // Get all url expression with datatables query string by default ( def: '/{collection}{query}') 
        "urlGetById": "/{id}{query}",               // Get by id url expression  with datatables query string by default ( def: '/{collection}/{primaryKey}{query}') 
        "urlPost": "/",                             // Create url expression ( def: '/{collection}') | you can add {query} if applied
        "urlPatch": "/{id}",                        // Update url expression ( def: '/{collection}/{primaryKey}') | you can add {query} if applied
        "urlDelete": "/{id}",                       // Delete url expression ( def: '/{collection}/{primaryKey}') | you can add {query} if applied
        "methodGet": "GET",                         // Get all method (def: GET)
        "methodGetById": "GET",                     // Get One by id method (def: GET)
        "methodPost": "POST",                       // Create method (def: POST)
        "methodPatch": "PUT",                       // Update method (def: PUT)
        "methodDelete": "DELETE",                   // Delete method (def: DELETE)
        "bypassGetData": false                      // Use data from props intead api http request
        "bypassGetByid": true,                      // Use table row click instead GetById request (def: false)
        "wrapData": "rows",                         // Response object array data field (ex: { rows: [...] } means 'rows')
        "totalData": "count",                       // Count data field | if not exists used data.length by def
        "wrapDataById": "data",                     // Wrap the GetOne Response (ex: { data: {...} } means 'data')  
        "pagination": {                             // Query string settings | false = disabled pagination, page size select and filters
            "pageField": "page",                    // pagination field | show/hide pagination numbers
            "limitField": "limit",                  // Data count limit field | show/hide page size select toogle  
            "sortField": "order",                   // Sort field
            "sortExp": "{prop},{sort}",             // Sort expression data to be interpolated (ex: '{prop},{sort}' means 'sort=id,desc')
            "sortAscChar": "asc",                   // Ascending sort character (def: 'asc')
            "sortDescChar": "desc",                 // Descending sort character (def: 'desc')
            "filterField": "filter|{prop}",         // Filter field (can use string or prop selected by form)
            "filterExp": "{prop},like,%{value}%"    // Field expression value
        },
        "params": {                                 // Fixed query string params
            "limit": 15,
            "ga": "123-1224",
            "filter": ["john", "doe"]               // Multiple index query string (result in filter=john&filter=doe)
        },
        "headers":{                                 // Fixed headers params
            "app-key": "qwertyuiop-asdfghjkls"
        }
    }
    "toolbar": [
        {
            "icon": "cil-trash",                    // Button icon | OPTIONAL
            "label": "Options",                     // Label HTML | Required if icon not informed
            "target": "rowbar",                     // Toolbar target | toolbar=top grid/rowbar=grid row actions)
            "handler": "model:grid",                // Event Handler | See event docs to configure
            "source": "context",                    // Event Source data | event source origin sent to schema
            "id": "artist_id",                      // Row field of form id (To model:form event)
            "data": {                               // Event Data | event context sent to schema
                "schema": "artist.json"             // Schema path or object
            }
        }
    ],
    "hooks": [
        {
            "target": "after:save",                 // Hook target | ex: before:create/after:create (create|update|delete)
            "handler": "model:grid",                // Event Handler | See event docs to configure
            "source": "context",                    // Event Source data | event source origin sent to schema
            "id": "artist_id",                      // Row field of form id (To model:form event)
            "data": {                               // Event Data | event context sent to schema
                "schema": "artist.json"             // Schema path or object
            }
        }
    ]
//
// END Optional
//
}
    </pre>
  </div>
</template>
