require("./repo.vue");
require("./issuesblock.vue");
require("./reviews.vue");
Vue.use(Router)
const router = new Router({
	routes: [
		{ path: '/', component: {template: `<div><div id="welcome">Welcome to GIB</div> <search></search></div>`}},
		{ path: '/:owner/:repo', component: {template: `<div><search></search><repo></repo></div>`},
			children: [
	        {
	          path: 'issues',
	          component: IssuesBlock
	        },
	        {
	          path: 'reviews',
	          component: Reviews
	        },
	        {
				path: '',
	        	redirect: 'issues'
	        }
	      ]
      }

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