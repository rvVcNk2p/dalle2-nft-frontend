import type { Provider } from '@ethersproject/abstract-provider'
import { ethers, Signer } from 'ethers'

export const getSmartContract = (
	address: string,
	abi: ethers.ContractInterface,
	signerOrProvider?: Signer | Provider,
): ethers.Contract => new ethers.Contract(address, abi, signerOrProvider)
