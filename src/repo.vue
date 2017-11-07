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
			console.log("getRepoData");
			var changed = false;
			var that = this;
			if(that.$route.params.owner != that.$store.getters.repoData.owner || that.$route.params.repo != that.$store.getters.repoData.repo){
				   	changed = true;
				    	//console.log("changed");    
				

				//axios.get(`https://api.github.com/repos/${that.$route.params.owner}/${that.$route.params.repo}?access_token=${that.$store.getters.userData.token}`)
				axios.get(`https://api.github.com/repos/${that.$route.params.owner}/${that.$route.params.repo}?access_token=b064f1bc0e424141d2858e4f55e7a30fac240a02`)
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