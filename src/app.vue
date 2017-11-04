
require("./repo.vue");
Vue.use(Router)
const router = new Router({
	routes: [
		{ path: '/:owner/:repo', component: Repo}
	]
})
new Vue({
	//render: h => h(App),
	router: router,
	el: "#app",
	data: 
		{
		},
	methods: {
		getData: function(){
			//... load labels/issues
		}
	}
})