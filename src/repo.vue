Repo = Vue.component('repo', {
	template: `<div class = "columns is-centered">
					<div class = "column.is-2" id = "labels">
						<labels :repodata="repoData" :repoavailable="repoAvailable" ></labels>
					</div>
					<div class = "column is-7" id = "issues">
						<issues></issues>
					</div>
				</div>`,
	data: function(){
			return {
						repoData: {
							owner: "",
							repo: ""
						},
						repoAvailable: false};
					},
	watch: {
		'$route.params': function(){
			this.getRepoData();
			}
	},
	created: function(){
			this.getRepoData();
			},
	methods:{
			getRepoData: function(){
			var that = this;
			axios.get(`https://api.github.com/repos/${that.$route.params.owner}/${that.$route.params.repo}`)
				  .then(function (response) {
				  	//this.labelsData = response;
				    //console.log(response);
				    that.repoData = {owner: that.$route.params.owner, repo:that.$route.params.repo};
				    that.repoAvailable = true;
				    //that.$emit('repodata', that.repoData);
				    console.log("axios");
				    //console.log(that.repoData);
				  })
				  .catch(function (error) {
				    console.log(error);
				    that.repoData = {owner: "", repo: ""};
				    that.repoAvailable = false;
				  });
		}
	}	
})