new Vue({
	el: "#app",
	data: 
		{
			repoData: {
				member: "AAAA",
				repo: "FFFF"
			},
			repoAvailable: false
		},
	methods: {
		onRepoData: function(repoData){
			var that = this;
			axios.get(`https://api.github.com/repos/${repoData.member}/${repoData.repo}`)
				  .then(function (response) {
				  	//this.labelsData = response;
				    //console.log(response);
				    that.repoData = repoData;
				    that.repoAvailable = true;
				    //that.$emit('repodata', that.repoData);
				    console.log("axios");
				    console.log(that.repoData);
				  })
				  .catch(function (error) {
				    console.log(error);
				    that.repoData = {member: "", repo: ""};
				    that.repoAvailable = false;
				  });

		},
		getData: function(){
			//... load labels/issues
		}
	}
})