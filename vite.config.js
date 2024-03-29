import GlobalsPolyfills from '@esbuild-plugins/node-globals-polyfill'
import NodeModulesPolyfills from '@esbuild-plugins/node-modules-polyfill'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { esbuildCommonjs } from '@originjs/vite-plugin-commonjs'
import { resolve } from 'path'

export default defineConfig({
	plugins: [vue()],
	resolve: {
		alias: {
			'@store': resolve(__dirname, 'src/plugins/store'),
			'@': resolve(__dirname, 'src'),
		},
	},
	optimizeDeps: {
		esbuildOptions: {
			// Node.js global to browser globalThis
			define: {
				global: 'globalThis',
			},
			plugins: [
				GlobalsPolyfills({
					process: true,
					buffer: true,
				}),
				NodeModulesPolyfills(),
				esbuildCommonjs(['@walletconnect']),
			],
		},
	},
	server: {
		open: true,
	},
})
