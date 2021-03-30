import { has, get, set, sortBy, debounce } from "lodash";
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
    async loadModel() {
      if (!has(this.currentProject, "resources")) return console.log('sem projeto definido');

      if (
        has(this.$route, "params.model") &&
        has(this.currentProject, `resources[${this.$route.params.model}]`)
      ) {
        this.loading = true;
        let url = this.currentProject.resources_path + get( this.currentProject, `resources[${this.$route.params.model}.resource]`)

        return await loadModel(url).then((data) => {
            console.debug('loadmodel res', data.title)
            this.active = data
            //if (this.active.auth) this.logged = false;

            if( this.renderComponent === true ) this.forceRerender()
            else this.renderComponent = true;
            return data;
        });
      } else {
        this.$message("Model " + this.$route.params.model + " doesnt exist");
        this.$router.push("/dashboard");
      }
    },
    getData(schema, options){

      // schema.api = Object.assign(schema.api, this.request)

      // console.log(schema, request)

      return getData(schema, options)
    },
    saveData(schema, data){
      return saveData(schema, data)
        .then((res) => {
            this.$message('Saved with success') 
        }) 
        .catch(e => this.$message( get(e, 'response.data.message', e.message ) )) 
    },
    deleteData(data){
      //this.active.api = Object.assign(this.active.api, ...this.request); 
      return deleteData(this.active, data)
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

      console.log("error", data);
    },
  },
};
