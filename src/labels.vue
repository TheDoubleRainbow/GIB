Vue.component('labels', {
	template: `<div><b>Labels:</b>
					<div class="type" v-for="label in labels"> {{label.name}}
						<div class="subtype" v-for="subtype in label.subtypes">{{subtype}}</div>
					</div>
			</div>`,
	data: function(){
		return {
			labels: [{name: "bug", subtypes: ["wontfix", "romapidor", "faceisrapgod"]}, {name: "romapidor", subtypes: ["bug"]}, {name: "wontfix", subtypes: ["bug", "romapidor"]}]
		}
	}
})