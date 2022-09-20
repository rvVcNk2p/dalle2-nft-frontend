export const getParsedBase64 = (base64Str: string) => {
	const strInput = base64Str.split('data:application/json;base64,')[1]
	return JSON.parse(Buffer.from(strInput, 'base64').toString('utf8'))
}
