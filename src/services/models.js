import { get, has } from 'lodash'
import axios from 'axios'
import { interpolate, queryString } from './helpers'

axios.interceptors.request.use(
  function (config) {

    if( !config.headers[( process.env.VUE_APP_LOGIN_TOKEN_HEADER || 'access-token')] ){
      const token = localStorage.getItem('dash_session')
      if (token) {
        config.headers[( process.env.VUE_APP_LOGIN_TOKEN_HEADER || 'access-token')] = token;
      }
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
)

export const models = async (path) => {
  return Promise.resolve({
    "test": {
      baseUrl: "http://localhost:3000/schema" 
    }
  })
}

export const request = (query, options={}, wrap=true) => {
  return axios({
          url: query,
          ...options
        }).then((res) => wrap ? res.data: res )
}

export const loadModel = async (url, options) => {

   return await request(url)
 
}

export const loadProjects = async () => {

   return await request(process.env.VUE_APP_DATABASE)
      
}

export const getData = async (model, data={}, config={}) => { 
  let { api } = model;
  let url = ''
  let options = {
    method: api.methodGet || "GET",
    ...config
  }
  
  let query = interpolate( queryString(api.params),  api.params)
  if( data[(model.primaryKey || 'id')] )
    url = `${api.rootApi}${api.urlGetById || '/{id}'}${query}`
  else
    url = `${api.rootApi}${api.urlGet || ''}${query}`

  if( api.headers )
    options['headers'] = api.headers
  
  url = interpolate(url, {...data})
  
  return request(url, options)
      .then( data => {  
        let rows = ( model.api.wrapData ? get(data, model.api.wrapData, []): data)
        let total = ( model.api.totalData ? get(data, model.api.totalData, rows.length): rows.length )

        return {
          rows,
          total
        }
      })
}

export const saveData = async (model, data, config={}) => { 
  let { api } = model;
  let url = ''
  let method = data[(model.primaryKey || 'id')] ? (api.methodPatch || "PUT") : (api.methodPost || "POST");
  let query = interpolate( queryString(api.params),  api.params)
 
  if( data[(model.primaryKey || 'id')] )
    url = `${api.rootApi}${api.urlPatch || '/{id}'}${query}`
  else
    url = `${api.rootApi}${api.urlPost || ''}${query}`

  url = interpolate(url, {...data})

  let options = {
    method,
    data,
    ...config
  }
  if( api.headers )
    options['headers'] = api.headers
  
  return request(url, options)
}

export const deleteData = async (model, data) => {
  let { api } = model;

  if( !data[(model.primaryKey || 'id')] ) return Promise.reject('Id not found')

  let method = (api.methodDelete || "DELETE")
  let query = interpolate( queryString(api.params),  api.params)
  let url = `${api.rootApi}${api.urlDelete || '/{id}'}${query}`
  
  url = interpolate(url, {...data})

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