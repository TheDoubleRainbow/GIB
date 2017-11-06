Repodata = Vue.component('repodata', {
	template: `<div>
				<div class = "columns is-centered">
								
					<div class = "column is-8 is-8-desktop is-12-tablet">
							<div class = "control">
								<button v-on:click="loadIssues()" id="issues-button" class="button is-info">Back to issues</button>
							</div>
					</div>
				</div>
				<div class="loading-div-repodata" v-if="loaded!=2"><img class="loading-img" src="/img/loading.gif" /></div>
				<div v-if="loaded==2" id = "reviews" class = "columns is-centered">
					<div class = "column is-4-widescreen is-4-fullhd is-5-desktop">
						<div :class="getFIRatioType()">
							<div v-if="showFI">
							<div v-if="enoughfi" class="fi-header">FI Ratio: {{fiRatio}}% ({{fitype}})</div>
							<div class="fi-body">
								<div v-if="!enoughfi"> Not enough data</div>
								<div v-if="enoughfi">Usualy it takes {{fidata.average}} days to integrate feature for this repository.</div>
							</div> 
							<div v-if="enoughfi" class="fi-footer">
								<div class="fi-issue">Fastest issue: {{fidata.best}}</div><div class="fi-issue fi-issue-worst">Longest issue: {{fidata.worst}}</div>
							</div>
							</div>
						</div>
					</div>
					<div class = "column is-4-widescreen is-4-fullhd is-5-desktop">
						<div :class="getDFRatioType()">
							<div v-if="showDF">
							<div v-if="enoughdf" class="fi-header">DF Ratio: {{dfRatio}}% ({{dftype}})</div>
							<div class="fi-body">
								<div v-if="!enoughdf"> Not enough data</div>
								<div v-if="enoughdf">Usualy it takes {{dfdata.average}} days to fix bug for this repository.</div>
							</div> 
							<div v-if="enoughdf" class="fi-footer">
								<div class="fi-issue">Fastest issue: {{dfdata.best}}</div><div class="fi-issue fi-issue-worst">Longest issue: {{dfdata.worst}}</div>
							</div>
							</div>
						</div>
					</div>
				</div>
			</div></div></div>`,
	data: function() {
		return {
			loaded: 0,
			showFI: false,
			showDF: false,
			fidata: {
				data: [],
				worst: 190,
				best: 1,
				average: 0
			},
			fiRatio: 0,
			enoughfi: false,
			fitype: "",
			dfdata: {
				data: [],
				worst: 450,
				best: 1,
				average: 0
			},
			dfRatio: 0,
			enoughdf: false,
			dftype: ""
		}
	},
	methods:{
		loadIssues: function(){
			this.$router.push(`/${this.$route.params.owner}/${this.$route.params.repo}/issues`);
		},
		calcFIRatio: function(){
			let worst = 0;
			let best = 999999999;
			for(var i = 0; i < this.fidata.data.length; i++){
				if(worst < this.fidata.data[i]){
					worst = this.fidata.data[i]
				}
				if(best > this.fidata.data[i]){
					best = this.fidata.data[i]
				}
			}
			this.fidata.best = best;
			this.fidata.worst = worst;
			this.fiRatio = 0;
			for (var i = 0; i < this.fidata.data.length; i++) {
				this.fiRatio += this.fidata.data[i]
			}
			this.fiRatio = this.fiRatio/this.fidata.data.length;
			this.fidata.average = this.fiRatio.toFixed(3);
			this.fiRatio = 100 - (this.fiRatio/this.fidata.worst).toFixed(3)*100
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
			let worst = 0;
			let best = 999999999;
			for(var i = 0; i < this.dfdata.data.length; i++){
				if(worst < this.dfdata.data[i]){
					worst = this.dfdata.data[i]
				}
				if(best > this.dfdata.data[i]){
					best = this.dfdata.data[i]
				}
			}
			this.dfdata.best = best;
			this.dfdata.worst = worst;
			this.dfRatio = 0;
			for (var i = 0; i < this.dfdata.data.length; i++) {
				this.dfRatio += this.dfdata.data[i]
			}
			this.dfRatio = this.dfRatio/this.dfdata.data.length;
			this.dfdata.average = this.dfRatio.toFixed(3);
			this.dfRatio = 100 - ((this.dfRatio/this.dfdata.worst)*100).toFixed(2)
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
		},
		getDif(raw1, raw2){
			var dif = 0;
			var d = {}; var d2 = {};
			d.raw = raw1
			d2.raw = raw2
			d.year = d.raw.split("-")[0]*1;
			d.month = d.raw.split("-")[1]*1;
			d.day = (d.raw.split("-")[2][0]+d.raw.split("-")[2][1])*1;
			d2.year = d2.raw.split("-")[0]*1;
			d2.month = d2.raw.split("-")[1]*1;
			d2.day = (d2.raw.split("-")[2][0]+d2.raw.split("-")[2][1])*1;
			if(d.day-d2.day != 0){
				dif += d.day-d2.day;
				if(d.month - d2.month != 0){
					dif += (d.month-d2.month)*30;
					if(d.year-d2.year != 0){
						dif += (d.year - d2.year)*365;
					}
				}
			}
			return dif
		},
		getData: function(){
			this.loaded = 0;
			var that = this;
			axios.get(`https://api.github.com/repos/${that.$route.params.owner}/${that.$route.params.repo}/issues?state=closed`)
	                      .then(function (response){
	                        response.data.forEach(function(item, i, arr) {
	                        	that.fidata.data.push(that.getDif(item.closed_at, item.created_at));
	                        });
	                        that.calcFIRatio();
	                        if(that.fidata.data.length > 5){
	                        	that.enoughfi = true;
	                        }
	                        that.loaded++
	                        console.log(that.loaded)
	                      })
	                      .catch(function (error) {
	                        console.log("error");
	                     });
	        axios.get(`https://api.github.com/repos/${that.$route.params.owner}/${that.$route.params.repo}/issues?labels=Type:%20bug&&state=closed`)
	                      .then(function (response){
	                        response.data.forEach(function(item, i, arr) {
	                        	that.dfdata.data.push(that.getDif(item.closed_at, item.created_at));
	                        });
	                        that.calcDFRatio();
	                        if(that.dfdata.data.length > 5){
	                        	that.enoughdf = true;
	                        }
	                        that.loaded++
	                        console.log(that.loaded)
	                      })
	                      .catch(function (error) {
	                        console.log("error");
	                     });

		}
	},
	created: function(){
		this.calcFIRatio();
		this.calcDFRatio();
		this.getData();
	}
})