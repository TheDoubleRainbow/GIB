var loops = 1;
Vue.component('labels', {
	template: `<div><b>Labels:</b>
					<ul>
						<li v-on:click="toogle($event)" v-for="label in labels">
							<span class="label-type">{{label.type}}</span>
							<ul class = "sub-types">
								<li class="label-subtype" v-for="subtype in label.subtypes">{{subtype}}</li>
							</ul>
						</li>
					</ul>
			</div>`,
	methods: {
		toogle: function(event){
			var subMenu = event.target.parentNode.querySelectorAll('.sub-types')[0];
	        if (subMenu.classList.contains('selected')) {
	            subMenu.classList.remove("selected");
	        } else {
	            subMenu.classList.add("selected");
	        }
	    },
	},
	//updated: function(){
		//
		//	if(this.$store.getters.repoData.changed){
		//		console.log("loadLabels");
		//		this.$store.dispatch('loadLabels', { owner: this.$store.getters.repoData.owner, repo: this.$store.getters.repoData.repo });
		//	}
		//},
	mounted: function(){
			this.$store.watch(
				  function(state){
				    return state.repoData;
				  },
				  //this.$store.getters.repoData,
				  (repoData) => {
				  		console.log("watch");
				  		console.log(repoData.changed);
				  		if(repoData.changed){
				  			console.log("loadLabelsinwatch");
							this.$store.dispatch('loadLabels', { owner: this.$store.getters.repoData.owner, repo: this.$store.getters.repoData.repo });

				  		}
				  }
			)
		},

	computed: {
	    	labels: function () {
	      		return this.$store.getters.labels;
	      		//return [];
	    	}
  	}
})