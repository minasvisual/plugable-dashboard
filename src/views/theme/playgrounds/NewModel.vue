<template>
<div>
        <h4>Project setting</h4>
        <CRow>
            <FormulateInput class="col" label="Title" v-model="form.title" />
            <FormulateInput class="col" label="Slug" help="(same project config)" v-model="form.domain" />
            <FormulateInput class="col" label="Primary Key" v-model="form.primaryKey" />
        </CRow>
        <CRow>
            <FormulateInput class="col" label="Api Base URL" v-model="form.api.rootApi" />
            <FormulateInput class="col" label="Response array" v-model="form.api.wrapData" :value="null" />
            <FormulateInput class="col" label="Response count" v-model="form.api.totalData" :value="null" />
        </CRow>
    <hr>
    
    <button class="btn btn-success" @click="addProject">Add Model</button>

</div>
</template>

<script>
export default {
    data(){return{
        form: {
            type:'object',
            properties:[],
            api:{}
        }
    }},
    computed:{
    },
    methods:{
        addProject(){
            this.$emit('model', this.form)
            this.$message('Project added. You should copy and save on json file/api')
            this.form = {  type:'object', properties:[], api:{} }
        }
    }
}
</script>