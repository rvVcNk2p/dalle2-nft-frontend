import Home from './views/HomePage.vue'
import NotFound from './views/NotFound.vue'

/** @type {import('vue-router').RouterOptions['routes']} */
export const routes = [
	{ path: '/', component: Home, meta: { title: 'Home' } },
	{
		path: '/my-nfts',
		meta: { title: 'My NFTs' },
		component: () => import('./views/MyNftsPage.vue'),
	},
	{
		path: '/nft/:tokenId',
		// meta: { title: 'About' },
		component: () => import('./views/SingleNftPage.vue'),
	},
	{ path: '/:path(.*)', component: NotFound },
]
