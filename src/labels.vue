var loops = 1;
Vue.component('labels', {
	template: `<div><b>Labels:</b>
					<ul>
						<li v-on:click="toogle($event, typeindex)" v-for="(label, typeindex) in labels">
							<span class="label-type">{{label.type}}</span><span :class="$store.getters.labels[typeindex].selected ? 'switcherM' : 'switcherP'">{{$store.getters.labels[typeindex].selected ? '-' : '+'}}</span>
							<ul v-if="label.subtypes.length" class = "sub-types">
								<li class="label-subtype" v-for="(subtype, subtypeindex) in label.subtypes" v-on:click="selectSubLabel(typeindex, subtypeindex)">
									{{subtype.subtype}}
									<span :class="selected(typeindex, subtypeindex) ? 'switcherM' : 'switcherP'"> {{selected(typeindex, subtypeindex) ? '-' : '+'}} </span>
								</li>
							</ul>
						</li>
					</ul>
			</div>`,
	methods: {
		toogle: function(event, typeindex){
			var subMenu = event.target.parentNode.querySelectorAll('.sub-types')[0];
			if(subMenu != undefined){
				if(event.target.className[0] == "s"){
					var selected = !this.selected(typeindex, -1);
	    			this.$store.dispatch('selectLabel', {typeIndex: typeindex, subTypeIndex: -1, selected});

					this.route();
				}
				else{
					if (subMenu.classList.contains('selected')) {
			            subMenu.classList.remove("selected");
			        } else {
			            subMenu.classList.add("selected");
			        }
				}
			}
			else{
				var selected = !this.selected(typeindex, -1);
	    		this.$store.dispatch('selectLabel', {typeIndex: typeindex, subTypeIndex: -1, selected});

				this.route();
			}
	    },
	    selectSubLabel(typeIndex, subTypeIndex){
	    	var selected = !this.selected(typeIndex, subTypeIndex);
	    	this.$store.dispatch('selectLabel', {typeIndex, subTypeIndex, selected});
	    	this.route();
	    },

	    route: function(){
	    	var labels = [];
	    	this.$store.getters.labels.forEach(function(item, i, arr){
	    		if(item.subtypes.length){
		    		item.subtypes.forEach(function(item1, i1, arr1){
		    			if(item1.selected){
		    				labels.push(item.type + ": " + item1.subtype);
		    			}
		    		});
		    	} else {
		    		if(item.selected){
		    			labels.push(item.type);
		    		}
		    	}
	    	});
	    	console.log(labels);
	    	this.$router.push('/');
	    	var path = `${this.$store.getters.repoData.owner}/${this.$store.getters.repoData.repo}`;
	    	this.$router.push({ path: path, query: labels.length ? { labels: labels.join(","), page: 1 } : {page:1}})
	    },

	    loadLabels: function(){
	    	if(this.$store.getters.repoData.changed){
	    		this.$store.getters.repoData.changed = false;
				this.$store.dispatch('loadLabels', { owner: this.$store.getters.repoData.owner, repo: this.$store.getters.repoData.repo });
			}
	    },
	    selected(typeIndex, subTypeIndex){
	    	if(subTypeIndex < 0){
	    		return this.$store.getters.labels[typeIndex].selected;
	    	} else{
	    		return this.$store.getters.labels[typeIndex].subtypes[subTypeIndex].selected;
	    	}
	    }
	},
	created: function(){
		this.loadLabels();
	},
	updated: function(){
		
		//	if(this.$store.getters.repoData.changed){
		//		console.log("loadLabels");
		//		this.$store.dispatch('loadLabels', { owner: this.$store.getters.repoData.owner, repo: this.$store.getters.repoData.repo });
		//	}
		this.loadLabels();
		},
	mounted: function(){
			this.$store.watch(
				  function(state){
				    return state.repoData;
				  },
				  (repoData) => {
				  		console.log("watch");
				  		//console.log(repoData.changed);
				  		this.loadLabels();
				  		
					}
			)
	},

	computed: {
	    	labels: function () {
	      		return this.$store.getters.labels;
	      		//return [];
	    	},
  	}
})