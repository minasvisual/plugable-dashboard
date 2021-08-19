 import { get } from 'lodash'
 import { mergeDeep } from '../services/helpers'
 
 export default {
     data(){
        return{
            action:{}
        }
     },
     methods:{
        sendType(cell, row, data){
            if( cell?.action?.source == 'cell')
                return cell
            else if( cell?.action?.source == 'row')
                return { ...row, [cell.key]: data }
            else if( cell?.action?.source == 'field')
                return { [cell.key]: data }
            else if( cell?.action?.source == 'context')
                return mergeDeep(cell?.action?.data, { overwrite: {api:{ resource:row }}, row: get(row, cell?.action?.id, data) })
            else if( cell?.action?.source == 'custom')
                return cell?.action?.data
            else    
                return data
        },
        redirect(project, domain){
            if( !confirm(`Are you sure to redirect to ${domain}`) ) return;
            
            this.$router.push(`/api/${project}/${domain}`) 
         },
         openModel({ schema, overwrite = {} }){
             console.debug("action openModel called", schema, overwrite)
            this.action = {
                type: "modal:grid",
                show: true, 
                schema,
                overwrite
            }
         },
         openForm({ schema, overwrite = {}, row = {} }){
            this.action = {
                type: "modal:form",
                show: true, 
                schema,
                overwrite,
                row
            }
         }
     }
 }