IssuesBlock = Vue.component('issuesblock', {
	template: `<div>

					<div class = "columns is-centered">
						<div id="reviews-greeting" class = "column is-6-desktop is-8-tablet">
							You are looking at {{$route.params.owner}}\`s {{$route.params.repo}} repo. It has N reviews
						</div>
						<div class = "column is-2-desktop is-3-tablet">
							<div class = "control">
								<button v-on:click="loadViews()" id="reviews-button" class="button is-info">Open reviews</button>
							</div>
						</div>
					</div>

					<div class = "columns is-centered">
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
	methods:{
		loadViews: function(){
			this.$router.push(`/${this.$route.params.owner}/${this.$route.params.repo}/reviews`);
		}
	}

})