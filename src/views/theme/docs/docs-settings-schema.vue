<template>
  <div>
    <pre>
{
    "type": "object",
    "title": "Users",                           // Schema title visible to user
    "domain": "users",                          // Schema slug visible on url
    "primaryKey": "id",                         // Collection primary key (default: id)
    "auth": true,                               // Define auth required before get data (auth config on project json)
    "properties": [                             // Form/Datatable properties
        {                                       // VueFormulate / Grid table schema
            "name": "id",                       // Data object index
            "label": "ID",                      // Visible label
            "config":{                          // Table grid config
                "grid": true,                   // Visible in grid
                "sort": 0                       // Sort order in grid
            }                                   // Docs link: https://vueformulate.com/guide/inputs/
        } 
    ],
    "api": {                                        // Crud endpoint config
        "rootApi": "https://project.com/users",     // Endpoint base url - Required
//
//Optional 
//
        "urlGet": "",                               // Get all url expression ( def: '/{collection}') 
        "urlGetById": "/{id}",                      // Get by id url expression ( def: '/{collection}/{primaryKey}') 
        "urlPost": "/",                             // Create url expression ( def: '/{collection}') 
        "urlPatch": "/{id}",                        // Update url expression ( def: '/{collection}/{primaryKey}') 
        "urlDelete": "/{id}",                       // Delete url expression ( def: '/{collection}/{primaryKey}') 
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
