import type { ChainParameters } from '@/shared/types/chains.types'

export const MUMBAI_TESTNET_CHAINID = 80001
export const mumbaiTestnetParams: ChainParameters = {
	chainId: `${MUMBAI_TESTNET_CHAINID}`, // A 0x-prefixed hexadecimal string
	chainName: 'Mumbai',
	nativeCurrency: {
		name: 'MATIC',
		symbol: 'MATIC', // 2-6 characters long
		decimals: 18,
	},
	rpcUrls: [
		'https://polygon-mumbai.g.alchemy.com/v2/k8zkCTLS0W2BJ8_jciCDXk-6ZqwNo-wS',
	],
	blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
	chainIcon:
		'https://raw.githubusercontent.com/sushiswap/icons/master/network/polygon.jpg',
	preferredColor: '#A38AFA',
}

export const POLYGON_CHAINID = 137
export const polygonMainnetParams: ChainParameters = {
	chainId: `${POLYGON_CHAINID}`,
	chainName: 'Polygon',
	nativeCurrency: {
		name: 'Matic',
		symbol: 'MATIC',
		decimals: 18,
	},
	rpcUrls: ['https://polygon-rpc.com/'],
	blockExplorerUrls: ['https://polygonscan.com/'],
	iconUrls: [],
	chainIcon:
		'https://raw.githubusercontent.com/sushiswap/icons/master/network/polygon.jpg',
	preferredColor: '#1969FF',
}

const env = import.meta.env.VITE_ENVIRONMENT

export const supportedChains: ChainParameters[] = [
	polygonMainnetParams,
	...(env === 'DEVELOPMENT' ? [mumbaiTestnetParams] : []),
]
