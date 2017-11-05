Vue.component('reponotfound', {
	template: `<div>
				REPO {{$route.params.repo}} BY {{$route.params.owner}} NOT FOUND
				</div>`,
})