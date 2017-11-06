IssuesBlock = Vue.component('issuesblock', {
	template: `<div>

					<div class = "columns is-centered animated pulse">
						<div id="reviews-greeting" class = "column is-6-desktop is-8-tablet">
							You are looking at {{$route.params.owner}}\`s {{$route.params.repo}} repo. {{reviewsAmount}}
						</div>
						<div class = "column is-2-desktop is-3-tablet">
							<div class = "control">
								<button v-on:click="loadViews()" id="reviews-button" class="button is-info">Open reviews</button>
							</div>
						</div>
					</div>

					<div class = "columns is-centered animated pulse">
						<div class = "column.is-2" id = "labels">
							<labels :repodata = "repoData" ></labels>
						</div>
						<div class = "column is-7" id = "issues">
							<issues></issues>
						</div>
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
				return {
					repoData: {},
					reviewsAmount: ""
				};
			},
	props:['repodata'],
	watch: {
		repodata: function(){
			this.repoData = this.repodata;
			}
	},
	created: function(){
			//this.repoData = this.repodata;
			this.getReviewsAmount()
			},
	methods:{
		getReviewsAmount: function(){
			var that = this;
			axios.get(`getReviews/${that.$route.params.owner}/${that.$route.params.repo}`)
				  .then(function (response) {
				  	var revAmount = response.data.length;
				  	let answer = "It has ";
				  	if(revAmount == 0){
				  		answer += "no reviews";
				  	}
				  	else if(revAmount == 1){
				  		answer += revAmount + " review";
				  	}
				  	else{
				  		answer += revAmount + " reviews";
				  	}
				  	that.reviewsAmount = answer;
				  })
				  .catch(function (error) {
				    console.log(error);
				  });
		},
		loadViews: function(){
			this.$router.push(`/${this.$route.params.owner}/${this.$route.params.repo}/reviews`);
		}
	}

})