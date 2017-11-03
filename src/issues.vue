Vue.component('issues', {
	template: ` <div>
				<div class="issue" v-for="issue in issues"> 
							<div class="issue-header">
								<div class="issue-header-status" :style="{background: stateBg(issue.state)}"> {{issue.state}} </div>
								<div class="issue-header-title"> {{issue.title}} </div>
								<div class="issue-header-labels">
									<div class="issue-header-label" v-for="label in issue.labels">
										<div class="issue-header-label-name" :style="{background: '#'+label.colour}"> {{label.name}} </div>
									</div>
								</div>
							</div>
				</div>`,
	data: function(){
		return {
			issues: [{id: 0, url: "#", state: "closed", title: "Issue #1", body: "ya buhayu i mne pohui", user: {name: "petya"}, labels: [{id: 1, url: "#", name: "Bug", colour: "f29513"}, {id: 2, url: "#", name: "Feature", colour: "f29513"}]}, {id: 0, url: "#", state: "open", title: "Eshkere Issue #2 Roman Pidor", body: "ya buhayu i mne pohui", user: {name: "petya"}, labels: [{id: 1, url: "#", name: "Bug", colour: "f29513"}, {id: 2, url: "#", name: "Feature", colour: "f29513"}]}]

		}
	},
	methods:{
		stateBg: function(type){
			return type =='open' ? "#3CCE7D" : "#C8363D"
		},
		openIssue: function(el, issue){
			issue.comments = [];
			//.. load comments
		}
	}
})