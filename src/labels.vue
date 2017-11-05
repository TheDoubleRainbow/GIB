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
			return {labels: [],
					loaded: false}
		},
	props:['repodata'],
	watch: {
			'$route'(to, from ){
				//this.reset();
			}
	},
	created: function(){
		this.reset();
		},
	methods: {
		toogle: function(event){
			var subMenu = event.target.parentNode.querySelectorAll('.sub-types')[0];
	        if (subMenu.classList.contains('selected')) {
	            subMenu.classList.remove("selected");
	        } else {
	            subMenu.classList.add("selected");
	        }
	    },
	    reset: function(){
	    		loops = 1;

				//this.labels = [];
				this.prepareLabels();
				this.loaded = true;
	    },
	    prepareLabels: function(){
	    	//var ret = [];
	    	var that = this;
			if(!this.loaded){
				console.log("load");
					axios.get(`https://api.github.com/repos/${that.$route.params.owner}/${that.$route.params.repo}/labels?page=${loops}`)
					  .then(function (response){
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
					  			/*document.getElementById('welcome').style.display = "none";
					  			document.getElementById('search').style.margin = "0px 0px 20px 0px"
					  			document.getElementById('labels').className = 'column is-2 animated slideInUp'; document.getElementById('labels').style.display = "block";
					  			document.getElementById('issues').className = 'column is-7 animated slideInUp'; document.getElementById("issues").style.display = "block";
					  			document.getElementById('reviews').className = 'columns is-centered animated slideInUp'; document.getElementById('reviews').style.display = "flex";
					  			document.getElementsByTagName('body')[0].style.transitionDuration = '0.3s'; 
					  			document.getElementsByTagName('body')[0].style.background = 'white';
					  			console.log('hello')
					  			*/
					  		}
						});
					    //that.labels = ret;

					    loops++;
					    if(response.data.length == 30){
					    	that.prepareLabels();
					    }
					  })
					  .catch(function (error) {
					  	that.labels = [];
					  	console.log("error");
					 });
			}
	    }
	}	
})