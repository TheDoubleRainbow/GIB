new Vue({
	el: "#app",
	data: {
		labels: ["Bug", "Feature", "SupDvach", "Ya lampovaya Nyasha"],
		issues: [{id: 0, url: "#", state: "open", title: "Eshkere", body: "ya buhayu i mne pohui", user: {name: "petya"}, lebels: [{id: 1, url: "#", name: "Bug", colour: "f29513"}, {id: 2, url: "#", name: "Feature", colour: "f29513"}]}, {id: 0, url: "#", state: "open", title: "Eshkere", body: "ya buhayu i mne pohui", user: {name: "petya"}, lebels: [{id: 1, url: "#", name: "Bug", colour: "f29513"}, {id: 2, url: "#", name: "Feature", colour: "f29513"}]}]
	},
	methods:{
		getData(){
			//...
		}
	}
})