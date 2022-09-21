import { inject, ref } from 'vue'
import { ethers } from 'ethers'

const { VITE_ENVIRONMENT } = import.meta.env

const url =
	VITE_ENVIRONMENT === 'DEVELOPMENT'
		? 'https://gasstation-mumbai.matic.today/v2'
		: 'https://gasstation-mainnet.matic.network/v2'

export const useGasPrice = () => {
	const axios = inject('axios')
	// get max fees from gas station
	let maxFeePerGas = ref(ethers.BigNumber.from(40000000000)) // fallback to 40 gwei
	let maxPriorityFeePerGas = ref(ethers.BigNumber.from(40000000000)) // fallback to 40 gwei

	const fetchGasPrice = async () => {
		try {
			const { data } = await axios.get(url)

			maxFeePerGas.value = ethers.utils.parseUnits(
				Math.ceil(data.fast.maxFee) + '',
				'gwei',
			)
			maxPriorityFeePerGas.value = ethers.utils.parseUnits(
				Math.ceil(data.fast.maxPriorityFee) + '',
				'gwei',
			)
		} catch {
			console.log('Something went wrong.')
		}
	}

	return {
		maxFeePerGas,
		maxPriorityFeePerGas,

		fetchGasPrice,
	}
}
