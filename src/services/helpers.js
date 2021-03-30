import { has, sortBy, get } from 'lodash'
import moment from 'moment'

export const formatDate = function(value, format, from, utc=false) {
    if (value) {
      let date = moment(String(value), from)
      if(utc) date = date.utc()
      return date.format(format)
    }
}

export const interpolate = (string, scope) => {
    return string.replace(/\{([^}]*)}/g, (r,k) => get(scope, k) );
}

export const queryString = (params, join) => {
    if( params && Object.keys(params).length > 0 )
        return join+new URLSearchParams(params)
    else
        return ''
}

export const filterParams = (api, queryInfo) => {
    let { page, pageSize, sort, filters } = queryInfo || {}
    let { params, pagination } = api || {}
    if( page && has(pagination, 'pageField') )
        params[ pagination.pageField || 'page' ] = page
    if( pageSize && has(pagination, 'limitField') )
        params[ pagination.limitField || 'limit'] = pageSize
    if( sort && sort.prop && sort.order && has(pagination, 'sortField') && has(pagination, 'sortExp') )
        params[ pagination.sortField || 'order' ] = interpolate( (pagination.sortExp || '{prop},{order}') , {prop: sort.prop, sort: sort.order == 'ascending'?'asc':'desc'})

    if( has(filters, '[0].prop') && has(filters, '[0].value') && has(pagination, 'filterField') && has(pagination, 'filterExp') )
        params[ pagination.filterField || 'filter' ] = interpolate( (pagination.filterExp || '{prop},like,%{value}%') , filters[0])
    else if( has(pagination, 'filterField') )
        delete params[ pagination.filterField || 'filter' ]

    return {...api, params};
}

export const schemaColumns = (properties) => {
    let columns = []
    let extractdata = (col = {}, k) =>  {
        if( col.children && Array.isArray(col.children) )  col.children.map( i => extractdata(i, k))
        else if( get(col, 'config.grid', false) )
            columns.push({
                sort: get(col, 'config.sort', k+1),
                prop: get(col, 'name', col.id),
                label: get(col, 'label', col.id),
                type: get(col, 'config.type', (col.type || 'text')),
                action: get(col, 'config.action', {}),
                options: get(col, 'options', {}),
            })
    }
    properties.map((col, k) => {
            extractdata(col, k)
    })
    return sortBy(columns, ['sort'])
}

export const getLocalStorage = (key, json=true) => {
    try{
        let ls = window.localStorage.getItem(key)
        if( ls ){
            if( json ) ls = JSON.parse(ls)
            return ls
        }
        return null
    }catch(e){
        console.log('getLocalStorage', e)
        return null
    }
}

export const setLocalStorage = (key, data, json=true) => {
    try{
        if( key ){
            if( json ) data = JSON.stringify(data)
            
            let ls = window.localStorage.setItem(key, data)
            return ls
        }
        return true
    }catch(e){
        console.log('setLocalStorage', e)
        return false
    }
}

export const saveSettings = (data) => {
    try{
        let settings = getLocalStorage('settings') || {}

        settings = { ...settings, ...data }

        setLocalStorage('settings', settings)

        return settings
    }catch(e){
        
        console.log('saveSettings', e)
    }
}