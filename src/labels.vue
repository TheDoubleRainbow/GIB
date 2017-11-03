Vue.component('labels', {
	template: `<div><b>Labels:</b>
					<ul>
						<li v-for="label in labels"> {{label}}</li>
					</ul>
			</div>`,
	data: function(){
		return {
			labels: ["Bug", "Feature", "SupDvach", "Ya lampovaya Nyasha"]
		}
	}
})