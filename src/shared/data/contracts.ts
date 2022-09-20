const CURRATED_LABS_CONTRACT_ADDRESS =
	import.meta.env.VITE_ENVIRONMENT === 'DEVELOPMENT'
		? '0x41C9c852B18966eb00574272fDD1e245a73Df58e' // Mumbai
		: '0x7f08948e4ddcd7ee0b9b89006205ad227032dfe3' // Polygon

// Live polygon matic address: 0x7f08948e4ddcd7ee0b9b89006205ad227032dfe3
// Dev 2 wallet has 3 NFTs

export { CURRATED_LABS_CONTRACT_ADDRESS }
