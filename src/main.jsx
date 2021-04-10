// @jsx h
import { h, render } from 'preact'
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

render(
	<RendererProvider renderer={felaRenderer}>
		<App />
	</RendererProvider>,
	document.querySelector('#root')
)
