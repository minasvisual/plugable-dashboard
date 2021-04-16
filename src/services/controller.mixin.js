import { has, get } from "lodash";
import { loadModel, getData, saveData, deleteData } from "./models";
import { filterParams } from "./helpers";

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
          if (!has(this.currentProject, "resources")) return console.log('sem projeto definido');

          if (
            has(this.$route, "params.model") &&
            has(this.currentProject, `resources[${this.$route.params.model}]`)
          ) {
            this.$store.commit('set', ['loading', true])
            this.loading = true
            let url = this.currentProject.resources_path + get( this.currentProject, `resources[${this.$route.params.model}.resource]`)

            return await loadModel(url, opts).then((data) => {
                if( !data.title ) throw {message: 'JSON parse fails'}; 

                this.active = data
                console.debug('Load model '+ data.title, data)
                //if (this.active.auth) this.logged = false;

                if( this.renderComponent === true ) this.forceRerender()
                else this.renderComponent = true;
                
                this.$store.commit('set', ['loading', false])
                return data;
            })
          } else {
            this.$message("Model " + this.$route.params.model + " doesnt exist");
            this.$router.push("/dashboard");
          }
      }catch(err){
        console.error('Catch load model', err)
        this.$store.commit('set', ['loading', false])
        this.loading = false;
        this.renderComponent = false
        this.$message("Error to load Model " + this.$route.params.model +" : "+ err.message);
      }
    },
    getData(schema, options){
      return getData(schema, options)
    },
    saveData(schema, data){
      return saveData(schema, data)
        .then((res) => {
            this.$message('Saved with success') 

            return res
        }) 
        .catch(e => {
          this.$message( get(e, 'response.data.message', e.message ) )
          return Promise.reject(e)
        }) 
    },
    deleteData(data){
      //this.active.api = Object.assign(this.active.api, ...this.request); 
      this.$store.commit('set', ['loading', true])
      return deleteData(this.active, data)
          .then(() => this.$store.commit('set', ['loading', false]))
    },  
    forceRerender() {
      console.debug('called rerender')
      this.renderComponent = false;

      this.$nextTick(() => {
        this.renderComponent = true;
      });
    },
    errors(data) {
      this.$message(data.message || data);
      console.error("error", data);
      
      this.$store.commit('set', ['loading', false])
    },
    // Standalone grid
  },
};
