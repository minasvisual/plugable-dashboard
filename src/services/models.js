import { get, has } from 'lodash'
import { setup } from 'axios-cache-adapter'
import { interpolate, queryString } from './helpers'
import Store from '../store'

// Create `axios-cache-adapter` instance
const api = setup({
  maxAge: 1 * ( 60 * 1000 ), // N x 1 minute
  //ignoreCache: process.env.VUE_APP_ENV === 'local',
  exclude: {
    // Only exclude PUT, PATCH and DELETE methods from cache
    methods: ['put', 'patch', 'delete']
  }
})

api.interceptors.request.use(
  function (config) {

    if( !config.headers[( process.env.VUE_APP_LOGIN_TOKEN_HEADER || 'access-token')] ){
      const token = localStorage.getItem('dash_session')
      if (process.env.VUE_APP_LOGIN == 'true' && token) {
        let headerName = ( process.env.VUE_APP_LOGIN_TOKEN_HEADER || 'access-token')
        let headerValue = interpolate(( process.env.VUE_APP_LOGIN_TOKEN_HEADER_EXPRESSION || '{token}'), {token})
        config.headers[ headerName ] = headerValue;
      }
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
)

api.interceptors.response.use(
  (success) => {
    return success
  },
  (error) => { 
    Store.dispatch("requestFail", error)
    
   // return Error object with Promise
   return Promise.reject(error);
  },
  function (error) {
    return Promise.reject(error);
  }
)


export const request = (query, options={}, wrap=true) => {
  return api({ url: query,  ...options }).then((res) => {
    console.debug('Cached request', res.request.fromCache !== true)
    return wrap ? res.data: res 
  })
}

export const loadModel = async (url, options) => {
   return await request(url, options)
}

export const loadProjects = async (opts) => {

   return await request(process.env.VUE_APP_DATABASE, opts)
      
}

export const getData = async (model, data={}, config={}) => { 
  let { api = {} } = model;
  let url = ''
  let isRow = has(data, `[${model.primaryKey || 'id'}]`)
  let options = {
    method: ( isRow ? (api.methodGetById || 'GET') : (api.methodGet || 'GET') ),
    ...config
  }

  let query = queryString(api.params, ( api.rootApi.includes('?') ? '&':'?'), data)

  if( isRow )
    url = `${api.rootApi}${api.urlGetById || '/{id}{query}'}`
  else
    url = `${api.rootApi}${api.urlGet || '{query}'}`

  if( api.headers )
    options['headers'] = api.headers
  
  url = interpolate(url, {...data, query })
  
  console.debug('get data', url, options)
  return request(url, options)
      .then( data => {  
        if( isRow ){
          return ( model.api.wrapDataById ? get(data, model.api.wrapDataById, data): data)
        }else{
          let rows = ( model.api.wrapData ? get(data, model.api.wrapData, data): data)
          let total = ( model.api.totalData ? get(data, model.api.totalData, rows.length): rows.length )

          if( !Array.isArray(rows) ) rows = [rows]
          if( typeof total !== 'number' ) total = rows.length

          return {
            rows,
            total
          }
        }
      })
}

export const saveData = async (model, data, config={}) => { 
  let { api } = model;
  let url = ''
  let method = data[(model.primaryKey || 'id')] ? (api.methodPatch || "PUT") : (api.methodPost || "POST");
  let query = interpolate( queryString(api.params, (api.rootApi.includes('?') ? '&':'?')),  api.params)
 
  if( data[(model.primaryKey || 'id')] )
    url = `${api.rootApi}${api.urlPatch || '/{id}'}`
  else
    url = `${api.rootApi}${api.urlPost || ''}`

  url = interpolate(url, {...data, query})

  let options = {
    method,
    data,
    ...config
  }
  if( api.headers )
    options['headers'] = api.headers
  
  return request(url, options)
}

export const deleteData = async (model, data, config={}) => {
  let { api } = model;

  if( !data[(model.primaryKey || 'id')] ) return Promise.reject('Id not found')

  let method = (api.methodDelete || "DELETE")
  
  let query = interpolate( queryString(api.params, (api.rootApi.includes('?') ? '&':'?')),  api.params)
  
  let url = `${api.rootApi}${api.urlDelete || '/{id}'}`
  
  url = interpolate(url, {...data, query})

  let options = {
    method,
    ...config
  }
  if( api.headers )
    options['headers'] = api.headers
  
  return request(url, options)
}

export const getUserData = async () => {
  return request( process.env.VUE_APP_LOGGED_URL , { method: 'GET' } )
}