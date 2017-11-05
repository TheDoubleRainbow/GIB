require("./reponotfound.vue");
Repo = Vue.component('repo', {
	template: `<div>	
					<router-view class="columns is-centered" v-if="repoData.available"></router-view>
					<reponotfound class="columns is-centered" v-if="!repoData.available"></reponotfound>
					
				</div>`,
	data: function(){
		return {
					repoData: {
						owner: "",
						repo: "",
						available: false,
					}
				}
			},
	watch: {

			'$route.params': function(){
				this.getRepoData();
			}
		},
	created: function(){
			this.getRepoData();
			},
	methods: {
		getRepoData: function(){
			var that = this;
			axios.get(`https://api.github.com/repos/${that.$route.params.owner}/${that.$route.params.repo}`)
				  .then(function (response) {
				    that.repoData = {owner: that.$route.params.owner, repo:that.$route.params.repo, available: true};
				  })
				  .catch(function (error) {
				    console.log(error);
				    that.repoData = {owner: "", repo: "" , available: false};
				  });
		}
	}
})