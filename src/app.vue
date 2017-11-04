new Vue({
	el: "#app",
	data: {
		url: "#"
	},
	methods:{
		onRepoData: function(repoData){
			console.log(repoData);
		},
		getData: function(){
			//... load labels/issues
		}
	}
})