Reviews = Vue.component('reviews', {
	template: `<div id = "reviews" class = "columns is-centered">
					<div class = "column is-10-widescreen is-10-fullhd is-12-desktop">
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
				</div>
			</div>
		</div>`,
		//You are looking at {{repodata.repo}} repo by {{repodata.owner}}. This repo has 3 reviews.
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
		//repodata: function(val){
		//	this.loadViews()
		//}
	},
	props: ["repodata"],
	
	methods:{
	}
})