require("./store.js");
require("./repo.vue");
require("./issuesblock.vue");
require("./reviews.vue");
require("./repodata.vue")
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
	          path: 'repodata',
	          component: Repodata
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