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
	created: function(){

			var that = this;

			/*if(that.$route.query.labels){
				that.$route.query.labels.split(',').forEach(function(item, i, arr) {
                        var typeArray = item.name.split(": ");
                        var found = false;
                        that.$store.labels.forEach(function(item1, i1, arr1){
                            if(item1.type == typeArray[0]){
                                //labels[i1].subtypes.push({subtype: typeArray[1], selected: false});
                                //that.
                                found = true;
                            }
                        });
                        if(found == false){
                            var subtype = typeArray[1];// ? typeArray[1];
                            labels.push({name: item.name, type: typeArray[0], subtypes: subtype ? [{subtype: subtype, selected: false}] : [], color: item.color});
                        }
                    });
			}*/

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