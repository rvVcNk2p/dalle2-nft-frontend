export type ChainDependent<T> = { [chainId: number]: T }

export enum WalletType {
	METAMASK = 'metaMask',
	WALLET_CONNECT = 'walletConnect',
	COINBASE = 'coinbaseWallet',
}

export interface ChainParameters {
	chainId: string // A 0x-prefixed hexadecimal string
	chainName: string
	nativeCurrency: {
		name: string
		symbol: string // 2-6 characters long
		decimals: 18
	}
	rpcUrls: string[]
	blockExplorerUrls?: string[]
	iconUrls?: string[] // Currently ignored.
	chainIcon: string
	preferredColor: string
}
