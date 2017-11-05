Repo = Vue.component('repo', {
	template: `<div>	
					<router-view class = "columns is-centered" :repodata = "repoData"></router-view>
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
				console.log("repoWatch");
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
				  	//this.labelsData = response;
				    //console.log(response);
				    that.repoData = {owner: that.$route.params.owner, repo:that.$route.params.repo, available: true};
				    //that.$emit('repodata', that.repoData);
				    console.log("axios");
				    //console.log(that.repoData);
				  })
				  .catch(function (error) {
				    console.log(error);
				    that.repoData = {owner: "", repo: "" , available: false};
				  });
		}
	}
})