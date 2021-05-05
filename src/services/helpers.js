import { has, sortBy, get } from 'lodash'
import moment from 'moment'

export const formatModel = (columns=[], data) => {
    // columns.map(i => {
    //     if( data[i.prop] && ['date'].includes(i.type) ){ 
    //         let format = ( i.type == 'date' ? 'YYYY-MM-DD': 'YYYY-MM-DD\\Thh:mm:ss' )
    //         data[i.prop] = formatDate(data[i.prop], format, null, true)
    //     } 
    // })
    return data
}

export const formatDate = function(value, format, from, utc=false) {
    if (value) {
      let date = moment(String(value), from)
      if(utc) date = date.utc()
      return date.format(format)
    }
}

export const interpolate = (string, scope, def) => {
    if( typeof string !== 'string' ) return string; 

    return string.replace(/\{([^}]*)}/g, (r,k) => get(scope, k, (def ? def:'{'+k+'}')) );
}

export const queryString = (params, join, data) => {
    let rtn = ''
    let arrQuery = []
    if( params && Object.keys(params).length > 0 ){
        Object.keys(params).map(k => {
            if( Array.isArray(params[k]) )
                params[k].map(i => arrQuery.push([ interpolate(k, data), interpolate(i, data)]) )
            else
                arrQuery.push([interpolate(k, data), interpolate(params[k], data)])
        })

        rtn = join+new URLSearchParams( arrQuery )
    }
    return rtn
}

export const filterParams = (api, queryInfo) => {
    let { page, pageSize, sort, filters } = queryInfo || {}
    let { params, pagination } = api || {}
    if( page && has(pagination, 'pageField') )
        params[ pagination.pageField || 'page' ] = page
    if( pageSize && has(pagination, 'limitField') )
        params[ pagination.limitField || 'limit'] = pageSize
    if( sort && sort.prop && sort.order && has(pagination, 'sortField') && has(pagination, 'sortExp') ){
        let pagData = {prop: sort.prop, sort: sort.order == 'ascending'? get(pagination,'sortAscChar','asc'): get(pagination, 'sortDescChar', 'desc')}
        params[ pagination.sortField || 'order' ] = interpolate( get(pagination, 'sortExp', '{prop},{order}'), pagData)
    }

    let filterField = interpolate( get(pagination, 'filterField', 'filter'), get(filters, '[0]', {}) )
    if( has(filters, '[0].prop') && has(filters, '[0].value') && has(pagination, 'filterField') && has(pagination, 'filterExp') )
        params[ filterField ] = interpolate( (pagination.filterExp || '{prop},like,%{value}%') , filters[0])
    else if( has(pagination, 'filterField') )
        delete params[ filterField ]

    return {...api, params};
}


export const schemaColumns = (properties) => {
    let columns = []
    let extractdata = (col = {}, k) =>  {
        if( col.children && Array.isArray(col.children) )  col.children.map( i => extractdata(i, k))
        if( get(col, 'config.grid', false) )
            columns.push({
                sort: get(col, 'config.sort', k+1),
                prop: get(col, 'name', col.id),
                label: get(col, 'label', col.id),
                type: get(col, 'config.type', (col.type || 'text')),
                action: get(col, 'config.action', (col.attributes || {})),
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