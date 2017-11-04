new Vue({
	el: "#app",
	data: 
		{
			repoData: {
				member: "",
				repo: ""
			},
			repoAvailable: false
		},
	methods: {
		onRepoData: function(repoData){
			axios.get(`https://api.github.com/repos/${repoData.member}/${repoData.repo}`)
				  .then(function (response) {
				  	//this.labelsData = response;
				    //console.log(response);
				    this.rapoData = repoData;
				    this.rapoAvailable = true;
				  })
				  .catch(function (error) {
				    console.log(error);
				    this.repoData = {member: "", repo: ""};
				    this.repoAvailable = false;
				  });
		},
		getData: function(){
			//... load labels/issues
		}
	}
})