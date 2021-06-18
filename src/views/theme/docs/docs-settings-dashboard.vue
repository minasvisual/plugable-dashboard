<template>
<div class="container">
    <h6>To configure dashboard fill the .env and build vue</h6>
    <pre>
    VUE_APP_ENV=local
    VUE_APP_DATABASE=/models/projects.json          // Projects json file path/url | default /public/models/projects.json
    VUE_APP_LOGIN=true  | true/false
    // Required if login true
    VUE_APP_LOGIN=https://project.com/auth/login    // Dashboard Login auth url
    VUE_APP_LOGIN_USER_FIELD=email                  // Username field
    VUE_APP_LOGIN_PASS_FIELD=password               // Password field
    VUE_APP_LOGIN_TOKEN_PATH=token                  // Response token path in data object (default: response.data.token)
    VUE_APP_LOGIN_TOKEN_HEADER=access-token         // Request token header name JWT ex. authorization, token, access-token
    VUE_APP_LOGIN_TOKEN_HEADER_EXPRESSION               // Request Token header value schema: ex. 'Bearer {token}', default '{token}'
    VUE_APP_DEFAULT_HEADERS={"app-key":"1234567890"}    // Default headers json (send just in authentication calls) default {}
    VUE_APP_LOGGED_URL=https://project.com/auth/logged  // Get logged user data url
    </pre>    
        
    Run locally:
    <pre>
    npm run serve
    </pre>
</div>
</template>