Vue.component('labels', {
	template: `<div><b>Labels:</b>
					<ul>
						<li v-on:click="toogle($event)" v-for="label in labels">
							<span class="label-type">{{label.type}}</span>
							<ul class = "sub-types">
								<li class="label-subtype" v-for="subtype in label.subtypes">{{subtype}}</li>
							</ul>
						</li>
					</ul>
			</div>`,
	data: function(){
			return {labels: []}
		},
	created: function(){
		this.labels = this.prepareLabels()
		},
	props:{
			repodata: {},
			repoavailable: false
		},
	methods:{
		toogle: function(event){
			var subMenu = event.target.parentNode.querySelectorAll('.sub-types')[0];
	        if (subMenu.classList.contains('selected')) {
	            subMenu.classList.remove("selected");
	        } else {
	            subMenu.classList.add("selected");
	        }
	    },
	    prepareLabels: function(){
	    	var ret = [];
			if(this.repoavailable){
				axios.get(`https://api.github.com/repos/${this.repoData.member}/${this.repoData.repo}/labels`)
				  .then(function (response) {
				  	response.forEach(function(item, i, arr) {
				  		var typeArray = item.name.split(": ");
				  		ret.push({name: item.name, type: typeArray[0], subtype: typeArray[1] ? typeArray[1] : "", color: item.color});
					});
				  	return ret;
				    console.log(response);
				  })
				  .catch(function (error) {
				  	return [];
				    console.log(error);
				  });
			} else { return [];}; 

		/*return {
			labels: 
				[
					{type: "Bug", subtypes: ["Bug1", "Bug2"]}, 
					{type: "Feature", subtypes: ["Feature1", "Feature2"]},
					{type: "SupDvach", subtypes: ["SupDvach1", "SupDvach2"]}
				]
		}*/
	    }
	}	
})