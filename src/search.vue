Vue.component('search', {
	template: `<div id = "search" class = "columns is-centered">
					<div class = "column is-two-thirds-desktop">
						<div class = "columns">
							<div class = "column is-three-quarters">
								<div class = "control">
									<input type="text" placeholder="Repository URL" class="input" v-model = "url">
								</div>
							</div>
							<div class = "column is-one-quarter">
								<div class = "control">
									<button v-on:click="submit()" id="search-button" class="button is-primary">View</button>
								</div>
							</div>
						</div>
					</div>
				</div>`,
	data: {
		url: ""
	},
	methods:{
		submit: function(){
			var repoData = {};
			if(!this.url){this.url = "";};
			var urlArray = this.url.split('/').reverse();
			repoData.repo = urlArray[0] ? urlArray[0].split(".")[0] : "";
			repoData.user = urlArray[1] ? urlArray[1] : "";
			//this.$emit('', repoData);
			console.log(repoData);
		}
	}
})