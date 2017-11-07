Reviews = Vue.component('reviews', {
	/*template: `<div id = "reviews" class = "columns is-centered">
					<div class = "column is-10-widescreen is-10-fullhd is-12-desktop">
						<div id="reviews-list" class="columns is-centered">
						<div class = "columns is-centered">
							<div class = "column is-7">
									You are now looking at {{repodata.repo}} repo by {{repodata.owner}}. This repo has 3 reviews.
							</div>
							<div class = "is-1">
								<div class = "control">
									<button v-if="!show" v-on:click="show = !show" id="search-button" class="button is-info">Open reviews</button>
									<button v-if="show" v-on:click="show = !show" id="search-button" class="button is-info">Close reviews</button>
								</div>
							</div>
						</div>
						<div v-if="show" id="reviews-list" class="columns is-centered">
							<div class="column is-10">
								<div class="review" v-for="review in reviews">
									<div class="review-header">
										Review by {{review.user.name}} 
									</div>
									<div class="review-body">
										{{review.text}}
									</div>
								</div>
								<div class="review-new">
									<div class="review-new-header">
										Write your own review:
									<div>
									<div class="review-new-body column is-12">
										<textarea rows="2" class="textarea"></textarea>
									</div>
									<div class="review-new-confirm">
										<button class="button is-primary">Push my review</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>`,*/
	template: `<div>
				<div class = "columns is-centered">
								
								<div class = "column is-8 is-8-desktop is-12-tablet">
									<div class = "control">
										<button v-on:click="loadIssues()" id="issues-button" class="button is-info">Back to issues</button>
									</div>
								</div>
							</div>

				<div id = "reviews" class = "columns is-centered">
					<div class = "column is-10-widescreen is-10-fullhd is-12-desktop">
						<div id="reviews-list" class="columns is-centered">
							<div class="column is-10">
								<div class="loading-div" v-if="!loaded"><img class="loading-img" src="/img/loading.gif" /></div>
								<div v-if="reviews.length == 0 && loaded" class="reviews-none">There're no reviews yet. Feel free to add one.</div>
								<div class="review animated pulse" v-for="review in reviews">
									<div class="review-header">
										Review by {{review.user}} 
									</div>
									<div class="review-body">
										<p>
											{{review.text}}
										</p>
									</div>
								</div>
								<div class="review-new">
									<div class="review-new-header">
										Write your own review:
									<div>
									<div class="review-new-body column is-12">
										<input placeholder="Your review" @keyup.enter="addReview" v-model="reviewText" type="text" class="input" />
									</div>
									<div class="review-new-confirm">
										<button @click="addReview" class="button is-primary">Push my review</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>`,
	data: function() {
		return {
			loaded: false,
			show: false,
			reviews: [],
			reviewText: ""
		}
	},
	watch: {
		//repodata: function(val){
		//	this.loadViews()
		//}
	},
	//props: ["repodata"],
	
	methods:{
		loadIssues: function(){
			this.$router.push(`/${this.$route.params.owner}/${this.$route.params.repo}/issues`);
		},
		getReviews: function(){
			var that = this;
			axios.get(`getReviews/${that.$route.params.owner}/${that.$route.params.repo}`)
				  .then(function (response) {
				  	that.reviews = response.data;
				  	
				  	that.loaded = true;
				  })
				  .catch(function (error) {
				    console.log(error);
				  });
		},
		addReview: function(){
			var that = this
			axios.post('/addReview', {
				    repo: that.$route.params.owner+"/"+that.$route.params.repo,
				    user: this.$store.getters.userData.login ,
				    text: that.reviewText
				  })
				  .then(function (response) {
				    that.reviewText = "";
				    that.getReviews();
				  })
				  .catch(function (error) {
				    console.log(error);
				  });
		}
	},
	created: function(){
		this.getReviews()
	}
})