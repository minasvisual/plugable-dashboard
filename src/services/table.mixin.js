import { get, has, debounce } from 'lodash'

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
        }
    }
}