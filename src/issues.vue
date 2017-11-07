Vue.component('issues', {
	template: ` <div>
				<div class="issue" v-for="issue in issues" v-bind:id="'id-'+issue.id"> 
							<div class="issue-header" @click="openIssue(issue, $event)">
								<div class="issue-header-status" :style="{background: stateBg(issue.state)}"></div>
								<div class="issue-header-title"> {{issue.title}} </div>
								<div class="issue-header-url"><a :href="'http://github.com/'+$store.getters.repoData.owner+'/'+$store.getters.repoData.repo+'/pull/'+issue.url.split('issues')[1]">View on Github</a></div>

								<div class="issue-header-pullrequest" v-if="issue.pullrequest"><a :href="'http://github.com/'+$store.getters.repoData.owner+'/'+$store.getters.repoData.repo+'/pull/'+issue.pullrequest.url.split('pulls')[1]">View pull request</a></div>
								<div class="issue-header-labels">

									<div class="issue-header-label" v-for="label in issue.labels">
										<div class="issue-header-label-name" :style="{background: '#'+label.color}"> {{label.name}} </div>
									</div>
								</div>
							</div>
							<div class="issue-body">
								<div class="issue-message-posted-by">Created by <a :href="'https://github.com/' + issue.user.name"><img :src="issue.user.avatar" />{{issue.user.name}}</a></div>
								<div class="issue-message issue-first-message"></div>
								<div class="issue-messages">
									<div class issue-message-wrap v-for="message in issue.messages">
										<div class="circle"></div>
										<div class="issue-message-posted-by">Posted by {{message.user.name}}</div>
										<div class="issue-message">{{message.content}}</div>
									</div>
								</div>
							</div>
							<chat :chatid="'chat'+issue.id">
							</chat>
				</div></div>`,
	data: function(){
		return {
			issues: [],
		}
	},
	created: function(){
		this.loadIssues();
	},
	watch: {
	    '$route' (to, from) {

	    	//console.log("load_iisues")
	    	this.loadIssues();


	      //this.issues =
	    }
  	},

	methods:{
		stateBg: function(type){
			return type =='open' ? "#3CCE7D" : "#C8363D"
		},
		openIssue: function(issue, event){
			if(issue.opened == false || issue.opened == undefined || event.target.innerHTML == "View on Github" || event.target.innerHTML == "View pull request"){
				issue.opened = true;
				//.. load messages
				issue.messages = [];
				console.log("loadMessages");
				axios.get(`${issue.comments_url}?access_token=${this.$store.getters.userData.token}`)

		              .then(function (response){
		                console.log(response);
		                response.data.forEach(function(item, i, arr){
		                	//console.log(item);
		                	issue.messages.push({user: {name: item.user.login}, content: item.body});

		                });

		              })
		              .catch(function (error) {
		             //   labels = [];
		                console.log(error);
		            });
				//.. 
				issue.html = document.getElementById("id-"+issue.id);
				issue.html.className = "issue-opened"
				issue.html.querySelector(".issue-first-message").innerHTML = issue.body; issue.html.querySelector(".issue-body").style.display = "block"; issue.html.querySelector(".issue-header-url").style.display = "block";if(issue.pullrequest){issue.html.querySelector(".issue-header-pullrequest").style.display = "block"} issue.html.querySelector(".chat-open").style.display = "block";
						
			}
			else{
				issue.opened = false;
				issue.html = document.getElementById("id-"+issue.id);
				issue.html.className = "issue";
				issue.html.querySelector(".issue-body").style.display = "none"; issue.html.querySelector(".issue-header-url").style.display = "none"; if(issue.pullrequest){issue.html.querySelector(".issue-header-pullrequest").style.display = "none"} issue.html.querySelector(".chat-open").style.display = "none";
					
			}
		},
		loadIssues: function(){
			this.issues = [];
			console.log("load_iisues");
			//console.log(this.$route.query.labels);
			var that = this;
			var labels = this.$route.query.labels ? `&labels=${this.$route.query.labels}` : "";
			var page = this.$route.query.page ? `&page=${this.$route.query.page}` : "";
			var url = `https://api.github.com/repos/${this.$store.getters.repoData.owner}/${this.$store.getters.repoData.repo}/issues?access_token=${this.$store.getters.userData.token}${labels}${page}&state=all`
			console.log(url);
			axios.get(url)

              .then(function (response){
                //console.log(response);
                response.data.forEach(function(item, i, arr){
                	//console.log(item);
                	that.issues.push({id: item.id, url: item.url, state: item.state, title: item.title, comments_url: item.comments_url, messages: [], body: item.body, user: {name: item.user.login, avatar: item.user.avatar_url}, labels: item.labels, pullrequest: item.pull_request});

                });

              })
              .catch(function (error) {
             //   labels = [];
                console.log(error);
            });
		}
	}
})