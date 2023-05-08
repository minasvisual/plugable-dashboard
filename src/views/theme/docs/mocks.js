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
  "attributes": {
      "fieldLabel": "name",
      "fieldValue": "id"
  },
  "schema": "crud.json"
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
  "validation":"mime:application/pdf",
  "accept": "application/pdf", 
  "schema":{
    "api": {
      "rootApi": "/examples/advanced_data.json",
      "wrapData": "src"
    }
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
        "label": "Tab 2",
        "enabledStyle": "display: flex"
      }
    ]
  },
  {
    "component": "div",
    "class": "tab1",
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
    "class": "tab2",
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

export const wizardExample = [
  {
    "component": "Wizard",
    "class": "test",
    "nav-class": "nav nav-pills (optional)",
    "steps": [
      { "name": ".step1", "label": "Step 1" },  
      { "name": ".step2", "label": "Step 2" }
    ]
  },
  {
    "component": "div",
    "class": "d-flex step1",
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
    "class": "d-flex step2",
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

export const subWidgets =  {
  "component": "Widget",
  "class": "tab4",
  "context": {
    
    "schema": document.location.origin + "/examples/widgets/widget_example.json",
    "overwrite": {
      "wrapperClass": "w-100"
    }
  }
}

export const LayoutImagePreview =   {
  "component": "ImagePreview",
  "width": "100",
  "model": "image"
}

export const LayoutPlace = {
  "component": "Place",
  "tag": "h1",
  "class": "text-success",
  "expression": "Welcome <b>{firstName} {lastName}</b>"
}

export const LayoutRawTable =  {
  "component": "RawTable",
  "model": "users",
  "headers": [
    "Name",
    "Email"
  ],
  "columns": [
    "name",
    "email"
  ]
}