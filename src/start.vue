Start = Repo = Vue.component('start', {
	template: `<div>
					<div>
						<div id="welcome">Welcome to GIB</div> 
						<search v-if="userData.authorized"></search>
					</div>
					<div id="gitlogin" v-if="userData.authorized == false">
						<a href = "http://github.com/login/oauth/authorize?client_id=f343de2cdd05ffd0d470">Login with GitHub</a>
					</div>
				</div>`,
	computed: {
	    	userData: function () {
	      		return this.$store.getters.userData;
	      		//return [];
	    	}
  	}

});