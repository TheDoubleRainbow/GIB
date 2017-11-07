IssuesBlock = Vue.component('issuesblock', {
	template: `<div>

					<div class = "columns is-centered animated pulse">
						<div id="reviews-greeting" class = "column is-6-desktop is-8-tablet">
							You are looking at <span id="reviews-reponame">{{$route.params.owner}}/{{$route.params.repo}}</span> repo. {{reviewsAmount}}
						</div>
						<div class = "column is-1-desktop is-2-tablet">
							<div class = "control">
								<button v-on:click="loadViews()" id="reviews-button" class="button is-info">Reviews</button>
							</div>
						</div>
						<div class = "column is-1-desktop is-2-tablet">
							<div class = "control">
								<button v-on:click="loadRepodata()" id="repodata-button" class="button is-info">Repo data</button>
							</div>
						</div>
					</div>

					<div class = "columns is-centered animated pulse">
						<div class = "column.is-2" id = "labels">
							<labels></labels>
						</div>
						<div class = "column is-7" id = "issues">
							<issues></issues>
						</div>
					</div>
				</div>`,
	beforeRouteUpdate (to, from, next) {
	  	},
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
	updated: function(){

			var that = this;

			if(that.$route.query.labels){
				that.$route.query.labels.split(',').forEach(function(item, i, arr) {
                        var typeArray = item.split(": ");
                        that.$store.getters.labels.forEach(function(item1, i1, arr1){
                            if(item1.type == typeArray[0]){
                            	item1.subtypes.forEach(function(item2, i2, arr2) {	
                            		if(item2.subtype == typeArray[1]){
                            			that.$store.dispatch('selectLabel', {typeIndex: i1, subTypeIndex: i2, selected: true});
                            		}
                            	});
                            }
                        });
                });
			}
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
		},
		loadRepodata: function(){
			this.$router.push(`/${this.$route.params.owner}/${this.$route.params.repo}/repodata`);
		}
	}

})