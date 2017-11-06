Repodata = Vue.component('repodata', {
	template: `<div>
				<div class = "columns is-centered">
								
					<div class = "column is-8 is-8-desktop is-12-tablet">
							<div class = "control">
								<button v-on:click="loadIssues()" id="issues-button" class="button is-info">Back to issues</button>
							</div>
					</div>
				</div>

				<div id = "reviews" class = "columns is-centered">
					<div class = "column is-4-widescreen is-4-fullhd is-5-desktop">
						<div :class="getFIRatioType()">
							<div v-if="showFI">
							<div class="fi-header">FI Ratio: {{fiRatio}}% ({{fitype}})</div>
							<div class="fi-body">
								<div>Usualy it takes {{fidata.average}} days to integrate feature for this repository.</div>
							</div> 
							<div class="fi-footer">
								<div class="fi-issue">Fastest issue: {{fidata.best}}</div><div class="fi-issue fi-issue-worst">Longest issue: {{fidata.worst}}</div>
							</div>
							</div>
						</div>
					</div>
					<div class = "column is-4-widescreen is-4-fullhd is-5-desktop">
						<div :class="getDFRatioType()">
							<div v-if="showDF">
							<div class="fi-header">DF Ratio: {{dfRatio}}% ({{dftype}})</div>
							<div class="fi-body">
								<div>Usualy it takes {{dfdata.average}} days to fix bug for this repository.</div>
							</div> 
							<div class="fi-footer">
								<div class="fi-issue">Fastest issue: {{dfdata.best}}</div><div class="fi-issue fi-issue-worst">Longest issue: {{dfdata.worst}}</div>
							</div>
							</div>
						</div>
					</div>
				</div>
			</div></div></div>`,
	data: function() {
		return {
			loaded: false,
			showFI: false,
			showDF: false,
			fidata: {
				data: [190, 20, 55, 1, 1, 4, 2, 5, 80, 110],
				worst: 190,
				best: 1,
				average: 0
			},
			fiRatio: 0,
			fitype: "",
			dfdata: {
				data: [450, 20, 55, 1, 1, 4, 2, 5, 80, 110],
				worst: 450,
				best: 1,
				average: 0
			},
			dfRatio: 0,
			dftype: ""
		}
	},
	methods:{
		loadIssues: function(){
			this.$router.push(`/${this.$route.params.owner}/${this.$route.params.repo}/issues`);
		},
		calcFIRatio: function(){
			this.fiRatio = 0;
			for (var i = 0; i < this.fidata.data.length; i++) {
				this.fiRatio += this.fidata.data[i]
			}
			this.fiRatio = this.fiRatio/this.fidata.data.length;
			this.fidata.average = this.fiRatio;
			this.fiRatio = 100 - parseInt((this.fiRatio/this.fidata.worst)*100)
			this.showFI = true;
		},
		getFIRatioType: function(){
			let fitype = '';
			if(this.fiRatio < 25){
				fitype =  "fi-terrible";
				this.fitype = "terrible";
			}
			else if(this.fiRatio > 25 && this.fiRatio < 50 ){
				fitype =  "fi-bad";
				this.fitype = "bad";
			}
			else if(this.fiRatio > 50 && this.fiRatio < 75 ){
				fitype =  "fi-average";
				this.fitype = "average";
			}
			else if(this.fiRatio > 75 && this.fiRatio < 87.5 ){
				fitype =  "fi-good";
				this.fitype = "good";
			}
			else{
				fitype =  "fi-awesome";
				this.fitype = "awesome";
			}
			return fitype += " firatio"
		},
		calcDFRatio: function(){
			this.dfRatio = 0;
			for (var i = 0; i < this.dfdata.data.length; i++) {
				this.dfRatio += this.dfdata.data[i]
			}
			this.dfRatio = this.dfRatio/this.dfdata.data.length;
			this.dfdata.average = this.dfRatio;
			this.dfRatio = 100 - parseInt((this.dfRatio/this.dfdata.worst)*100)
			this.showDF = true;
		},
		getDFRatioType: function(){
			let dftype = '';
			if(this.dfRatio < 25){
				dftype =  "fi-terrible";
				this.dftype = "terrible";
			}
			else if(this.dfRatio > 25 && this.dfRatio < 50 ){
				dftype =  "fi-bad";
				this.dftype = "bad";
			}
			else if(this.dfRatio > 50 && this.dfRatio < 75 ){
				dftype =  "fi-average";
				this.dftype = "average";
			}
			else if(this.dfRatio > 75 && this.dfRatio < 87.5 ){
				dftype =  "fi-good";
				this.dftype = "good";
			}
			else{
				dftype =  "fi-awesome";
				this.dftype = "awesome";
			}
			return dftype += " firatio"
		}
	},
	created: function(){
		this.calcFIRatio()
		this.calcDFRatio()
	}
})