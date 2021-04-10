import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'

// https://vitejs.dev/config/
export default defineConfig({
	esbuild: {
		jsxFactory: 'h',
		jsxFragment: 'Fragment',
	},
	plugins: [reactRefresh()],
	resolve: {
		alias: [
			{
				find: 'react',
				replacement: 'preact/compat',
			},
			{
				find: 'react-dom',
				replacement: 'preact/compat',
			},
		],
	},
})
