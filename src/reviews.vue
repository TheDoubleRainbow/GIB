Vue.component('reviews', {
	template: `<div id = "reviews" class = "columns is-centered">
					<div class = "column is-two-thirds-desktop">
						<div class = "columns is-centered">
							<div class = "column is-9">
								You are now looking at {{repo.repo}} repo by {{repo.member}}. This repo has 3 reviews.
							</div>
							<div class = "is-1">
								<div class = "control">
									<button v-on:click="loadViews()" id="search-button" class="button is-info">Open reviews</button>
								</div>
							</div>
						</div>
					</div>
				</div>`,
	data: function() {
		return {
		}
	},
	watch: {
		repo: function(val){
			this.loadViews()
		}
	},
	props: ["repo"],
	
	methods:{
		loadViews: function(){
			this.repoData = this.repo
		}
	}
})