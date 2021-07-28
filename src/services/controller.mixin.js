import { has, get, } from "lodash";
import { loadModel, getData, saveData, deleteData } from "./models";
import { formatOutput, getErrorMessage } from "./helpers";

export default {
  data(){
    return{
      active:{},
      renderComponent: false
    }
  },
  computed:{ 
    hasAuth() {
      return has(this.currentProject, 'auth');
    },
    currentProject(){
      return this.$store.state.currentProject || null
    }, 
    request(){
      return get(this.$store, `state.auth.${this.currentProject.code}.request`, {})
    }, 
  },
  methods: {
    async loadModel(opts) {
      try{
          if (!has(this.currentProject, "resources")) return console.debug('sem projeto definido');

          if (
            has(this.$route, "params.model") &&
            has(this.currentProject, `resources[${this.$route.params.model}]`)
          ) {
            this.$store.commit('setLoader', ['model', true])
            this.loading = true
            let url = this.currentProject.resources_path + get( this.currentProject, `resources[${this.$route.params.model}.resource]`)

            return await loadModel(url, opts).then((data) => {
                if( !data.title ) throw {message: 'JSON parse fails'}; 

                this.active = data
                console.debug('Load model '+ data.title, data)
                //if (this.active.auth) this.logged = false;

                if( this.renderComponent === true ) this.forceRerender()
                else this.renderComponent = true;
                
                this.$store.commit('setSchema', [this.active.domain, false])
                this.$store.commit('setLoader', ['model', false])
                return data;
            })
          } else {
            this.$message("Model " + this.$route.params.model + " doesnt exist");
            this.$router.push("/dashboard");
          }
      }catch(err){
        console.error('Catch load model', err)
        this.$store.commit('setLoader', ['model',  false])
        this.loading = false;
        this.renderComponent = false
        this.$message("Error to load Model " + this.$route.params.model +" : "+ getErrorMessage(err));
      }
    },
    loadModelByUrl(url, opts){
        return loadModel(url, opts).then((data) => {
          if( !data.title ) throw {message: 'JSON parse fails'}; 
          
          return data;
      })
    },
    getData(schema, options){
      return getData(schema, options)
    },
    saveData(schema, data){
      this.$store.commit('setLoader', ['form', true])
      data = formatOutput(schema.properties, data)
      return saveData(schema, data)
        .then((res) => {
            this.$message('Saved with success') 

            return res
        }) 
        .catch(e => {
          this.$message( getErrorMessage(e) )
          return Promise.reject(e)
        }).finally(() => {
          this.$store.commit('setLoader', ['form', false])
        })
    },
    deleteData(schema, data){
      //this.active.api = Object.assign(this.active.api, ...this.request); 
      this.$store.commit('setLoader', ['table', true])
      return deleteData(schema, data)
          .then((data) => { 
              return data;
          })
          .catch(e => { 
            this.$message( getErrorMessage(e) )
            return Promise.reject(e)
          }).finally(() =>{
            this.$store.commit('setLoader', ['table', false])
          })
    },  
    forceRerender() {
      console.debug('called rerender')
      this.renderComponent = false;

      this.$nextTick(() => {
        this.renderComponent = true;
      });
    },
    errors(data) {
      this.$message( getErrorMessage(data) );
      console.error("error", data);
      
      this.$store.commit('setLoader', ['form', false])
      this.$store.commit('setLoader', ['table', false])
    },
    // Standalone grid
    get:get
  },
};
