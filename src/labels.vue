var loops = 1;
Vue.component('labels', {
	template: `<div><b>Labels:</b>
					<ul>
						<li v-on:click="toogle($event, typeindex)" v-for="(label, typeindex) in labels">
							<span class="label-type">{{label.type}}</span><span v-if="$store.getters.labels[typeindex].subtypes.length != 0" :class="$store.getters.labels[typeindex].selected ? 'switcherM' : 'switcherP'">{{$store.getters.labels[typeindex].selected ? '-' : '+'}}</span>
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
					if(this.$store.getters.labels[typeindex].selected == undefined){
						this.$store.getters.labels[typeindex].selected = true
					}
					else{
						this.$store.getters.labels[typeindex].selected = !this.$store.getters.labels[typeindex].selected
					}
					for(var i = 0; i < this.$store.getters.labels[typeindex].subtypes.length; i++){
						this.$store.getters.labels[typeindex].subtypes[i].selected = !this.$store.getters.labels[typeindex].subtypes[i].selected
					}
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
				//Request for empty sebtypes
			}
	    },
	    selectSubLabel(typeIndex, subTypeIndex){
	    	var selected = !this.selected(typeIndex, subTypeIndex);
	    	this.$store.dispatch('selectLabel', {typeIndex, subTypeIndex, selected});
	    	var labels = [];
	    	this.$store.getters.labels.forEach(function(item, i, arr){
	    		item.subtypes.forEach(function(item1, i1, arr1){
	    			if(item1.selected){
	    				labels.push(item.type + ": " + item1.subtype);
	    			}
	    		});
	    	});
	    	console.log(labels);
	    	this.$router.push('/');
	    	var path = `${this.$store.getters.repoData.owner}/${this.$store.getters.repoData.repo}`;
	    	this.$router.push({ path: path, query: labels.length ? { labels: labels.join(","), page: 1 } : {page:1}})
	    	//console.log(this.$router.)
	    },

	    loadLabels: function(){
	    	if(this.$store.getters.repoData.changed){
	    		this.$store.getters.repoData.changed = false;
				this.$store.dispatch('loadLabels', { owner: this.$store.getters.repoData.owner, repo: this.$store.getters.repoData.repo });
			}
	    },
	    selected(typeIndex, subTypeIndex){
	    	return this.$store.getters.labels[typeIndex].subtypes[subTypeIndex].selected
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