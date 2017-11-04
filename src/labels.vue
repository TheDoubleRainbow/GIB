var loops = 1;
Vue.component('labels', {
	template: `<div @repoData = "prepareLabels"><b>Labels:</b>
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
	props:['repodata', 'repoavailable'],
	watch: {
			repodata: function(){
				this.prepareLabels();
			}
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
	    	//var ret = [];
	    	var that = this;
			if(this.repoavailable){
					axios.get(`https://api.github.com/repos/${that.repodata.member}/${that.repodata.repo}/labels?page=${loops}`)
					  .then(function (response){
					  console.log(response);
					  	response.data.forEach(function(item, i, arr) {
					  		var typeArray = item.name.split(": ");
					  		var found = false;

					  		that.labels.forEach(function(item1, i1, arr1){
					  			if(item1.type == typeArray[0]){
					  				that.labels[i1].subtypes.push(typeArray[1] ? typeArray[1] : "");
					  				found = true;
					  			}
					  		})

					  		if(found == false){
					  			var subtype = typeArray[1] ? typeArray[1] : "";
					  			that.labels.push({name: item.name, type: typeArray[0], subtypes: [subtype], color: item.color});
					  		}
						});
					    //that.labels = ret;

					    console.log(response.data);
					    loops++;
					    if(response.data.length == 30){
					    	that.prepareLabels();
					    }
					  })
					  .catch(function (error) {
					  	that.labels = [];
					  	//break;
					 });
			} else { 
				that.labels = []
			}; 

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