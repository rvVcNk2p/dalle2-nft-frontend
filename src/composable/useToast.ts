import { useToast as createToast, TYPE } from 'vue-toastification'

const toast = createToast()
const DEFAULT_TIMEOUT = 5000

export const useToast = () => {
	const createToast = (type: TYPE, message: string, timeout?: number) => {
		toast(message, {
			type,
			timeout: timeout ?? DEFAULT_TIMEOUT,
		})
	}

	return {
		createToast,

		SUCCESS: TYPE.SUCCESS,
		ERROR: TYPE.ERROR,
		DEFAULT: TYPE.DEFAULT,
		INFO: TYPE.INFO,
		WARNING: TYPE.WARNING,
	}
}
