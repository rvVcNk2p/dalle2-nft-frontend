const CURRATED_LABS_CONTRACT_ADDRESS =
	import.meta.env.VITE_ENVIRONMENT === 'DEVELOPMENT'
		? '0x334ccb38843d38d294cbE9C2475db844A71E2A73' // Mumbai
		: '0xC661AF20b1e97B4e565d39Fc84F04017eaB583d5' // Polygon

export { CURRATED_LABS_CONTRACT_ADDRESS }
