Vue.component('issues', {
	template: ` <div>
				<div class="issue" v-for="issue in issues" v-bind:id="'id-'+issue.id"> 
							<div class="issue-header" @click="openIssue(issue, $event)">
								<div class="issue-header-status" :style="{background: stateBg(issue.state)}"></div>
								<div class="issue-header-title"> {{issue.title}} </div>
								<div class="issue-header-url"><a :href="issue.url">View on Github</a></div>
								<div class="issue-header-labels">
									<div class="issue-header-label" v-for="label in issue.labels">
										<div class="issue-header-label-name" :style="{background: '#'+label.colour}"> {{label.name}} </div>
									</div>
								</div>
							</div>
							<div class="issue-body">
								<div class="issue-message issue-first-message"></div>
							</div>
				</div></div>`,
	data: function(){
		return {
			issues: [{id: 0, url: "#", state: "closed", title: "Issue #1", body: "ya kuryu i mne pohui", user: {name: "petya"}, labels: [{id: 1, url: "#", name: "Bug", colour: "f29513"}, {id: 2, url: "#", name: "Feature", colour: "f29513"}]}, {id: 1, url: "#", state: "open", title: "Eshkere Issue #2 Roman Pidor", body: "ya buhayu i mne pohui", user: {name: "petya"}, labels: [{id: 1, url: "#", name: "Bug", colour: "f29513"}, {id: 2, url: "#", name: "Feature", colour: "f29513"}]}]

		}
	},
	methods:{
		stateBg: function(type){
			return type =='open' ? "#3CCE7D" : "#C8363D"
		},
		openIssue: function(issue, event){
			if(issue.opened == false || issue.opened == undefined || event.target.innerHTML == "View on Github"){
				issue.opened = true;
				issue.comments = [];
				//.. load comments
				issue.html = document.getElementById("id-"+issue.id);
				issue.html.className = "issue-opened"
				issue.html.querySelector(".issue-first-message").innerHTML = issue.body; issue.html.querySelector(".issue-first-message").style.display = "block"; issue.html.querySelector(".issue-header-url").style.display = "block"
						
			}
			else{
				issue.opened = false;
				issue.html = document.getElementById("id-"+issue.id);
				issue.html.className = "issue";
				issue.html.querySelector(".issue-first-message").style.display = "none"; issue.html.querySelector(".issue-header-url").style.display = "none"
					
			}
			
		}
	}
})