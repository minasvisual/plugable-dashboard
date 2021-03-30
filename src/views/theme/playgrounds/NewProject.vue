<template>
<div>
    <FormulateForm v-model="form" >
      <h4>Project setting</h4>
      <CRow>
        <FormulateInput class="col" label="Label" name="name" />
        <FormulateInput class="col" label="Slug" name="code" />
        <FormulateInput class="col" label="Site URL" name="url" />
        <FormulateInput class="col" label="Resource base path" name="resources_path" value="/models/" />
      </CRow>
      <p>Resources:</p>
      <p v-for="(item, slug) of form.resources" :key="slug">Name: {{ item.label }} - Path: {{ item.resource }}</p>
    </FormulateForm>
    <hr>
    <div class="Add Resource mb-5">
        <h4>New Resource</h4>
       <CRow>
        <FormulateInput
            class="col"
            v-model="resource.slug"
            validation="required"
            label="Slug"
        />
        <FormulateInput
            class="col"
            v-model="resource.label"
            label="Label"
        />
        <FormulateInput
            class="col"
            v-model="resource.resource"
            label="Resource file/path"
        />
       </CRow>
        <button class="btn btn-info" @click="addResource">Add Resource</button>
    </div>
    
    <hr>
    <button class="btn btn-success" @click="addProject">Add project</button>

</div>
</template>

<script>
export default {
    data(){return{
        form: {
            resources:{}
        },
        resource: {}
    }},
    computed:{
        projects(){
            return this.$store.state.projects
        }
    },
    methods:{
        addResource(){
            this.form.resources[this.resource.slug] = {
                resource: this.resource.resource,
                label: this.resource.label
            }
            this.resource = {}
            this.$message('Resource added')
        },
        addProject(){
            let projects = this.projects
            projects.push(this.form)
            this.$store.commit('set', ['projects', projects])
            this.$message('Project added. You should copy and save on json file/api')
            this.form = { resources:[] }
        }
    }
}
</script>