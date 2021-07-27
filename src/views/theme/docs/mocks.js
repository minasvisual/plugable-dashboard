export const inputDefault = [ 
  {
    "name": "name",
    "label": "Name"
  },
  {
    "type": "group",
    "name": "emails",
    "validation": "min:2,length",
    "repeatable": true,
    "add-label": "+ Add email",
    "value": [
      {
        "email": "mantovaniarts@gmail.edu"
      },
      {
        "email": "mantovaniarts@gmail.com"
      }
    ],
    "children": [
      {
        "label": "Your email",
        "name": "email",
        "validation": "bail|required|email|ends_with:.edu",
        "validation-messages": {
          "ends_with": "Allowed .edu email address"
        },
        "depth": 2
      }
    ]
  },
  {
    "name": "description",
    "label": "Description",
    "type": "textarea"
  },
  {
    "name": "age",
    "label": "Age",
    "type": "range",
    "show-value": true
  },
  {
    "name": "file",
    "label": "File",
    "type": "file"
  },
  {
    "name": "gender",
    "label": "Gender",
    "type": "radio",
    "options": {
      "M": "Male",
      "F": "Female"
    }
  },
  {
    "name": "terms",
    "label": "Accept terms",
    "type": "checkbox"
  },
  {
    "type": "button"
  }
]

export const autocomplete = {
  "name": "autocomplete",
  "label": "Autocomplete",
  "type": "autocomplete", 
  "options": [
      { "value": 1, "label": "Jon Doe"  }
  ],
  "attributes":{
    "fieldLabel": "name",
    "fieldValue": "id",
    "remote": true
  },
  "schema": {
    "api": {
      "rootApi": "/examples/advanced_data.json",
      "wrapData": "users", 
      "pagination": {
          "filterField": "filter",
          "filterExp": "{prop},like,%{value}%"
      },
      "params": {
          "limit": 15,
          "filter": "id,like,%1840%"
      }
    }
  },
}

export const select = {
  "name": "dynamicselect",
  "label": "Dynamic Select",
  "type": "select",
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

export const grid =  {
  "name": "grid",
  "label": "Grid",
  "type": "grid",
  "schema": {
      "api": {
          "bypassGetData": true, // required to local array edit
          "rootApi": "http://..." // required if is relation crud edit
      },
      "properties":[
          { 
              "name": "name", 
              "label": "name" 
          }
      ]
  }
}

export const image = {
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

export const objJson =  {
  "name": "address",
  "type": "object",
  "options": [
      {
          "name": "street",
          "label": "Street"
      }
  ]
}

export const extented =  {
  type: "text",
  name: "name",
  placeholder: "Type here!",
  label: "Name", 
  events: ["input", "blur"]
}

export const maskDemo = { 
    "name": "zipcode",
    "label": "Zipcode",
    "masks": "00000-000"
}

export const tabsExample = [
  {
    "component": "tabs",  
    "tabs": [
      {
        "name": ".tab1",
        "label": "Tab 1"
      },
      {
        "name": ".tab2",
        "label": "Tab 2"
      }
    ]
  },
  {
    "component": "div",
    "class": "d-flex tab1",
    "children": [
      {
        "name": "outro",
        "label": "OUtro"
      },
      {
        "name": "outro 2",
        "label": "OUtro"
      }
    ]
  },
  {
    "component": "div",
    "class": "d-flex tab2",
    "children": [
      {
        "name": "title",
        "label": "Title"
      },
      {
        "name": "artist_name",
        "label": "Artist"
      }
    ]
  }
]