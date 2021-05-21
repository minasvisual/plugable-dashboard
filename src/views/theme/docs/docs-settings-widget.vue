<template>
  <div>
    <pre>
{
    "type": "object",
    "title": "Label",                           // Schema title ( to remove card header set: false)
    "domain": "users",                          // Schema slug 
    "primaryKey": "id",                         // Collection primary key (default: id)
    "auth": true,                               // Define auth required before get data (auth config on project json)
    "wrapperClass": "card col-12",              // Parent div class 
    "widgets": {                                // Widget wrapper
        "type": "ChartBar",                     // Render type: Table|HTML|ChartBar|ChartLine|ChartPie
        "source": "json",                       // Source type
        "class": "card-body d-flex-inline",
        "prefix": "HTML Advanced Chart test",
        "suffix": "HTML Average age between genders",
        "params": {                             
            "rows":["country"],                 // Array of json field Chart/Table calculated row results
            "cols":[],                          // Array of json Chart/Table calculated column results
            "group":"country",                  // String of json field thats base $action to be calculate, Ex: price numbers count/average/max/min
            "action":"count"                    // Calculate action aggregator, count|sum|average|max|min
            "resultWrap": "data"                // get different part of calculated result, data|totals|all
            "color": ["green", "pink"],         // Colors to charts datasets (array if more than one column)
            "class": "bg-light"                 // Char/Table css class, inside card body
        }
    },
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
        "methodDelete": "GET",                      // Delete method (def: DELETE)
        "bypassGetData": false                      // Use data from props intead api http request
        "bypassGetByid": true,                      // Use table row click instead GetById request (def: false)
        "wrapData": "rows",                         // Response object array data field (ex: { rows: [...] } means 'rows')
        "totalData": "count",                       // Count data field | if not exists used data.length by def
        "wrapDataById": "data",                     // Wrap the GetOne Response (ex: { data: {...} } means 'data')  
        "pagination": {                             // Query string settings
            "pageField": "page",                    // pagination field
            "limitField": "limit",                  // Data count limit field  
            "sortField": "order",                   // Sort field
            "sortExp": "{prop},{sort}",             // Sort expression data to be interpolated (ex: '{prop},{sort}' means 'sort=id,desc'
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
//
// END Optional
//
    }
}
    </pre>
  </div>
</template>
