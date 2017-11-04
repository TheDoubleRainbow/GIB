Vue.component('reviews', {
	template: `<div id = "reviews" class = "columns is-centered">
					<div class = "column is-10-widescreen is-10-fullhd is-12-desktop">
						<div class = "columns is-centered">
							<div class = "column is-7">
								You are looking at {{repo.repo}} repo by {{repo.member}}. This repo has 3 reviews.
							</div>
							<div class = "is-1">
								<div class = "control">
									<button v-on:click="loadViews()" id="search-button" class="button is-info">Open reviews</button>
								</div>
							</div>
						</div>
						<div id="reviews-list" class="columns is-centered">
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
				</div>`,
	data: function() {
		return {
			reviews: [
				{id: 0, user: {name: "Vasya"}, text: "What a nice repo, i rly rly rly rly love it"},
				{id: 1, user: {name: "Facebook"}, text: "This is our repo, normies get out reeeeeeeeê"},
				{id: 2, user: {name: "Kolya"}, text: "Hello world"}
			]
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
			
		}
	}
})