<template> 
	<section class="wizard">
		<ul :class="navClass + ' my-2 w-100'">
			<li class="nav-item" v-for="(tb, ky) of steps" :key="ky" >
				<a class="nav-link " :class="{'active': active == tb.name, ['nav'+ky]: true }" @click="changeStep(tb, ky)" href="#">{{ tb.label }}</a>
			</li>
            <li class="nav-item col"></li>
            <li class="nav-item prev" >
				<a class="nav-link" @click="changeStep(steps[activeIdx-1], activeIdx-1)" href="#">Prev</a>
			</li>
            <li class="nav-item next" >
				<a class="nav-link" @click="changeStep(steps[activeIdx+1], activeIdx+1)" href="#">Next</a>
			</li>
		</ul>
	</section>
</template>


<script>
export default {
    name: "Wizard",
    props: { 
    }, 
    computed:{
        navClass() {
            return this.$attrs['nav-class'] || 'nav nav-pills'
        },
        steps() {
            return this.$attrs.steps
        },
        formValues(){
            return this.$store.state.crud.row || {}
        }
    },
	data(){return{
		active: '',
        activeIdx: 0
	}},
	mounted(){
		if( this.steps.length === 0 ) return ;

		this.changeStep(this.steps[0], 0)
		this.active = this.steps[0].name
        
        //this.bindButtons(0)
	},  
    destroyed() {
        this.styleTag.remove();
    },
	methods:{
        // bindButtons(idx){
        //     const self = this
        //     let nextBtn = document.querySelector('.next')
        //     console.debug('bindButtons', this.steps)
        //     if( nextBtn && nextBtn.addEventListener )
        //         nextBtn.addEventListener('click', function(event){
        //             event.preventDefault(); 
        //             let nxt = Number(idx+1)
        //             self.changeStep( self.steps[nxt], nxt )
        //         })
        // },
        showLastStep(tb){
			if( this.steps.length === 0 ) return ;

            let qtt = this.steps.length
            if( this.steps[qtt-1].name == tb.name )
                return `
                    .wizard .next{
                        display: none !important;
                    }
                    form .action-buttons{
                        display: block !important;
                    }
                `
            else
                return `
                    .wizard .next{
                        display: block !important;
                    }
                    form .action-buttons{
                        display: none !important;
                    }
                `
                
        },
        showFirstStep(tb){
			if( this.steps.length === 0 ) return ;
 
            if( this.steps[0].name == tb.name )
                return `
                    .wizard .prev{
                        display: none !important;
                    } 
                `
            else
                return `
                    .wizard .prev{
                        display: block !important;
                    } 
                ` 
        },
		changeStep(tb, idx){
			if( this.steps.length === 0 ) return;
			this.active = tb.name
			this.activeIdx = idx

			if( this.styleTag ) this.styleTag.remove();

			const css = `
				${ this.steps.map(i => i.name).join(',') }{
					display: none !important;
				} 
			    ${tb.name}{
					display: flex !important;
					flex-direction: column;
				}
                ${ this.showLastStep(tb) }
                ${ this.showFirstStep(tb) }
			`;
			this.styleTag = document.createElement('style');
			this.styleTag.appendChild(document.createTextNode(css));
			document.head.appendChild(this.styleTag);

            
            //this.bindButtons(idx)
		}
	}
}
</script>
