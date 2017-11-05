IssuesBlock = Vue.component('issuesblock', {
	template: `<div>

					<div class = "columns is-centered">
						<div class = "column is-7">
							
						</div>
						<div class = "is-1">
							<div class = "control">
								<button v-on:click="loadViews()" id="search-button" class="button is-info">Open reviews</button>
							</div>
						</div>
					</div>


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
			},
	methods:{
		loadViews: function(){
			this.$router.push(`/${this.repoData.owner}/${this.repoData.repo}/reviews`);
		}
	}

})