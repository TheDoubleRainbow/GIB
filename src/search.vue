Vue.component('search', {
	template: `
				<div>
					<div id="welcome">Welcome to GIB</div>
					<div id = "search" class = "columns is-centered">
						<div class = "column is-two-thirds-desktop">
							<div class = "columns">
								<div class = "column is-three-quarters">
									<div class = "control">
										<input @keyup.enter="submit()" type="text" placeholder="Repository URL" class="input" v-model = "url">
									</div>
								</div>
								<div class = "column is-one-quarter">
									<div class = "control">
										<button v-on:click="submit()" id="search-button" class="button is-primary">View</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>`,
	data: function() {
		return {
			//url: "https://github.com/facebook/react",
			url: "",
			repo: {}
		}
	},
	methods:{
		submit: function(){
			var repoData = {};
			if(!this.url){this.url = "";};
			var urlArray = this.url.split('/').reverse();
			repoData.owner = urlArray[1] ? urlArray[1] : "";
			repoData.repo = urlArray[0] ? urlArray[0].split(".")[0] : "";
			this.$router.push(`/${repoData.owner}/${repoData.repo}`);
			this.url = "";
			this.repo = repoData;
		}
	}
})