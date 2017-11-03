
new Vue({
	el: "#app",
	data: {
		url: "#",
		issues: [{id: 0, url: "#", state: "closed", title: "Issue #1", body: "ya buhayu i mne pohui", user: {name: "petya"}, labels: [{id: 1, url: "#", name: "Bug", colour: "f29513"}, {id: 2, url: "#", name: "Feature", colour: "f29513"}]}, {id: 0, url: "#", state: "open", title: "Eshkere Issue #2 Roman Pidor", body: "ya buhayu i mne pohui", user: {name: "petya"}, labels: [{id: 1, url: "#", name: "Bug", colour: "f29513"}, {id: 2, url: "#", name: "Feature", colour: "f29513"}]}]
	},
	methods:{
		stateBg: function(type){
			return type =='open' ? "#3CCE7D" : "#C8363D"
		},
		openIssue: function(el, issue){
			issue.comments = [];
			//.. load comments
		},
		getData: function(){
			//... load labels/issues
		}
	}
})