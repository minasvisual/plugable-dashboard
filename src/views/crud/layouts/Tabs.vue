<template> 
	<section>
		<ul class="nav nav-tabs my-2 w-100">
			<li class="nav-item" v-for="(tb, ky) of tabs" :key="ky" >
				<a class="nav-link" :class="{'active': active == tb.name }" @click="changeTab(tb)" href="#">{{ tb.label }}</a>
			</li>
		</ul>
	</section>
</template>


<script>
export default {
	name: "Tabs",
  props: {
    context: {
      type: Object,
      default: () => ({ model:{}, options:[] })
    },
  }, 
  computed:{
		tabs() {
			return this.$attrs.tabs
		}
  },
	data(){return{
		active: ''
	}},
	mounted(){
		if( this.tabs.length === 0 ) return ;

		this.changeTab(this.tabs[0])
		this.active = this.tabs[0].name
	},
  destroyed() {
    this.styleTag.remove();
  },
	methods:{
		changeTab(tb){
			if( this.tabs.length === 0 ) return ;
			console.log("change tab")

			this.active = tb.name

			if( this.styleTag ) this.styleTag.remove();

			const css = `
				${ this.tabs.map(i => i.name).join(',') }{
					display: none !important;
				} 
			    ${tb.name}{
				  ${ tb.enabledStyle ? `${ tb.enabledStyle } ${ tb.enabledStyle.includes('important') ?'':'!important' }` : 'display: flex !important; flex-direction: column;' }
				}
			`;
			this.styleTag = document.createElement('style');
			this.styleTag.appendChild(document.createTextNode(css));
			document.head.appendChild(this.styleTag);
		}
	}
}
</script>

// {
// 	"component": "tabs",
// 	"class": "d-flex",
// 	"tab": "num1",
// 	"tabs": [
// 		{
// 			"name": ".tab2",
// 			"label": "ID"
// 		},
// 		{
// 			"name": ".tab3",
// 			"label": "Created"
// 		}
// 	]
// },
// {
// 	"component": "div",
// 	"class": "d-flex tab2",
// 	"tab": "num2",
// 	"children": [
// 		{
// 			"name": "outro",
// 			"label": "OUtro",
// 			"hidden": false,
// 			"config": {
// 				"grid": true
// 			},
// 			"depth": 2
// 		},
// 		{
// 			"name": "outrotrou",
// 			"label": "OUtro",
// 			"config": {
// 				"grid": true,
// 				"sort": 1
// 			},
// 			"depth": 2
// 		}
// 	]
// },
// {
// 	"component": "div",
// 	"class": "d-flex tab3",
// 	"tab": "num3",
// 	"children": [
// 		{
// 			"name": "title",
// 			"label": "Title",
// 			"config": {
// 				"grid": true
// 			},
// 			"depth": 2
// 		},
// 		{
// 			"name": "artist_name",
// 			"label": "Artist",
// 			"config": {
// 				"grid": true,
// 				"sort": 1
// 			},
// 			"depth": 2
// 		}
// 	]
// }