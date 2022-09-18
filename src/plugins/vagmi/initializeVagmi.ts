import { chain, configureChains, createClient } from 'vagmi'

import { CoinbaseWalletConnector } from 'vagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'vagmi/connectors/injected'
import { MetaMaskConnector } from 'vagmi/connectors/metaMask'
import { WalletConnectConnector } from 'vagmi/connectors/walletConnect'

import { alchemyProvider } from 'vagmi/providers/alchemy'
import { publicProvider } from 'vagmi/providers/public'

const alchemyId = import.meta.env.VITE_ALCHEMY_ID

const { chains, provider } = configureChains(
	[chain.polygon, chain.polygonMumbai],
	[
		alchemyProvider({ alchemyId, priority: 0, weight: 1 }),
		publicProvider({ priority: 1, weight: 2 }),
		// infuraProvider({ infuraId, priority: 1, weight: 2 })
	],
)

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
