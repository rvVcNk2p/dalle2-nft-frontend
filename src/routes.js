import Home from './views/Home.vue'
import NotFound from './views/NotFound.vue'

/** @type {import('vue-router').RouterOptions['routes']} */
export const routes = [
	{ path: '/', component: Home, meta: { title: 'Home' } },
	{
		path: '/nft/:tokenId',
		// meta: { title: 'About' },
		component: () => import('./views/SingleNftPage.vue'),
	},
	{ path: '/:path(.*)', component: NotFound },
]
