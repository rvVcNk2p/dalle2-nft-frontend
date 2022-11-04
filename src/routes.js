import Home from './views/HomePage.vue'
import NotFound from './views/NotFound.vue'

/** @type {import('vue-router').RouterOptions['routes']} */
export const routes = [
	{ path: '/', component: Home, meta: { title: 'Home', needAuth: false } },
	{
		path: '/my-nfts',
		meta: { needAuth: true },
		component: () => import('./views/MyNftsPage.vue'),
	},
	{
		path: '/mint',
		meta: { needAuth: true },
		component: () => import('./views/MintPage.vue'),
	},
	{
		path: '/nft/:tokenId',
		meta: { needAuth: true },
		component: () => import('./views/SingleNftPage.vue'),
	},
	{ path: '/:path(.*)', component: NotFound },
]
