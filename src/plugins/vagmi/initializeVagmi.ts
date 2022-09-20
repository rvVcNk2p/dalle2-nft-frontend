import { chain, configureChains, createClient } from 'vagmi'

import { CoinbaseWalletConnector } from 'vagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'vagmi/connectors/injected'
import { MetaMaskConnector } from 'vagmi/connectors/metaMask'
import { WalletConnectConnector } from 'vagmi/connectors/walletConnect'

import { alchemyProvider } from 'vagmi/providers/alchemy'
import { publicProvider } from 'vagmi/providers/public'

const { VITE_POLYGON_ALCHEMY_API, VITE_MUMBAI_ALCHEMY_API, VITE_ENVIRONMENT } =
	import.meta.env

const alchemyId =
	VITE_ENVIRONMENT === 'DEVELOPMENT'
		? VITE_MUMBAI_ALCHEMY_API
		: VITE_POLYGON_ALCHEMY_API

const availableChains = [
	VITE_ENVIRONMENT === 'DEVELOPMENT' ? chain.polygonMumbai : chain.polygon,
]

const { chains, provider } = configureChains(availableChains, [
	alchemyProvider({ alchemyId, priority: 0, weight: 1 }),
	publicProvider({ priority: 1, weight: 2 }),
	// infuraProvider({ infuraId, priority: 1, weight: 2 })
])

const connectors = [
	new MetaMaskConnector({ chains }),
	new CoinbaseWalletConnector({
		chains,
		options: {
			appName: 'wagmi',
		},
	}),
	new InjectedConnector({
		chains,
		options: {
			name: 'Injected',
			shimDisconnect: true,
		},
	}),
	new WalletConnectConnector({
		chains,
		options: {
			qrcode: true,
		},
	}),
]

export const vagmiClient = createClient({
	autoConnect: true,
	connectors,
	provider,
})
