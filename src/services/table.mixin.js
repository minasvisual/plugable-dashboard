import { get, has, debounce, sortBy } from 'lodash'

export default {
    computed: {

    },
    methods:{
        validateQueryInfo(queryInfo){
            if( !queryInfo || typeof queryInfo !== 'object' ) return false;
            
            if( ['sizeChange', 'size', 'pageChange', 'sort', 'filter', 'page', 'init'].includes(queryInfo.type) ){
                if( queryInfo.type == 'filter' &&  !get(queryInfo, 'filters[0].prop')  )
                    return false;
            }else{
                return false;
            }

            return true
        },
        schemaColumns(properties){
            let columns = [ { label: '', key: "selected", filter: false, sorter:false, sort: -1 } ]
            let extractdata = (col = {}, k) =>  {
                if( col.children && Array.isArray(col.children) )  col.children.map( i => extractdata(i, k))
                if( get(col, 'config.grid', false) )
                    columns.push({
                        sort: get(col, 'config.sort', k+1),
                        key: get(col, 'name', col.id),
                        label: get(col, 'label', col.id),
                        type: get(col, 'config.type', (col.type || 'text')),
                        action: get(col, 'config.action', (col.attributes || {})),
                        options: get(col, 'options', {}),
                    })
            }
            properties.map((col, k) => {
                    extractdata(col, k)
            })

            columns.push({ label: '', key: 'actions', filter: false, sorter: false })

            return sortBy(columns, ['sort'])
        }
    }
}