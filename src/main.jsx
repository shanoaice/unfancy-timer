import React from 'react'
import ReactDOM from 'react-dom'
import { createRenderer } from 'fela'
import plugins from 'fela-preset-web'
import { RendererProvider } from 'react-fela'
import './index.css'
import App from './App'

const felaRenderer = createRenderer({
	plugins,
	optimizeCaching: true,
	devMode: process.env.NODE_ENV !== 'PRODUCTION',
})

ReactDOM.render(
	<React.StrictMode>
		<RendererProvider renderer={felaRenderer}>
			<App />
		</RendererProvider>
	</React.StrictMode>,
	document.querySelector('#root')
)
