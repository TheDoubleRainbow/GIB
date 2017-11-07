Start = Repo = Vue.component('start', {
	template: `<div>
					<div v-if="userData.authorized">
						<div id="welcome">Welcome to GIB</div> 
						<search></search>
					</div>
					<div v-if="userData.authorized == false">
						<a href = "http://github.com/login/oauth/authorize?client_id=f343de2cdd05ffd0d470">GITHUB</a>
					</div>
				</div>`,
	computed: {
	    	userData: function () {
	      		return this.$store.getters.userData;
	      		//return [];
	    	}
  	}

});