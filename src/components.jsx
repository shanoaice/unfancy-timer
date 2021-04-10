// @jsx h
import { h } from 'preact'
import { forwardRef } from 'preact/compat'
import PropTypes from 'prop-types'
import { useFela } from 'react-fela'

const styles = {
	middleground: {
		backgroundColor: '#1674cc',
		zIndex: 2,
		animationFillMode: 'forward',
	},
	background: {
		backgroundColor: '#16ccc8',
		zIndex: 1,
	},
	foreground: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 3,
	},
	fullscreen: {
		minHeight: '100vh',
		maxHeight: '100vh',
		minWidth: '100vw',
		maxWidth: '100vw',
		position: 'fixed',
		top: 0,
	},
	input: {
		backgroundColor: 'rgba(0, 0, 0, 0)',
		fontSize: '24px',
		textAlign: 'center',
		border: 'none',
		borderBottom: '2px solid #fff!important',
		':focus': {
			outline: 'none',
		},
		color: '#fff',
		minWidth: '400px',
	},
	roundButton: {
		border: 'none',
		borderRadius: '10px',
		textAlign: 'center',
		fontSize: '20px',
		width: '80px',
		height: '40px',
	},
	startButton: ({ isStartVisible }) => ({
		backgroundColor: 'green',
		color: 'white',
		display: isStartVisible ? 'inline' : 'none',
		':focus': {
			outline: 'none',
			backgroundColor: 'darkgreen',
		},
	}),
	pauseButton: ({ isPauseVisible }) => ({
		backgroundColor: 'yellow',
		color: 'black',
		display: isPauseVisible ? 'inline' : 'none',
		':focus': {
			outline: 'none',
			backgroundColor: 'yellowgreen',
		},
	}),
	stopButton: ({ isStopVisible }) => ({
		backgroundColor: 'red',
		color: 'white',
		display: isStopVisible ? 'inline' : 'none',
		':focus': {
			outline: 'none',
			backgroundColor: 'darkred',
		},
	}),
	buttonContainer: {
		display: 'flex',
		justifyContent: 'space-evenly',
		paddingTop: '20px',
		minWidth: '200px',
	},
}

export const Middleground = forwardRef(({ children }, ref) => {
	const { css } = useFela()
	return (
		<div ref={ref} className={css(styles.middleground, styles.fullscreen)}>
			{children}
		</div>
	)
})

Middleground.propTypes = {
	children: PropTypes.arrayOf(PropTypes.element),
}

export const Background = forwardRef(({ children }, ref) => {
	const { css } = useFela()

	return (
		<div ref={ref} className={css(styles.background, styles.fullscreen)}>
			{children}
		</div>
	)
})

Background.propTypes = {
	children: PropTypes.arrayOf(PropTypes.element),
}

export const Foreground = ({ children }) => {
	const { css } = useFela()
	return (
		<div className={css(styles.foreground, styles.fullscreen)}>
			{children}
		</div>
	)
}

Foreground.propTypes = {
	children: PropTypes.arrayOf(PropTypes.element),
}

export const Input = forwardRef((props, ref) => {
	const { css } = useFela()
	return <input ref={ref} className={css(styles.input)} {...props} />
})

export const ButtonGroups = ({
	isStartVisible,
	isStopVisible,
	isPauseVisible,
	clickStart,
	clickPause,
	clickStop,
}) => {
	const { css } = useFela({ isStartVisible, isPauseVisible, isStopVisible })
	return (
		<div className={css(styles.buttonContainer)}>
			<button
				className={css(styles.startButton, styles.roundButton)}
				type="button"
				onClick={clickStart}
			>
				Start
			</button>
			<button
				className={css(styles.pauseButton, styles.roundButton)}
				type="button"
				onClick={clickPause}
			>
				Pause
			</button>
			<button
				className={css(styles.stopButton, styles.roundButton)}
				type="button"
				onClick={clickStop}
			>
				Stop
			</button>
		</div>
	)
}

ButtonGroups.propTypes = {
	isStartVisible: PropTypes.bool.isRequired,
	isStopVisible: PropTypes.bool.isRequired,
	isPauseVisible: PropTypes.bool.isRequired,
	clickStart: PropTypes.func,
	clickPause: PropTypes.func,
	clickStop: PropTypes.func,
}
