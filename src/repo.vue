require("./reponotfound.vue");
Repo = Vue.component('repo', {
	template: `<div>	
					<router-view v-if="repoData.available"></router-view>
					<reponotfound class="columns is-centered" v-if="!repoData.available"></reponotfound>
					
				</div>`,
	/*data: function(){
		return {
					repoData: {
						owner: "",
						repo: "",
						available: false,
					}
				}
			},*/
	//beforeRouteUpdate (to, from, next) {
	//  	},
	//watch()
	created: function(){
			this.getRepoData();
		},
	updated: function() {
			this.getRepoData();
		},
	computed: {
	    	repoData: function () {
	      		return this.$store.getters.repoData;
	    	}
  		},

	methods: {
		getRepoData: function(){
			var changed = false;
			var that = this;
			if(that.$route.params.owner != that.$store.getters.repoData.owner || that.$route.params.repo != that.$store.getters.repoData.repo){
				   	changed = true;
				    	//console.log("changed");    
				console.log("getRepoData");

				axios.get(`https://github.com/repos/${that.$route.params.owner}/${that.$route.params.repo}`)
					  .then(function (response) {
					  	console.log("axios");
					    
					    
					   // }
					    that.$store.dispatch('setRepoData', {owner: that.$route.params.owner, repo:that.$route.params.repo, available: true, changed: changed});

					  })
					  .catch(function (error) {
					    console.log(error);
					    //that.$store.dispatch('setRepoData', {owner: "", repo: "", available: false, changed: false});
					  });
			}
		}
	}
})