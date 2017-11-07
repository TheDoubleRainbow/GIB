Start = Repo = Vue.component('start', {
	template: `<div>
					<div>
						<div id="welcome">Welcome to GIB</div> 
						<search v-if="userData.authorized"></search>
					</div>
					<a href = "http://github.com/login/oauth/authorize?client_id=f343de2cdd05ffd0d470"><div id="gitlogin" v-if="userData.authorized == false">
						Login with GitHub
					</div></a>
				</div>`,
	computed: {
	    	userData: function () {
	      		return this.$store.getters.userData;
	      		//return [];
	    	}
  	}

});