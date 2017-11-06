require("./store.js");
require("./repo.vue");
require("./issuesblock.vue");
require("./reviews.vue");
require("./start.vue");
Vue.use(Router)
const router = new Router({
	routes: [
		{ path: '/', component: Start},
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
app = new Vue({
	//render: h => h(App),
	router: router,
	store: store,
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