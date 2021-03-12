<template>
  <div>
    <pre>
{
    "type": "object",
    "title": "Users",                           // Schema title visible to user
    "domain": "users",                          // Schema slug visible on url
    "properties": [
        {                                       // VueFormulate / Grid table schema
            "name": "id",                       // Data object index
            "label": "ID",                      // Visible label
            "config":{                          // Table grid config
                "grid": true,                   // Visible in grid
                "sort": 0                       // Sort order in grid
            }                                   // Docs link: https://vueformulate.com/guide/inputs/
        },
        {
            "name": "name",
            "label": "Name",
            "config": {
            "grid": true,
            }
        }, 
        {
            "name": "bio",
            "label": "About me",
            "type": "textarea"
        }
    ],
    "api": {                                        //Crud endpoint config
        "rootApi": "https://project.com/users",     //Endpoint base url 
//Optional
        "wrapData": "rows",                         //Response object array data field (ex: { rows: [...] } means 'rows')
        "totalData": "count",					    //Count data field | if not exists used data.length by default
        "pagination": {                             //Query string settings
            "pageField": "page",                    //pagination field
            "limitField": "limit",				    //Data count limit field  
            "sortField": "order",                   //Sort field
            "sortExp": "{sort}",                    //Sort expression data to be interpolated (ex: '{prop},{sort}' means 'sort=id,desc'
            "filterField": "filter",                //Filter field
            "filterExp": "{prop},like,%{value}%"    //Field expression value
        },
        "params": {                                 //Fixed query string params
            "limit": 15,
            "ga": "123-1224"
        },
        "headers":{                                 //Fixed headers params
            "app-key": "qwertyuiop-asdfghjkls"
        }
// END Optional
    }
}
    </pre>
  </div>
</template>
