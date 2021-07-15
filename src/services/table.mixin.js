import { get, has, debounce, sortBy, round, isEqual } from 'lodash'
import { schemaColumns  } from './helpers'

export default {
    computed: {

    },
    methods:{
      fetchQueryInfo(type, data){
        this.queryInfo = { type }
        if( type == 'sort' ){
          this.queryInfo.sort = { prop: data.column, order: data.asc === true ? 'ascending':'descending' }
        }
        if( type == 'filter' ){
          this.queryInfo.filters = Object.keys(data).map((key) => ({ prop: key, value: data[key] }))
        }
        if( type == 'page' ){
          this.queryInfo.page = data
        }
        if( type == 'pageSize' ){
          this.queryInfo.pageSize =  data
        }
        
        this.fetchData(this.queryInfo)
      },
      validateQueryInfo(queryInfo){
          if( !queryInfo || typeof queryInfo !== 'object' ) return false;
          
          if( ['sizeChange', 'pageSize', 'size', 'pageChange', 'sort', 'filter', 'page', 'init'].includes(queryInfo.type) ){
              if( queryInfo.type == 'filter' &&  !get(queryInfo, 'filters[0].prop')  )
                  return false;
          }else{
              return false;
          }

          return true
      },
      schemaColumns(properties){
          // let columns = [ { label: '', key: "selected", filter: false, sorter:false, sort: -1 } ]
          // let extractdata = (col = {}, k) =>  {
          //     if( col.children && Array.isArray(col.children) )  col.children.map( i => extractdata(i, k))
          //     if( get(col, 'config.grid', false) )
          //         columns.push({
          //             sort: get(col, 'config.sort', k+1),
          //             key: get(col, 'name', col.id),
          //             label: get(col, 'label', col.id),
          //             type: get(col, 'config.type', (col.type || 'text')),
          //             action: get(col, 'config.action', (col.attributes || {})),
          //             options: get(col, 'options', {}),
          //             sorter: get(col, 'config.sorter', true),
          //             filter: get(col, 'config.filter', true),
          //         })
          // }
          // properties.map((col, k) => {
          //         extractdata(col, k)
          // })

          // columns.push({ label: '', key: 'actions', filter: false, sorter: false })

          return schemaColumns(properties) //sortBy(columns, ['sort'])
      },
      calcPages(totalRows, perPage){
          let count = (totalRows || 1) / perPage
          let rounded = round(count)
          return count > rounded ? rounded + 1 : rounded
      },
      isSelected(val) {
          return this.selectedRow.findIndex(i => isEqual(i, val) ) >= 0
      },
      selectionAll(){
          if( this.selectedRow.length == this.data.rows.length )
          this.selectedRow = []
          else
          this.selectedRow = this.data.rows
      },
      selectionChange(val, index) {
          let key = this.selectedRow.findIndex(i => isEqual(i, val) )
          if( key >= 0 )   
          this.selectedRow.splice(key, 1)
          else
          this.selectedRow.push(val)
      },
      optionfy(arr, label, key){
        return arr.map(i => ({ label: i[label], key: i[key] }) )
      },
      optionfyObject(arr, label, key){
        let obj = {}
        arr.map(i => obj[ i[key] ] = i[label]  )
        return obj
      },
      can(schema, attr){
        return get(schema, attr, true)
      }
    }
}