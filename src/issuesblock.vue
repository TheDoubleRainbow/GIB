IssuesBlock = Vue.component('issuesblock', {
	template: `<div>
					<div class = "column.is-2" id = "labels">
						<labels :repodata = "repoData" ></labels>
					</div>
					<div class = "column is-7" id = "issues">
						<issues></issues>
					</div>
				</div>`,
	data: function(){
			/*return {
						repoData: {
							owner: "",
							repo: "",
							repoAvailable: false
						}
					}
				},*/
				return {repoData: {}};
			},
	props:['repodata'],
	watch: {
		repodata: function(){
			this.repoData = this.repodata;
			console.log("IssuesBlockWatch");
			}
	},
	created: function(){
			//this.repoData = this.repodata;
			}
	//methods:{
	//		getRepoData: function(){
	//	}
	//}	
	//<labels :repodata="repoData" :repoavailable="repoAvailable" ></labels>
	//<issues></issues>
})