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
		return {
			labels: 
				[
					{type: "Bug", subtypes: ["Bug1", "Bug2"]}, 
					{type: "Feature", subtypes: ["Feature1", "Feature2"]},
					{type: "SupDvach", subtypes: ["SupDvach1", "SupDvach2"]}
				]
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
	    }
	}
})